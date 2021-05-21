import { Button, Form, Input, message, Modal } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UserDeleteOutlined } from "@ant-design/icons";
import "./index.less";

const UserPage = () => {
  const [form] = Form.useForm();
  const { userInfo, logout } = useContext(UserContext);

  const clickSave = () => {
    console.log("form", form.getFieldsValue());
    console.log("userInfo", userInfo);
    message.success("保存信息成功！");
  };

  const clickDelUser = () => {
    Modal.confirm({
      title: "确认要注销账号？",
      content: "注销账号后将无法再使用该账号！",
      okText: "确认注销",
      cancelText: "我再想想",
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        logout();
        message.info("注销账号成功！");
      },
    });
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
      <div className="page-card">
        <div style={{ marginBottom: 20 }}>
          <b className="page-card-title">账号操作</b>
          <div className="divider"></div>
        </div>
        <Form.Item label="注销账号">
          <Button
            danger
            type="primary"
            icon={<UserDeleteOutlined />}
            onClick={clickDelUser}
          >
            注销账号
          </Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default UserPage;
