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
  message,
} from "antd";
import React, { useState } from "react";
import DefaultAvatar from "../../assets/default_avatar.png";

import "./index.less";

const prodcutDetail = {
  productId: 1,
  price: 9800,
  productName: "绝地求生",
  productDesc:
    "《绝地求生》(PUBG) 是由蓝洞开发的一款战术竞技型射击类沙盒游戏，在该游戏中，玩家需要在游戏地图上收集各种资源，并在不断缩小的安全区域内对抗其他玩家，让自己生存到最后。",
  tags: ["射击", "多人"],
  provider: "蓝洞",
  bannerImgs: [
    "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG1.jpg",
    "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG3.jpg",
    "http://edu-mall-csu.oss-cn-beijing.aliyuncs.com/gameMall/PUBG2.jpg",
  ],
};

const commentList = [
  {
    id: 1,
    avatar: "",
    content: "这游戏真有意思！",
    nickname: "评论用户1",
  },
  {
    id: 2,
    avatar: "",
    content: "和朋友4排好玩了",
    nickname: "评论用户2",
  },
  {
    id: 3,
    avatar: "",
    content: "游戏体验不太行啊，每次抢都找不到！辣鸡游戏！",
    nickname: "评论用户3",
  },
  {
    id: 4,
    avatar: "",
    content: "这游戏开车兜风还挺有意思的哈哈哈",
    nickname: "评论用户4",
  },
];

const ProductDetail = () => {
  const [comment, setComment] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const clickSubmit = () => {
    console.log("createComment", comment);
  };

  const clickBuy = () => {
    message.success("购买成功！");
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
            <Row className="buy-btn">
              <Col>
                <Button type="primary" onClick={clickBuy}>
                  立即购买
                </Button>
              </Col>
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
                avatar={item.avatar || DefaultAvatar}
              />
            </li>
          )}
        />
      </Card>
    </div>
  );
};

export default ProductDetail;
