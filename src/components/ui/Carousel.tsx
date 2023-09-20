import { Carousel as CarouselA, CarouselProps as CarouselPropsA } from "antd";
type CarouselProps = CarouselPropsA & {};
export const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "cover",
};
export const Carousel = (props: CarouselProps) => {
  return <CarouselA {...props} />;
};
