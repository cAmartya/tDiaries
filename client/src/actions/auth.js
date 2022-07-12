import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signup = (cred, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(cred);  
      dispatch({ type: AUTH, payload: data });
      navigate("/", {replace: true});

    } catch (error) {
      console.log(error);
    }
};

export const signin = (cred, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signIn(cred);
  
      dispatch({ type: AUTH, payload: data });
      navigate("/", {replace: true});
    } catch (error) {
      console.log(error);
    }
};