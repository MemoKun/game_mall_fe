import { Layout, Menu } from "antd";
import React from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { NavLink, withRouter } from "react-router-dom";
import "./index.less";

const AppSider = withRouter(({ location }) => {
  return (
    <Layout.Sider
      className="site-sider"
      theme="light"
      style={{
        overflow: "auto",
        minHeight: "100vh",
        left: 0,
        borderRight: "1px solid rgb(232, 232, 232)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/product/management" icon={<AppstoreAddOutlined />}>
          <NavLink to="/product/management">
            <span>商品管理</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
});

export default AppSider;
