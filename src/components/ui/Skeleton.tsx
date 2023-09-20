import { Skeleton as SkeletonA, SkeletonProps as SkeletonPropsA } from "antd";
import { SkeletonImageProps } from "antd/es/skeleton/Image";
import React from "react";
type Skeleton = SkeletonPropsA & {
  Image: React.FC<SkeletonImageProps>;
};
export const Skeleton = (props: Skeleton) => {
  return <SkeletonA {...props} />;
};
