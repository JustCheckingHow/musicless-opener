import React, {useState} from "react";

function FileDropField(){
    const [fileList, setFileList] = useState([]);

    function fileDropHandler(e) {
        e.preventDefault();
        console.log(e);
        // setFileList()
    }

    function fileDragHandler(e) {
        e.preventDefault();
        // TODO: change style
    }

    function fileDragLeaveHandler(e) {
        e.preventDefault();
        // TODO: change style
    }

    function renderFileList () {
        if(fileList.length === 0) {
            return (
                <p>Upuść plik(i)</p>
            )
        } else {
            return(
                <ul>
                    {fileList.map((item) =>
                        <li>item.filename</li>
                    )}
                </ul>
            )
        }
    }

    return (
        <div id="drop_zone" onDrop={fileDropHandler} onDragOver={fileDragHandler} onDragLeave={fileDragLeaveHandler}>
            {renderFileList()}
        </div>
    )
}

export default FileDropField;