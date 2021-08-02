import React, { Fragment, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { getLink, redirect, makeBase } from "./actions/shorterActions";
import { useHistory } from "react-router-dom";
import MakeShorten from "./components/MakeShorten";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Navbar from "./components/layout/Navbar";
import LinkList from "./components/LinkList";
import SetAuthToken from "./utils/SetAuthToken";

const userOS = () => {
  if (window.navigator.userAgent.includes("Android")) {
    return "Android";
  } else if (window.navigator.userAgent.includes("iOS")) {
    return "IOS";
  } else {
    return "Web";
  }
};
const App = (props) => {
  if (props.auth.isAuthenticated) {
    let token = localStorage.getItem("token");
    SetAuthToken(token);
  }
  const [slug, setSlug] = useState("");
  const [link, setLink] = useState("/");
  const [platform, setPlatform] = useState("/");

  const history = useHistory();
  useEffect(() => {
    if (props.base === null) {
      props.makeBase(window.location.href);
    }
    setSlug(window.location.pathname);
    setPlatform(userOS);
    if (props.shorter.links === null) {
      props.getLink(slug);
    }
    if (props.shorter.links !== null) {
      setLink(props.link);
    }
  }, [slug, props.link, link, history, props.auth.isAuthenticated]);

  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        {props.link !== null && link !== "/" && platform === "Web" ? (
          // <RedirectTo link={link}></RedirectTo>
          <Route
            component={() => {
              console.log(link);
              window.location.href = link.web_link;
              console.log("weblink", link.web_link);
              // window.location.href = `http:w
              //${link.web_link}/`;
              s: return null;
            }}
          />
        ) : props.slug === null && link !== "/" && platform === "Android" ? (
          // <RedirectTo link={link}></RedirectTo>
          <Route
            component={() => {
              window.location.href = link.android_link;
              // window.location.href = `http:w
              //${link.web_link}/`;
              s: return null;
            }}
          />
        ) : props.slug === null && link !== "/" && platform === "IOS" ? (
          // <RedirectTo link={link}></RedirectTo>
          <Route
            component={() => {
              window.location.href = link.ios_link;
              // window.location.href = `http:w
              //${link.web_link}/`;
              s: return null;
            }}
          />
        ) : (
          <Fragment>
            <Route component={Home} path="/" exact />
            <Switch>
              <Route compontn={Register} path="/register" exact />
              <Route component={Login} path="/login" exact />
              <Route component={LinkList} path="/links" exact />
            </Switch>
          </Fragment>
        )}
      </Fragment>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  shorter: state.shorter,
  auth: state.auth,
  link: state.shorter.link,
  base: state.shorter.base,
  slug: state.shorter.slug,
});
export default connect(mapStateToProps, { getLink, redirect, makeBase })(App);
