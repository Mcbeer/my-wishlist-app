import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { Landing } from "./Pages/Landing/Landing";
import { Navbar } from "./Components/Navbar/Navbar";
import { Lists } from "./Pages/Lists/Lists";
import { Provider, useSelector } from "react-redux";
import { store } from "./Store/Store";
import { StoreModel } from "./Models/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./Components/Header/Header";
import { Wishlist } from "./Pages/Wishlist/Wishlist";
import { Login } from "./Pages/Login/Login";

export const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <div className="App__content">
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <AuthorizedRoute path="/lists" exact component={Lists} />
              <AuthorizedRoute
                path="/lists/:listId"
                exact
                component={Wishlist}
              />
            </Switch>
          </div>
          <Navbar />
        </Router>
      </div>
      <ToastContainer></ToastContainer>
    </Provider>
  );
};

const AuthorizedRoute = ({ path, exact, component }: RouteProps) => {
  // Check for auth status here
  const user = useSelector((state: StoreModel) => state.user);
  console.log(user);

  if (user.loading) {
    return <div>Loading...</div>;
  }

  if (user.data.authenticated) {
    return <Route path={path} exact={exact} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};
