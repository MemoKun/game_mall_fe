import React, { useEffect, useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { uploadFile } from "../../utils/alioss";

function PictureWall(props) {
  // 待优化，外部更改value时并未同步更改fileList
  const { value, onChange, disabled, maxLength = 5 } = props;

  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    onChange(fileList.map((item) => item.response));
  }, [fileList, onChange]);

  const cancelPreview = () => {
    setPreviewVisible(false);
    setPreviewImg("");
  };

  const handlePreview = (file) => {
    setPreviewVisible(true);
    setPreviewImg(file.response);
  };

  const handleChange = (info) => {
    setFileList(info.fileList);
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name}上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name}上传失败`);
    }
  };

  const handleRemove = (file) => {
    const newList = value.filter((url) => url === file.url);
    onChange(newList);
  };

  const customRequest = async ({ file, filename, onError, onSuccess }) => {
    try {
      const res = await uploadFile(file);
      onSuccess(res.url, file);
    } catch (e) {
      onError(e);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  return (
    <div className="picture-wall">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        customRequest={customRequest}
        accept="image/*"
        onDownload={(file) => {
          window.open(file.response);
        }}
        disabled={disabled}
      >
        {fileList.length >= maxLength ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={cancelPreview}>
        <img alt="example" style={{ width: "100%" }} src={previewImg} />
      </Modal>
    </div>
  );
}

export default PictureWall;
