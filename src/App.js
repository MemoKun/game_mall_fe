import { BrowserRouter } from "react-router-dom";
import { routerPrefix } from "./common/constants";
import "./App.less";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppSider from "./components/AppSider";
import AppContent from "./components/AppContent";

function App() {
  return (
    <BrowserRouter basename={routerPrefix}>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
