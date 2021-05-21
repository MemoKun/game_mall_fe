import React from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./index.less";
import { uploadFile } from "../../utils/alioss";

function FileUpload(props) {
  const { value, onChange } = props;

  const customRequest = async ({ file, onError, onSuccess }) => {
    try {
      const res = await uploadFile(file);
      onSuccess(res.url, file);
    } catch (e) {
      onError(e);
    }
  };

  const handleChange = (info) => {
    const { status } = info.file;
    if (status === "done") {
      onChange(info.file.response);
      message.success(`${info.file.name}上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name}上传失败`);
    }
  };
  const handleRemove = () => {
    onChange(undefined);
  };

  return (
    <Upload
      customRequest={customRequest}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      {value ? null : <Button icon={<UploadOutlined />}>点击上传</Button>}
    </Upload>
  );
}
export default FileUpload;
