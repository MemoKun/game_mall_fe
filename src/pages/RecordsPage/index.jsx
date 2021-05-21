import React, { useState } from "react";
import { Button, Input, Row, Col, Select, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.less";
import { useHistory } from "react-router-dom";
import { OrderStatusMap } from "../../common/constants";

const mockDataSource = [
  {
    orderId: 1,
    orderNo: "GM123456",
    productName: "绝地求生",
    createdTime: "1619531575",
    bannerImgs: [
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG1.jpg",
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG3.jpg",
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG2.jpg",
    ],
    status: 1,
  },
];

const { Option } = Select;

const RecordsPage = () => {
  const history = useHistory();
  const [filter, setFilter] = useState({
    productName: "",
    orderNo: "",
    status: 0,
  });
  const onFilterChange = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const clickSearch = () => {
    console.log("searchProducts", filter);
  };

  const clickViewDetail = (id) => {
    history.push(`/product/detail?id=${id}`);
  };
  const clickDownLoad = (record) => {
    message.info(`开始下载游戏${record.productName}`);
  };

  const columns = [
    {
      title: "订单编号",
      key: "orderNo",
      dataIndex: "orderNo",
      width: 120,
    },
    {
      title: "游戏名称",
      key: "productName",
      dataIndex: "productName",
      width: 150,
    },
    {
      title: "游戏名称",
      key: "bannerImgs",
      dataIndex: "bannerImgs",
      width: 150,
      render: (_, record) =>
        record.bannerImgs && record.bannerImgs[0] ? (
          <img src={record.bannerImgs[0]} alt="" className="product-imgs" />
        ) : null,
    },
    {
      title: "订单状态",
      key: "status",
      dataIndex: "status",
      width: 150,
      render: (text) => OrderStatusMap[text] || "未知状态",
    },
    {
      title: "下单时间",
      key: "createdTime",
      dataIndex: "createdTime",
      width: 150,
      render: (value) => moment((value || 0) * 1000).format("YYYY-MM-DD"),
    },
    {
      title: "操作",
      key: "operation",
      dataIndex: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <>
            <span
              className="link-text"
              onClick={() => {
                clickViewDetail(record.productId);
              }}
            >
              游戏详情
            </span>
            <span
              className="link-text"
              onClick={() => {
                clickDownLoad(record);
              }}
            >
              文件下载
            </span>
          </>
        );
      },
    },
  ];

  return (
    <div className="records-page">
      <div className="page-title">我的订单</div>
      <div className="search-bar">
        <Row gutter={10}>
          <Col>
            <Input
              className="search-item"
              placeholder="订单编号"
              value={filter.orderNo}
              allowClear
              onChange={(e) => {
                onFilterChange("orderNo", e.target.value);
              }}
            />
          </Col>
          <Col>
            <Input
              className="search-item"
              placeholder="游戏名称"
              value={filter.productName}
              allowClear
              onChange={(e) => {
                onFilterChange("productName", e.target.value);
              }}
            />
          </Col>
          <Col>
            <Select
              className="search-item"
              placeholder="订单状态"
              value={filter.status}
              onChange={(value) => {
                onFilterChange("status", value);
              }}
            >
              <Option value={0}>全部</Option>
            </Select>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={clickSearch}
            >
              搜索
            </Button>
          </Col>
        </Row>
      </div>
      <div className="table-div">
        <Table columns={columns} dataSource={mockDataSource} rowKey="orderId" />
      </div>
    </div>
  );
};

export default RecordsPage;
