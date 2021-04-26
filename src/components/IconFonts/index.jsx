import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2510831_b7ym8f3l3z.js",
});
export default IconFont;

export const GameIconFont = (props) => <IconFont type="icon-game" {...props} />;
