import React from "react";
import { Row, Col, Card, Button } from "antd";
import "antd/dist/antd.css";
import DocumentList from "./DocumentList";
import SelectorTable from "./SelectorTable";
import { useSelector, useDispatch } from "react-redux";
import { setTag } from "./store/documentsSlice";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import "./App.css";
import PDH_logo from "./PDH-logo-master-orange-black.png";
import orion_logo from "./orion-health-logo.png";
import waikato_logo from "./Waik_Word_RGB_H.jpg";
import { Container } from "react-bootstrap";
import SelectItems from "./SelectItems";


function App() {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);
  const selectedDocId = useSelector((state) => state.selectedDoc.id);

  const exportToCSV = () => {
    let selectedDoc = documents[selectedDocId];
    let csvContent = "index,content,tag\n";

    selectedDoc.content.forEach((row) => {
      var content = ","+`${row.content}`.replace(/(\r\n|\n|\r)/gm, "") + ",";
      csvContent += `${row.index}`+ content + `${row.tag}\n`;
    });

    console.log(csvContent);
    let csvFile = new Blob([csvContent], { type: "text/csv" });
    let downloadLink = document.createElement("a");
    downloadLink.download = selectedDoc.filename.replace(".txt", ".csv");
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };

  const uploadModel = () => {
      // Select a model from file dialog and upload model
  }

  const onPressPredict = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }


  return (
    <div className="App">
      <Row>
        <Col>
          <h1 className="title">Online Prediction Tool</h1>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <DocumentList />
          </Card>
        </Col>
        <Col span={17}>
          <Card>
            <SelectItems />
            <Button
                className="uploadModel-btn"
                type="primary"
                icon={<UploadOutlined />}
                onClick={uploadModel}
              >
                Upload Model
              </Button>
            <Button 
                className="predict-btns"
                type="primary"
                onclick = {onPressPredict}>
                Predict
        </Button>
          </Card>
          <Card style={{ height: "90%" }}>
            <SelectorTable />
            
            {documents[selectedDocId] && (
              <Button
                className="download-btn"
                type="primary"
                icon={<DownloadOutlined />}
                onClick={exportToCSV}
              >
                Download CSV
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Container fluid>
      <Row>
        <Col md={8}>
          <a href="https://precisiondrivenhealth.com/">
            <img className="logo1" src={PDH_logo} alt="PDH logo" fluid ></img>
          </a>
        </Col>
        <Col md={8}>
          <a href="https://orionhealth.com/nz/">
          <img className="logo" src={orion_logo} alt="Orion Health logo" fluid></img>
          </a>
          </Col>
        <Col md={8}>
          <a href="https://www.waikato.ac.nz/">
          <img className="logo1" src={waikato_logo} alt="Waikato Uni logo" fluid></img>
          </a>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
