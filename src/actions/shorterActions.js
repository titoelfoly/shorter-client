import axios from "axios";
import { GET_LINK, REDIRECT } from "./types";

export const getLink = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5002/shorter/${slug}`);
    dispatch({ type: GET_LINK, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};

export const redirect = (link) => async (dispatch) => {
  dispatch({ type: REDIRECT, payload: link });
};
