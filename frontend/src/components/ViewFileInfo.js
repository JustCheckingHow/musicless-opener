import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { matchPath } from "react-router-dom";
import './drop-file-input.css';
import { MDBRow, MDBCol, MDBCard, MDBContainer, MDBCardTitle, MDBInput, MDBCardBody } from 'mdb-react-ui-kit';
import MyXmlDocument from "./xmlRenderer";

import './ViewFileInfo.css';

const match = matchPath("/opener/:id", window.location.pathname);

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const ViewFileInfo = props => {
    const [result, setResult] = useState({});
    const [active, setActive] = useState('');
    const [content_result, setContentResult] = useState('');
    const [pdf_report, SetPdfReport] = useState('');

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


                    console.log(props.content_endpoint + "/" + match.params.id);
                    console.log(result.real_extension)

                    if (result.real_extension == 'text/plain') {
                      fetch(props.content_endpoint + "/" + match.params.id)
                          .then(res => res.text())
                          .then(
                              (content_result) => {
                                console.log(content_result);
            
                                  setContentResult(content_result);
                              }
                          )
                    } 
                    else if (result.real_extension == 'text/xml') {
                      fetch(props.content_endpoint + "/" + match.params.id)
                          .then(res => res.text())
                          .then(
                              (content_result) => {
                                console.log(content_result);
            
                                  setContentResult(content_result);
                              }
                          )
                    } 
                    else {
                      setContentResult('Plik nie jest w formacie do wyświetlenia.')
                    }

                }
            )

        setActive(match.params.id);


        fetch("pdf_report/" + match.params.id)
            .then(res => res.json())
            .then(
                (pdf_report) => {
                    console.log(pdf_report);
                    SetPdfReport(pdf_report);
                  })
    });

    function getValidityString(valid) {
      if (result.real_extension == 'text/xml') {
          if (valid)
              return (<span style={{ color: "green" }}>Plik XML wysłany poprawnie</span>);

          return (<span style={{ color: "red" }}>Błąd w pliku XML</span>);
      }
    };

    return (
        <div class="container">
        <div class="row py-5">
          <div class="col-lg-9 mx-auto text-white text-center">
            <h1 class="display-4">{result.title}</h1>
            <p class="lead mb-0">{result.real_extension}</p>
          </div>
        </div>
      
        <div class="row">
          <div class="col-lg-9 mx-auto">
            <div id="accordionExample" class="accordion shadow">
      
              <div class="card">
                <div id="headingOne" class="clickbox card-header bg-white shadow-sm border-0">
                  <h6 class="mb-0 font-weight-bold">
                    <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" className="d-block position-relative text-dark text-uppercase collapsible-link py-2">
                      <strong>Poprawność</strong>: {getValidityString(result.valid)}
                      </a>
                      {/* <a href="http://localhost" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" className="d-block position-relative text-dark text-uppercase collapsible-link py-2">
                      <strong>Pobierz raport</strong>: {getValidityString(result.valid)}
                      </a> */}
                    </h6>
                </div>
                
                <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse show">
                  <div class="card-body p-5">
                    <p class="font-weight-light m-0"></p>
                    <p>
                      {content_result}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
        // <MDBContainer className="mx-auto" style={{ backgroundColor: "#f5f8ff" }}>
        //     <MDBRow className="my-3">
        //         <MDBCol className="col col-12">
        //             <MDBCard className="shadow p-3" style={{ backgroundColor: "white" }}>
        //                 <MDBCardTitle>
        //                     <h3 className="text-center">
        //                         <i className="fas fa-file-alt"></i>
        //                         &nbsp;&nbsp;&nbsp;
        //                         {result.title}
        //                     </h3>
        //                 </MDBCardTitle>
        //                 <MDBCardBody className="px-3">
        //                     <MDBRow>
        //                         <MDBCol className="col-4">
        //                             <strong>Typ pliku</strong>
        //                         </MDBCol>
        //                         <MDBCol className="col-8">
        //                             {result.real_extension}
        //                         </MDBCol>
        //                     </MDBRow>
        //                     <MDBRow>
        //                         <MDBCol className="col-4">
        //                             <strong>Poprawność</strong>
        //                         </MDBCol>
        //                         <MDBCol className="col-8">
        //                             {getValidityString(result.valid)}
        //                         </MDBCol>
        //                     </MDBRow>
        //                 </MDBCardBody>
        //             </MDBCard>
        //         </MDBCol>
        //     </MDBRow>
        //     <MDBRow className="my-3">
        //         <MDBCol className="col col-12">
        //             <MDBCard className="shadow p-3" style={{ backgroundColor: "white" }}>
        //                 <MDBCardTitle>
        //                     <h3 className="text-center">
        //                         <i className="fas fa-file-alt"></i>
        //                         &nbsp;&nbsp;&nbsp;
        //                         Zawartość
        //                     </h3>
        //                 </MDBCardTitle>
        //                 <MDBCardBody className="px-3">
        //                     {result.valid ? <MyXmlDocument xmlString={result.xml} /> : <p>Plik nieprawidłowy</p>}
        //                 </MDBCardBody>
        //             </MDBCard>
        //         </MDBCol>
        //     </MDBRow>
        // </MDBContainer>
    );
}

export default ViewFileInfo;