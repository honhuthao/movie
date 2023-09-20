import { Button as ButtonA, ButtonProps as ButtonPropsA } from "antd";
type ButtonProps = ButtonPropsA & {
  // định nghĩa thêm props có thể truyền xuống
};
export const Button = (props: ButtonProps) => {
  return <ButtonA {...props} />;
};
