import { CardActions } from "@material-ui/core";
import axios from "axios";
import SetAuthToken from "../utils/SetAuthToken";
import {
  SET_SLUG,
  REDIRECT,
  ADD_LINKS,
  ADD_LINK,
  GET_LINK,
  GET_LINKS,
  MAKE_SHORTER,
  MAKE_BASE,
} from "./types";

const parseURL = (str) => {
  if (str.includes("http")) {
    return str;
  } else {
    return `http://${str}`;
  }
};
export const getLinks = () => async (dispatch) => {
  try {
    const res = await axios.get("http://3.18.213.237:5000/links");
    dispatch({ type: GET_LINKS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const makeShorter = () => async (dispatch) => {
  dispatch({ type: MAKE_SHORTER });
};
export const makeBase = (base) => async (dispatch) => {
  dispatch({ type: MAKE_BASE, payload: base });
};
export const getLink = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`http://3.18.213.237:5000/shorter/${slug}`);
    dispatch({ type: GET_LINK, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const setSlug = () => async (dispatch) => {
  try {
    dispatch({ type: SET_SLUG });
  } catch (err) {
    console.error(err.message);
  }
};

export const addLinks = (links) => async (dispatch) => {
  let link = {
    web_link: parseURL(links.web_link),
    android_link: parseURL(links.android_link),
    ios_link: parseURL(links.ios_link),
    user: links.user,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://3.18.213.237:5000/shorter/",
      link,
      config
    );
    dispatch({ type: ADD_LINKS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const addLink = (links) => async (dispatch) => {
  let link = {
    web_link: parseURL(links.web_link),
    android_link: parseURL(links.web_link),
    ios_link: parseURL(links.web_link),
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://3.18.213.237:5000/shorter/",
      link,
      config
    );
    dispatch({ type: ADD_LINKS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const redirect = (link) => async (dispatch) => {
  dispatch({ type: REDIRECT, payload: link });
};
