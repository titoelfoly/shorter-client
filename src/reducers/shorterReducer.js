import {
  GET_LINK,
  REDIRECT,
  ADD_LINKS,
  SET_SLUG,
  GET_LINKS,
  MAKE_SHORTER,
  MAKE_BASE,
} from "../actions/types";

const initialState = {
  links: null,
  link: null,
  redirectTo: "",
  fullfilled: false,
  slug: null,
  base: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LINK:
      return {
        link: action.payload[0],
        redirectTo: action.payload[0].web_link,
      };
    case MAKE_SHORTER:
      return {
        ...state,
        links: null,
      };
    case MAKE_BASE: {
      return {
        ...state,
        base: action.payload,
      };
    }
    case GET_LINKS:
      return {
        ...state,
        links: action.payload,
        slug: "",
      };
    case REDIRECT:
      return {
        ...state,
        redirectTo: action.payload,
      };
    case ADD_LINKS:
      return {
        ...state,
        slug: action.payload,
      };
    case SET_SLUG:
      return {
        ...state,
        slug: null,
      };

    default:
      return state;
  }
};
