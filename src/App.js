import React, { Fragment, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { getLink, redirect } from "./actions/shorterActions";
import { useHistory } from "react-router-dom";
import MakeShorten from "./components/MakeShorten";
import "./App.css";

const App = (props) => {
  const [slug, setSlug] = useState("");
  const [link, setLink] = useState("/");

  const history = useHistory();
  useEffect(() => {
    setSlug(window.location.pathname);
    if (props.shorter.links === null) {
      props.getLink(slug);
    }
    if (props.shorter.links !== null) {
      setLink(props.shorter.links);
    }
    console.log(link, slug);
  }, [props.shorter.links, slug, link, history]);

  return (
    <Router>
      <Fragment>
        {link !== "/" ? (
          // <RedirectTo link={link}></RedirectTo>
          <Route
            component={() => {
              window.location.href = `https://www.amazon.com/?&tag=googleglobalp-20&ref=pd_sl_7nnedyywlk_e&adgrpid=82342659060&hvpone=&hvptwo=&hvadid=393493755082&hvpos=&hvnetw=g&hvrand=16568382319886883247&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=21468&hvtargid=kwd-10573980&hydadcr=2246_11061421&gclid=CjwKCAjwjJmIBhA4EiwAQdCbxsJf9Cqg6xY0c2Q9wEXkwj3sOg_EW0zN4UBActcCb_dh3rbaUJGVXhoC8lQQAvD_BwE`;
              // window.location.href = `http:w
              //${link.web_link}/`;
              s: return null;
            }}
          />
        ) : (
          <Route component={MakeShorten} />
        )}
      </Fragment>
    </Router>
  );
};

const mapStateToProps = (state) => ({ shorter: state.shorter });
export default connect(mapStateToProps, { getLink, redirect })(App);
