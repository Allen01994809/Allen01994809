import { StrictMode } from "react";
import { MiddlewareComponent } from "../utils/applyMiddleware";
import ReactQueryMiddleware from './ReactQueryMiddleware';

const middlewares: MiddlewareComponent[]  = [
  StrictMode,
  ReactQueryMiddleware,
];

export default middlewares;

