import { Button, Input, Modal, Form, message } from "antd";
import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";

const initialValues = {
  account: "",
  password: "",
  repeatedPassword: "",
  nickname: "",
};

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const clickLogin = () => {
    login();
  };
  const clickRegister = async () => {
    try {
      const formData = await form.validateFields();
      console.log("register", formData);
      message.success("注册成功");
      setVisible(false);
    } catch (e) {
      message.warn("请填写完整");
    }
  };
  return (
    <div className="login-page">
      <div className="login-items">
        <div className="login-title">欢迎来到游戏商城</div>
        <Input
          style={{ marginBottom: 20 }}
          placeholder="请输入账号"
          prefix={<UserOutlined />}
        />
        <Input
          style={{ marginBottom: 20 }}
          placeholder="请输入密码"
          prefix={<LockOutlined />}
        />
        <Button
          style={{ marginBottom: 10 }}
          type="primary"
          block
          shape="round"
          onClick={clickLogin}
        >
          登录
        </Button>
        <span
          className="link-text"
          style={{ alignSelf: "flex-end" }}
          onClick={() => {
            setVisible(true);
          }}
        >
          快速注册
        </span>
      </div>
      <Modal
        title="注册"
        okText="确认注册"
        cancelText="已有账号直接登录"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        onOk={clickRegister}
      >
        <Form
          initialValues={initialValues}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="账号"
            rules={[{ required: true, message: "请输入账号" }]}
            name="account"
          >
            <Input placeholder="请输入账号" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="密码"
            rules={[
              { required: true, message: "请输入密码" },
              {
                validator: (_, value) => {
                  return value && value.length >= 6
                    ? Promise.resolve()
                    : Promise.reject("密码长度为6~12位");
                },
              },
            ]}
            name="password"
          >
            <Input placeholder="请输入密码" type="password" maxLength={12} />
          </Form.Item>
          <Form.Item
            label="重复密码"
            rules={[
              { required: true, message: "请重复输入密码" },
              {
                validator: (_, value) => {
                  return `${value}` === `${form.getFieldValue("password")}`
                    ? Promise.resolve()
                    : Promise.reject("与密码不一致");
                },
              },
            ]}
            name="repeatedPassword"
          >
            <Input
              placeholder="请重复输入密码"
              type="password"
              maxLength={12}
            />
          </Form.Item>
          <Form.Item
            label="用户名"
            rules={[{ required: true, message: "请输入用户名" }]}
            name="nickname"
          >
            <Input placeholder="请输入用户名" maxLength={8} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginPage;
