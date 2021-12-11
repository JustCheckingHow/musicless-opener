import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


import './drop-file-input.css';

import { ImageConfig } from '../config/ImageConfig'; 
import uploadImg from '../assets/cloud-upload-regular-240.png';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

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
        let tmp = new FormData();
        tmp.append('file', fileList[0]);

        axios.post(
            'http://localhost:8000/opener',
            tmp,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).catch((error) => {
            if (error.request) {
                console.log(error.request);
                // request sent, no response
            } else if (error.response) {
                console.log(error.response);

                // error response
            }
            // console.error(error);
        }).then((response) => {
            console.log(response);
            window.location.href = '/opener/' + response.data.file_pk;
        })
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
                    <p>Sprawdź pliki</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Gotowe pliki do sprawdzenia
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    {/* <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                                    <div className="drop-file-preview__item__info">
                                        <p>Nazwa: {item.name}</p>
                                        <p>Rozmiar: {item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                        <button className='drop-file-btn' onClick={onBtnClick}>
                            Prześlij pliki
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