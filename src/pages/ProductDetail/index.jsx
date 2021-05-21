import {
  Image,
  Carousel,
  Tag,
  Row,
  Col,
  Card,
  Comment,
  Input,
  Button,
  List,
} from "antd";
import React, { useState } from "react";
import "./index.less";

const prodcutDetail = {
  productId: 1,
  price: 9999,
  productName: "绝地求生",
  productDesc:
    "游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述游戏描述",
  tags: ["FPS", "TPS", "多人"],
  provider: "哈哈哈",
  bannerImgs: [
    "https://jackyliu.cn/wp-content/uploads/2021/01/ma21004-1024x683.jpg",
    "https://pic4.zhimg.com/v2-029172d2fa000918b5027249c0a56114_1440w.jpg?source=172ae18b",
    "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
  ],
};

const commentList = [
  {
    id: 1,
    avatar:
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
    content:
      "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
    nickname: "评论用户1",
  },
  {
    id: 2,
    avatar:
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
    content:
      "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
    nickname: "评论用户2",
  },
  {
    id: 3,
    avatar:
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
    content:
      "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
    nickname: "评论用户3",
  },
  {
    id: 4,
    avatar:
      "https://img.cehca.com/uploadimg/image/20191218/20191218115754_28238.jpg",
    content:
      "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
    nickname: "评论用户4",
  },
];

const ProductDetail = () => {
  const [comment, setComment] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const clickSubmit = () => {
    console.log("createComment", comment);
  };

  const editor = (
    <>
      <Input.TextArea
        rows={4}
        maxLength={200}
        value={comment}
        showCount
        allowClear
        onChange={(e) => {
          setComment(e.target.value);
        }}
        style={{ marginBottom: 10, width: 800 }}
        placeholder="留下你的评论吧~"
      />
      <Button type="primary" onClick={clickSubmit}>
        发表评论
      </Button>
    </>
  );

  return (
    <div className="product-detail-page">
      <div className="page-title">
        {prodcutDetail.productName || "游戏详情"}
      </div>
      <div className="detail-div">
        <div className="main-detail">
          <div className="detail-imgs">
            {prodcutDetail ? (
              <Carousel autoplay>
                {(prodcutDetail.bannerImgs || []).map((src) => (
                  <Image src={src} key={src} className="banner-img" />
                ))}
              </Carousel>
            ) : null}
          </div>
          <div className="detail-info">
            <Row className="info-item">
              <Col>游戏分类：</Col>
              <Col>
                {(prodcutDetail.tags || []).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Col>
            </Row>
            <Row className="info-item">
              <Col>游戏描述：</Col>
              <Col className="product-desc">{prodcutDetail.productDesc}</Col>
            </Row>
          </div>
        </div>
      </div>
      <Card className="comment-div" title="评论">
        <Comment content={editor} />
        <div className="divider"></div>
        <List
          header={`共${commentList.length}条回复`}
          itemLayout="horizontal"
          dataSource={commentList}
          rowKey={(item) => item.id}
          pagination={{
            pageSize: 20,
            current: pageNum,
            onChange: (page) => {
              setPageNum(page);
            },
          }}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.nickname}
                content={item.content}
                avatar={item.avatar}
              />
            </li>
          )}
        />
      </Card>
    </div>
  );
};

export default ProductDetail;
