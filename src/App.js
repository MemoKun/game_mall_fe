import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routerPrefix } from "./common/constants";
import "./App.less";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppSider from "./components/AppSider";
import AppContent from "./components/AppContent";
import LoginPage from "./pages/LoginPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter basename={routerPrefix}>
      <UserProvider>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <>
            <Layout>
              <AppHeader />
              <Layout>
                <AppSider />
                <AppContent />
              </Layout>
            </Layout>
          </>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
