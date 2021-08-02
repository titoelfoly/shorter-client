import { GET_LINK, REDIRECT } from "../actions/types";

const initialState = {
  links: null,
  redirectTo: "",
  fullfilled: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LINK:
      return {
        links: action.payload[0],
        redirectTo: action.payload[0].web_link,
      };
    case REDIRECT:
      return {
        ...state,
        redirectTo: action.payload,
      };

    default:
      return state;
  }
};
