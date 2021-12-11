import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './drop-file-input.css';

import { ImageConfig } from '../config/ImageConfig';
import uploadImg from '../assets/cloud-upload-regular-240.png';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


async function uploadFile(url, chunk, upload_id, fileSize) {

    var body = JSON.stringify({
        'file': chunk
    })

    console.log(url);

    return await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
            "Content-Range": "bytes */" + fileSize,
        },
        data: { "filename": "test.txt" },
        files: { "file": chunk },
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result.upload_id;
            }
        )
}

async function uploadInChunks(url, file) {
    var fileSize = file.size;
    var chunkSize = 64 * 1024; // bytes
    var offset = 0;
    var self = this; // we need a reference to the current object
    var chunkReaderBlock = null;
    var token = await fetch('http://localhost:8000/opener')
        .then(res => res.json())
        .then((result) => {
            return result.token;
        })

    var readEventHandler = function (evt) {
        if (evt.target.error == null) {
            offset += evt.target.result.length;
            // callback(evt.target.result); // callback for handling read chunk
            // console.log(offset);
            uploadFile(url, evt.target.result, '', fileSize)
        } else {
            console.log("Read error: " + evt.target.error);
            return;
        }
        if (offset >= fileSize) {
            console.log("Done reading file");
            return;
        }

        // of to the next chunk
        chunkReaderBlock(offset, chunkSize, file);
    }

    chunkReaderBlock = function (_offset, length, _file) {
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onload = readEventHandler;
        r.readAsText(blob);
    }

    // now let's start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
}

const DropFileInput = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    const onBtnClick = (e) => {
        uploadInChunks(props.upload_endpoint, fileList[0]);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Sprawdź plik</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} />
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Gotowy plik do sprawdzenia:
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <div className="drop-file-preview__item__info">
                                        <p>Nazwa: {item.name}</p>
                                        <p>Rozmiar: {item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                        <button className='drop-file-btn' onClick={onBtnClick}>
                            Prześlij plik
                        </button>
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;