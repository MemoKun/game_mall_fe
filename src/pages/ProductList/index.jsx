import { Card, Col, List, Row, Input, Button, Select, Tag } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./index.less";
import { useHistory } from "react-router-dom";
import { gameTags } from "../../common/constants";

const { Option } = Select;

const mockDataSource = [
  {
    productId: 1,
    price: 9800,
    productName: "绝地求生",
    productDesc:
      "《绝地求生》(PUBG) 是由蓝洞开发的一款战术竞技型射击类沙盒游戏，在该游戏中，玩家需要在游戏地图上收集各种资源，并在不断缩小的安全区域内对抗其他玩家，让自己生存到最后。",
    provider: "蓝洞",
    bannerImgs: [
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG1.jpg",
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG3.jpg",
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG2.jpg",
    ],
  },
  {
    productId: 2,
    price: 2200,
    productName: "糖豆人",
    productDesc:
      "《糖豆人：终极淘汰赛》(Fall Guys: Ultimate Knockout) 是一款由Mediatonic研发，Devolver Digital发行的多人乱斗闯关综艺游戏",
    provider: "Devolver Digital",
    bannerImgs: [
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/Fall1.png",
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/Fall2.png",
      "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/Fall3.png",
    ],
  },
];

const ProductList = () => {
  const history = useHistory();
  const [pageNum, setPageNum] = useState(1);
  const [filter, setFilter] = useState({
    productName: "",
    provider: "",
    tag: 0,
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
        <Card
          cover={
            <img
              style={{ maxWidth: 248, maxHeight: 160, objectFit: "contain" }}
              src={item.bannerImgs[0] || ""}
              alt=""
            />
          }
        >
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
      <div className="page-title">热门游戏</div>
      <div className="search-bar">
        <Row gutter={10} className="search-row">
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
            <Select
              className="search-item"
              placeholder="游戏分类"
              mode="multiple"
              value={filter.tags}
              onChange={(value) => {
                onFilterChange("tags", value);
              }}
            >
              <Option value={0}>标签0</Option>
              <Option value={1}>标签1</Option>
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
        <Row className="search-row">
          <Col style={{ marginRight: 10 }}>
            <div>游戏分类</div>
          </Col>
          {[{ value: 0, label: "全部" }, ...gameTags].map((item) => (
            <Tag.CheckableTag
              key={item.value}
              value={item.value}
              checked={filter.tag === item.value}
              onChange={() => {
                onFilterChange("tag", item.value);
              }}
            >
              {item.label}
            </Tag.CheckableTag>
          ))}
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
