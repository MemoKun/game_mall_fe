import { Layout, Dropdown, Menu, Button, Modal, message } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { GameIconFont } from "../IconFonts";
import DefaultAvatar from "../../assets/default_avatar.png";
import "./index.less";
import {
  CaretDownOutlined,
  UserOutlined,
  UnorderedListOutlined,
  WalletOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const { userInfo, logout } = useContext(UserContext);

  const clickLogout = () => {
    Modal.confirm({
      content: "确认要退出当前账号？",
      okText: "确认退出",
      cancelText: "取消",
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        logout();
        message.success("退出成功！");
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/user">
          <Button icon={<UserOutlined />} type="text" size="small">
            账号管理
          </Button>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/order">
          <Button icon={<UnorderedListOutlined />} type="text" size="small">
            我的订单
          </Button>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/wallet">
          <Button icon={<WalletOutlined />} type="text" size="small">
            我的钱包
          </Button>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <Button
          icon={<LoginOutlined />}
          type="text"
          danger
          size="small"
          onClick={clickLogout}
        >
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout.Header className="site-header">
      <div className="header-title">
        <GameIconFont style={{ fontSize: 32, marginLeft: 20 }} />
        <span style={{ marginLeft: 10, fontWeight: "bold" }}>游戏商城</span>
      </div>
      <Dropdown overlay={menu}>
        <div className="user-info">
          <img
            src={userInfo.avatar || DefaultAvatar}
            alt=""
            className="avatar"
          />
          <span style={{ marginRight: 5 }}>{userInfo.nickname}</span>
          <CaretDownOutlined />
        </div>
      </Dropdown>
    </Layout.Header>
  );
};

export default AppHeader;
