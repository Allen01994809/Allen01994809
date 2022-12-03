import { Outlet, RouteObject } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import ImageQuantization from '../components/ImageQuantization/ImageQuantization';

const indexRouteObject: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <div style={{ width: '100vw', height: '100vh', background: '#ff0' }}>index</div>
      },
      {
        path: '/hoge',
        element: <div style={{ width: '100vw', height: '100vh', background: '#0aa' }}>hoge</div>
      },
      {
        path: '/fuga',
        element: <ImageQuantization />
      }
    ],
  },
];

// TODO: ここら辺を外出ししたい。
function App (){
  const location = useLocation();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">index</Link>
            <Link to="/hoge">hoge</Link>
            <Link to="/fuga">fuga</Link>
          </li>
        </ul>
      </nav>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="scale"
          timeout={300}
          unmountOnExit>
          {() => (
            <div><Outlet /></div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};


export default indexRouteObject;

