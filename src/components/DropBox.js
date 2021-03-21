import React, { useCallback, useMemo } from "react";
import parse from "csv-parse";
import { useDropzone } from "react-dropzone";

// Author's react-dropzone style for basic styling
const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#dbdbdb",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    height: "190px",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

function TransposeArray(arr) {
    return arr[0].map((_, c) => arr.map((r) => r[c]));
}

export default function DropBox({ setCsvData }) {
    // function to read and store csv - contents
    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();

        // Reader validation
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
            parse(reader.result, (err, data) => {
                // Store the valid data in the csvData
                if (TransposeArray(data).length === 6) {
                    setCsvData(TransposeArray(data));
                } else console.log("Err: data is not in correct format");
            });
        };

        acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
    }, [setCsvData]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        // accept csv files for windows
    } = useDropzone({ accept: "application/vnd.ms-excel, .csv", onDrop });

    // Styling the drop
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <div>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file!"}
                {isDragActive && !isDragReject && "Filetype is OK!"}
                {isDragReject && "Filetype is not OK!"}
            </div>
        </div>
    );
}
