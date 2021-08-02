import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import MakeShorten from "./MakeShorten";
import Login from "./layout/Login";
import Register from "./layout/Register";
import LinkList from "./LinkList";
const Home = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <MakeShorten></MakeShorten>
    </Fragment>
  );
};
export default Home;
