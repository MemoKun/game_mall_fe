import React, { useState } from "react";
import { Button, Input, Row, Col, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.less";
import { useHistory } from "react-router-dom";
import { OrderStatusMap } from "../../common/constants";

const mockDataSource = [
  {
    orderId: 1,
    orderNo: "GM123456",
    productName: "【传奇】代练",
    createdTime: "1619531575",
    bannerImgs: [
      "https://jackyliu.cn/wp-content/uploads/2021/01/ma21004-1024x683.jpg",
      "https://pic4.zhimg.com/v2-029172d2fa000918b5027249c0a56114_1440w.jpg?source=172ae18b",
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
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
