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
    const [pdf_report, setPdfReport] = useState('');
    const [pdf_endpoint, setPdfEndpoint] = useState('');

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
        setPdfEndpoint("http://localhost:8000/pdf_report/" + match.params.id);

        fetch("pdf_report/" + match.params.id)
            .then(res => res.json())
            .then(
                (pdf_report) => {
                    console.log(pdf_report);
                    setPdfReport(pdf_report);
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
                      <a href={pdf_endpoint}>
                      Pobierz raport
                      </a>
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
    );
}

export default ViewFileInfo;