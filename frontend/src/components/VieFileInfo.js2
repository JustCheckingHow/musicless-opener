import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { matchPath } from "react-router-dom";
import './drop-file-input.css';
import { MDBRow, MDBCol, MDBCard, MDBContainer, MDBCardTitle, MDBInput, MDBCardBody } from 'mdb-react-ui-kit';
import MyXmlDocument from "./xmlRenderer";

const match = matchPath("/opener/:id", window.location.pathname);

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const ViewFileInfo = props => {
    const [result, setResult] = useState({});
    const [active, setActive] = useState('');

    useEffect(() => {
        if (active == match.params.id)
            return;

        console.log(props.endpoint + "/" + match.params.id)
        fetch(props.endpoint + "/" + match.params.id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setResult(result);
                }
            )
        setActive(match.params.id);
    });

    function getValidityString(valid) {
        if (valid)
            return (<span style={{ color: "green" }}>Plik wysłany poprawnie</span>);

        return (<span style={{ color: "red" }}>Błąd w pliku</span>);
    };

    return (
        <MDBContainer className="mx-auto" style={{ backgroundColor: "#f5f8ff" }}>
            <MDBRow className="my-3">
                <MDBCol className="col col-12">
                    <MDBCard className="shadow p-3" style={{ backgroundColor: "white" }}>
                        <MDBCardTitle>
                            <h3 className="text-center">
                                <i className="fas fa-file-alt"></i>
                                &nbsp;&nbsp;&nbsp;
                                {result.title}
                            </h3>
                        </MDBCardTitle>
                        <MDBCardBody className="px-3">
                            <MDBRow>
                                <MDBCol className="col-4">
                                    <strong>Typ pliku</strong>
                                </MDBCol>
                                <MDBCol className="col-8">
                                    {result.real_extension}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="col-4">
                                    <strong>Poprawność</strong>
                                </MDBCol>
                                <MDBCol className="col-8">
                                    {getValidityString(result.valid)}
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="my-3">
                <MDBCol className="col col-12">
                    <MDBCard className="shadow p-3" style={{ backgroundColor: "white" }}>
                        <MDBCardTitle>
                            <h3 className="text-center">
                                <i className="fas fa-file-alt"></i>
                                &nbsp;&nbsp;&nbsp;
                                Zawartość
                            </h3>
                        </MDBCardTitle>
                        <MDBCardBody className="px-3">
                            {result.valid ? <MyXmlDocument xmlString={result.xml} /> : <p>Plik nieprawidłowy</p>}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ViewFileInfo;