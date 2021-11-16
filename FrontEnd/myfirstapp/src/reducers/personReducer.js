import { GET_PERSONS, GET_PERSON, GET_SHOPOWNERS } from "../actions/types";

// a list of person will be applicable for admin role
// person here is the current person of the logged in account
const initialState = {
  persons: [],
  person: {},
  pendingShopOwners: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERSONS:
      return {
        ...state,
        persons: action.payload,
      };

    case GET_PERSON:
      return {
        ...state,
        person: action.payload,
      };

    case GET_SHOPOWNERS:
      return {
        ...state,
        pendingShopOwners: action.payload,
      };

    default:
      return state;
  }
}
