import ReactDOM from 'react-dom/client'
import middlewares from './middlewares';
import applyMiddleware from './utils/applyMiddleware';
import { ElementNotFound } from './utils/errors';
import is from './utils/is';
import 'reset-css';
import './styles/main.scss';
import './styles/animations.scss';
import { RouterProvider } from 'react-router';
import indexRouteObject from './pages';
import { createBrowserRouter } from 'react-router-dom';

const ROOT_ELEMENT_ID = 'root';
const element = document.getElementById(ROOT_ELEMENT_ID);
const router = createBrowserRouter(indexRouteObject);

if (is.null(element)) {
  throw new ElementNotFound('element id is not found: ' + ROOT_ELEMENT_ID);
}

const rootElement = ReactDOM.createRoot(element);

rootElement.render(
  applyMiddleware(<RouterProvider router={router} />, ...middlewares)
);

