import { Button, Input, Row, Col, Select, Table } from "antd";
import React, { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.less";

const { Option } = Select;

const mockDataSource = [
  {
    productId: 1,
    productName: "测试",
    productType: 1,
    productDesc:
      "商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述",
  },
];

const ProductManagement = () => {
  const [filter, setFilter] = useState({
    productName: "",
    keywords: [],
    productType: 0,
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

  const clickEdit = (id) => {
    console.log("edit", id);
  };

  const columns = [
    {
      title: "商品ID",
      key: "productId",
      dataIndex: "productId",
      width: 120,
    },
    {
      title: "商品名称",
      key: "productName",
      dataIndex: "productName",
      width: 200,
    },
    {
      title: "商品类型",
      key: "productType",
      dataIndex: "productType",
      width: 120,
    },
    {
      title: "商品描述",
      key: "productDesc",
      dataIndex: "productDesc",
      ellipsis: true,
      width: 200,
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
                clickEdit(record.productId);
              }}
            >
              编辑
            </span>
          </>
        );
      },
    },
  ];
  return (
    <div className="product-management">
      <div className="page-title">商品管理</div>
      <div className="search-bar">
        <Row gutter={10}>
          <Col>
            <Input
              className="search-item"
              placeholder="商品名称"
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
              placeholder="关键字"
              mode="tags"
              allowClear
              value={filter.keywords}
              onChange={(value) => {
                onFilterChange("keywords", value);
              }}
            />
          </Col>
          <Col>
            <Select
              className="search-item"
              placeholder="商品类型"
              value={filter.productType}
              onChange={(value) => {
                onFilterChange("productType", value);
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
        <div className="tool-bar">
          <Button type="primary" icon={<PlusOutlined />}>
            新建商品
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockDataSource}
          rowKey="productId"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
