import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { userEndpoint } from "./APIs";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    const payload = {
      user: newUser,
      roleCode: newUser.roleCode,
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await axios.post(`${userEndpoint}users/register`, jsonPayload, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      toast.success("Create User Successfully");
    } else {
      toast.error("Create User Fail");
    }
  } catch (err) {
    toast.error("Create User Fail");
  }
};

export const login = (LoginRequest, history) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await axios.post(`${userEndpoint}users/login`, LoginRequest);

    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);

    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    toast.error("Wrong credentials, please try again");
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("cart");
  localStorage.removeItem("jwtToken");

  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
