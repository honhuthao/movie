import { Card as CardA, CardProps as CardPropsA } from "antd";
import { CardMetaProps } from "antd/es/card";

import React from "react";
type CardObject = {
  (props: CardPropsA);
  Meta: React.FC<CardMetaProps>;
  Grid: React.FC<CardMetaProps>;
};
export const Card: CardObject = (props) => {
  return <CardA {...props} />;
};
Card.Meta = CardA.Meta;
Card.Grid = CardA.Grid;
