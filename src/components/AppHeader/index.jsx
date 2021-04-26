import { Layout } from "antd";
import React from "react";
import { GameIconFont } from "../IconFonts";
import "./index.less";

const AppHeader = () => {
  return (
    <Layout.Header className="site-header">
      <div className="header-title">
        <GameIconFont style={{ fontSize: 32, marginLeft: 20 }} />
        <span style={{ marginLeft: 10, fontWeight: "bold" }}>游戏商城</span>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;
