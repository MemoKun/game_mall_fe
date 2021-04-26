import { Layout } from "antd";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductManagement from "../../pages/ProductManagement/index";
import "./index.less";

const AppContent = () => {
  return (
    <Layout className="site-content">
      <Layout.Content>
        <Switch>
          <Route exact path="/product/management">
            <ProductManagement />
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Layout.Content>
    </Layout>
  );
};

export default AppContent;
