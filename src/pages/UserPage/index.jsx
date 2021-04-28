import { Button, Form, Input } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./index.less";

const UserPage = () => {
  const [form] = Form.useForm();
  const { userInfo } = useContext(UserContext);

  const clickSave = () => {
    console.log("form", form.getFieldsValue());
    console.log("userInfo", userInfo);
  };

  return (
    <div className="user-page">
      <div className="page-title">账号管理</div>
      <div className="page-card">
        <div style={{ marginBottom: 20 }}>
          <b className="page-card-title">我的信息</b>
          <div className="divider"></div>
        </div>
        <Form form={form} wrapperCol={{ span: 16 }} labelCol={{ span: 2 }}>
          <Form.Item
            label="用户名"
            name="nickname"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              maxLength={8}
              placeholder="请输入用户名"
              style={{ width: 300 }}
            />
          </Form.Item>
          <Form.Item label="签名" name="sign">
            <Input.TextArea
              maxLength={200}
              style={{ width: 400 }}
              showCount
              allowClear
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="这个人很懒，什么都没留下~"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button type="primary" onClick={clickSave}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserPage;
