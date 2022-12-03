import { createElement, FC, ReactNode } from "react";

export type MiddlewareComponent = FC<{
  children?: ReactNode;
}>;

const applyMiddleware = (targetComponent: ReactNode, ...components: MiddlewareComponent[]) => {
  return components.reduce((node, Middleware) =>
    createElement(Middleware, {
      children: node,
    }),
    targetComponent);
}

export default applyMiddleware;
