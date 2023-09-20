import { Spin as SpinA, SpinProps as SpinPropsA } from "antd";
type Spin = SpinPropsA & {};
export const Spin = (props: Spin) => {
  return <SpinA {...props} />;
};
