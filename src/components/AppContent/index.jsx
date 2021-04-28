import { Layout } from "antd";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductDetail from "../../pages/ProductDetail";
import ProductList from "../../pages/ProductList";
import ProductManagement from "../../pages/ProductManagement/index";
import RecordsPage from "../../pages/RecordsPage";
import UserPage from "../../pages/UserPage";
import WalletPage from "../../pages/WalletPage";
import "./index.less";

const AppContent = () => {
  return (
    <Layout className="site-content">
      <Layout.Content>
        <Switch>
          <Route exact path="/user">
            <UserPage />
          </Route>
          <Route exact path="/wallet">
            <WalletPage />
          </Route>
          <Route exact path="/order">
            <RecordsPage />
          </Route>
          <Route exact path="/product/management">
            <ProductManagement />
          </Route>
          <Route exact path="/product/list">
            <ProductList />
          </Route>
          <Route exact path="/product/detail">
            <ProductDetail />
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Layout.Content>
    </Layout>
  );
};

export default AppContent;
