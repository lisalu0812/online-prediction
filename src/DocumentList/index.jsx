import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDocument } from "../store/documentsSlice";
import { setSelectedDoc } from "../store/selectedDocSlice";
import { List, Button } from "antd";
import "./DocumentList.css";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { UploadOutlined } from "@ant-design/icons";
import { setSelectedRows } from "../store/selectedRowsSlice";

const DocumentList = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);
  const selectedDocId = useSelector((state) => state.selectedDoc.id);
  const [numDocuments, setNumDocuments] = useState(0);

  const handleAddDocument = (file) => {
    setNumDocuments((numDocuments) => numDocuments + 1);
    let id = numDocuments;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let content = reader.result;
      if (content) {
        dispatch(
          addDocument({
            id,
            filename: file.name,
            content,
          })
        );
      }
    };
  };

  const changeSelectedDoc = (id) => {
    dispatch(setSelectedRows([]));
    dispatch(setSelectedDoc(id));
  };

  const Layout = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    return (
      <div {...dropzoneProps} style={{ height: 700 }}>
        <List
          dataSource={documents}
          renderItem={(item) => (
            <div onClick={() => changeSelectedDoc(item.id)}>
              <List.Item
                className={
                  "list-item" +
                  (selectedDocId === item.id ? " item-selected" : "")
                }
              >
                <List.Item.Meta
                  className="list-item-meta"
                  title={item.filename}
                />
              </List.Item>
            </div>
          )}
          style={{ width: "100%" }}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="top-title">
        <h2>
          <b>Documents</b>
          <label className="upload-btn">
            <UploadOutlined />
            <input
              type="file"
              onChange={(e) => handleAddDocument(e.target.files[0])}
              style={{ display: "none" }}
              accept=".txt"
            />
          </label>
        </h2>
      </div>
      <div>
        <Dropzone
          onChangeStatus={({ meta, file }, status) => {
            if (status === "done") {
              handleAddDocument(file);
            }
          }}
          accept=".txt"
          LayoutComponent={Layout}
        />
      </div>
    </div>
  );
};

export default DocumentList;
