import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const unloginPages = ["/game/mall/login", "/game/mall/register"];

export const UserContext = React.createContext({
  login: () => {},
  refreshUserInfo: () => {},
  userInfo: { userId: "", userType: 1, nickname: "", balance: 0, account: "" },
  isLogin: false,
  setIsLogin: () => {},
  doLogin: (account, password) => {},
});

export const UserProvider = (props) => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const login = () => {
    setIsLogin(true);
    setUserInfo({ nickname: "测试" });
  };

  useEffect(() => {
    if (!isLogin) {
      if (!unloginPages.includes(window.location.pathname)) {
        history.replace("/login");
        message.warn("登录过期，请重新登录");
      }
    } else {
      history.replace("/product/management");
      message.success("登录成功");
    }
  }, [isLogin, history]);

  return (
    <UserContext.Provider value={{ isLogin, userInfo, login }}>
      {props.children}
    </UserContext.Provider>
  );
};
