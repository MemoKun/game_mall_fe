import {
  Button,
  Input,
  Row,
  Col,
  Select,
  Table,
  Drawer,
  Form,
  InputNumber,
  Radio,
} from "antd";
import React, { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.less";
import PictureWall from "../../components/PictrueWall";
import moment from "moment";

const { Option } = Select;

const mockDataSource = [
  {
    productId: 1,
    productName: "测试",
    productType: 1,
    productDesc:
      "商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述",
    createdTime: "1619531575",
  },
];

const initialValues = {
  productName: "",
  producType: 1,
  price: 0,
  productDesc: "",
  extra: "",
};

const ProductManagement = () => {
  const [filter, setFilter] = useState({
    productName: "",
    keywords: [],
    productType: 0,
  });
  const [form] = Form.useForm();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const [bannerImgs, setBannerImgs] = useState([]);

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
    setDrawerVisible(true);
    setProductId(id);
  };

  const clickCreate = () => {
    setDrawerVisible(true);
    setProductId(0);
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
      title: "价格/元",
      key: "price",
      dataIndex: "price",
      width: 120,
      render: (value) => ((value || 0) / 100).toFixed(2),
    },
    {
      title: "商品描述",
      key: "productDesc",
      dataIndex: "productDesc",
      width: 200,
      // ellipsis: true,
      render: (text) => (
        <div style={{ maxHeight: 100, textOverflow: "ellipsis" }}>
          {`${text}`.slice(0, 39) + "..."}
        </div>
      ),
    },
    {
      title: "创建时间",
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

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
    setBannerImgs([]);
  };

  const clickSave = () => {
    console.log("upsertProduct", productId, form.getFieldsValue());
    console.log("bannerImgs", bannerImgs);
  };

  const footer = (
    <div style={{ textAlign: "right" }}>
      <Button style={{ marginRight: 8 }} onClick={closeDrawer}>
        取消
      </Button>
      <Button type="primary" onClick={clickSave}>
        保存
      </Button>
    </div>
  );
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
          <Button type="primary" icon={<PlusOutlined />} onClick={clickCreate}>
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
      <Drawer
        visible={drawerVisible}
        width={600}
        title={productId ? "编辑商品" : "新建商品"}
        onClose={closeDrawer}
        footer={footer}
      >
        <Form
          initialValues={initialValues}
          form={form}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}
        >
          <Form.Item
            label="商品名称"
            name="productName"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input placeholder="请输入商品名称" maxLength={20} />
          </Form.Item>
          <Form.Item
            label="商品类型"
            name="producType"
            rules={[{ required: true, message: "请选择商品类型" }]}
          >
            <Radio.Group>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: "请输入商品价格" }]}
          >
            <InputNumber placeholder="元" min={0} precision={2} />
          </Form.Item>
          <Form.Item
            label="详情图"
            rules={[{ required: true, message: "请上传产品详情图" }]}
          >
            <PictureWall
              value={bannerImgs}
              onChange={setBannerImgs}
              maxLength={5}
            />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="productDesc"
            rules={[{ required: true, message: "请输入商品描述" }]}
          >
            <Input.TextArea
              showCount
              autoSize
              placeholder="请输入商品描述"
              allowClear
              maxLength={200}
            />
          </Form.Item>
          <Form.Item label="备注" name="extra">
            <Input.TextArea
              showCount
              autoSize
              placeholder="备注"
              allowClear
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ProductManagement;
