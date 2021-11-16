import axios from "axios";
import { toast } from "react-toastify";
import { GET_ERRORS, GET_PERSONS, GET_PERSON, GET_SHOPOWNERS } from "./types";
import { userEndpoint } from "./APIs";

export const createPerson = (person, history) => async (dispatch) => {
  try {
    await axios.post(`${userEndpoint}person`, person);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
export const getPersons = () => async (dispatch) => {
  const res = await axios.get("/api/person/all");
  dispatch({
    type: GET_PERSONS,
    payload: res.data,
  });
};

export const getPerson = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${userEndpoint}users/id=${id}`);
    dispatch({
      type: GET_PERSON,
      payload: res.data,
    });
  } catch (error) {}
};

export const getPendingShopOwners = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://13.237.200.50:8080/api/users/pending_shop_owners`
    );

    console.log(res.data);
    dispatch({
      type: GET_SHOPOWNERS,
      payload: res.data,
    });
  } catch (error) {}
};

export const approveShopOwner = (userid) => async (dispatch) => {
  try {
    const res1 = await axios.put(
      `http://13.237.200.50:8080/api/users/approve/${userid}`
    );
    console.log(res1);
    if (res1.status === 200) {
      toast.success("Approve shop owner successfully");
      const res = await axios.get(
        `http://13.237.200.50:8080/api/users/pending_shop_owners`
      );
      dispatch({
        type: GET_SHOPOWNERS,
        payload: res.data,
      });
    } else {
      toast.warn("Cannot approve shopowner");
    }
  } catch (error) {}
};

export const rejectShopOwner = (username) => async (dispatch) => {
  try {
    const { status } = await axios.get(`api/users/reject/${username}`);
    // Get a list of pending shopowner waiting for approval
    if (status === 200) {
      toast.success("Reject shop owner");
      const res = await axios.get(
        `http://13.237.200.50:8080/api/users/pending_shop_owners`
      );
      dispatch({
        type: GET_SHOPOWNERS,
        payload: res.data,
      });
    } else {
      toast.warn("Cannot reject shopowner");
    }
  } catch (error) {}
};
