import SignUp from '../components/SignUp/SignUp';
import Home from '../components/Home/Home';

var routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/home',
    name: 'HOME',
    component: Home,
  },
];
export default routes;
