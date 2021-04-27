import { Button, Input, message, Table } from "antd";
import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.less";

const mockDataSource = [
  {
    id: 10001,
    CDKey: "1611408636Bb3upLZb48PMxkq6XXVSQuPtOuf0QI1Q",
    type: "金额充值",
    mount: 1000,
    createdTime: "1619531575",
  },
];

const columns = [
  {
    title: "ID",
    key: "id",
    dataIndex: "id",
    width: 120,
  },
  {
    title: "充值码",
    key: "CDKey",
    dataIndex: "CDKey",
    width: 200,
  },
  {
    title: "类型",
    key: "type",
    dataIndex: "type",
    width: 100,
  },
  {
    title: "金额/元",
    key: "mount",
    dataIndex: "mount",
    width: 200,
    render: (value) => ((value || 0) / 100).toFixed(2),
  },
  {
    title: "充值时间",
    key: "createdTime",
    dataIndex: "createdTime",
    width: 200,
    render: (value) =>
      moment((value || 0) * 1000).format("YYYY-MM-DD HH:mm:ss"),
  },
];

const WalletPage = () => {
  const { userInfo } = useContext(UserContext);
  const [CDKey, setCDKey] = useState("");
  const clickRecharge = () => {
    if (!CDKey) {
      message.warn("请填写充值码");
      return;
    }
    console.log("recharge", CDKey);
  };
  return (
    <div className="wallet-page">
      <div className="page-title">我的钱包</div>
      <div className="page-card balance">
        <span>当前余额：</span>
        <span>{(userInfo.balance || 0 / 100).toFixed(2)}</span>
        <span> 元</span>
      </div>
      <div className="page-card">
        <div>
          <b className="page-card-title">充值卡充值</b>
        </div>
        <div>
          <Input
            placeholder="在此填写充值码"
            style={{ marginTop: 10, width: 300, marginRight: 10 }}
            value={CDKey}
            onChange={(e) => {
              setCDKey(e.target.value);
            }}
          />
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={clickRecharge}
          >
            充值
          </Button>
        </div>
      </div>
      <div className="page-card">
        <b className="page-card-title">充值记录</b>
        <Table columns={columns} rowKey="id" dataSource={mockDataSource} />
      </div>
    </div>
  );
};

export default WalletPage;
