import { Layout } from "antd";
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./index.less";

const AppContent = () => {
  return (
    <Layout className="site-content">
      <Layout.Content>
        <Switch>
          <Route exact path="/">
            <div>root</div>
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  );
};

export default AppContent;
