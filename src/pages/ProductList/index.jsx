import { Card, Col, List, Row, Input, Button } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import "./index.less";
import { useHistory } from "react-router-dom";

const mockDataSource = [
  {
    productId: 1,
    price: 9999,
    productName: "【传奇】极品账号",
    productDesc: "商品描述商品描述商品描述商品描述商品描述商品描述",
    provider: "哈哈哈",
    bannerImgs: [
      "https://jackyliu.cn/wp-content/uploads/2021/01/ma21004-1024x683.jpg",
      "https://pic4.zhimg.com/v2-029172d2fa000918b5027249c0a56114_1440w.jpg?source=172ae18b",
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
    ],
  },
  {
    productId: 2,
    price: 9999,
    productName: "【传奇】极品账号2",
    productDesc: "商品描述商品描述商品描述商品描述商品描述商品描述",
    provider: "哈哈哈",
    bannerImgs: [
      "https://jackyliu.cn/wp-content/uploads/2021/01/ma21004-1024x683.jpg",
      "https://pic4.zhimg.com/v2-029172d2fa000918b5027249c0a56114_1440w.jpg?source=172ae18b",
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
    ],
  },
];

const ProductList = () => {
  const history = useHistory();
  const [pageNum, setPageNum] = useState(1);
  const [filter, setFilter] = useState({
    productName: "",
    provider: "",
  });

  const onFilterChange = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const clickViewDeatail = (id) => {
    history.push(`/product/detail?id=${id}`);
  };

  const clickSearch = () => {
    console.log("searchProducts", filter);
  };

  const renderListItem = (item) => {
    return (
      <List.Item
        className="list-card"
        onClick={() => {
          clickViewDeatail(item.productId);
        }}
      >
        <Card cover={<img src={item.bannerImgs[0] || ""} alt="" />}>
          <Card.Meta
            title={item.productName}
            description={`${item.productDesc}`.slice(0, 20) + "..."}
          />
          <div className="card-footer">
            <div>{item.provider || ""}</div>
            <div className="price">
              <span>￥</span>
              <span>{((item.price || 0) / 100).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </List.Item>
    );
  };
  return (
    <div className="product-list-page">
      <div className="page-title">热门商品</div>
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
            <Input
              className="search-item"
              placeholder="发布方"
              value={filter.provider}
              allowClear
              onChange={(e) => {
                onFilterChange("provider", e.target.value);
              }}
            />
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
      <div className="list-div">
        <List
          dataSource={mockDataSource}
          renderItem={renderListItem}
          rowKey={(item) => item.productId}
          pagination={{
            pageSize: 20,
            current: pageNum,
            onChange: (page) => {
              setPageNum(page);
            },
          }}
          grid={{ gutter: 16, column: 4 }}
        />
      </div>
    </div>
  );
};

export default ProductList;
