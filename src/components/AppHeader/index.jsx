import { Layout, Dropdown, Menu } from "antd";
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
} from "@ant-design/icons";

const AppHeader = () => {
  const { userInfo } = useContext(UserContext);
  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>账号管理</Menu.Item>
      <Menu.Item icon={<UnorderedListOutlined />}>购买记录</Menu.Item>
      <Menu.Item icon={<WalletOutlined />}>我的钱包</Menu.Item>
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
