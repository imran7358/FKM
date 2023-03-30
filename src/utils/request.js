import axios from "axios";
import { LOGGEDOUT } from "../redux/actionTypes";
import {store} from "../redux/store"

const request = {
    get: async (navigation, url, params, options) => {
       
        const res = await axios.get(
            url,
            { ...params },
            {...options}
        );
        if (res.data && res.data['code'] == 401) {
            // Redirect to login screen
            store.dispatch({
                type: LOGGEDOUT
            })
            navigation.navigate("Login")
        } else {
            return res;
        }
    },

    post: async (navigation, url, data, options) => {
        const res = await axios.post(
            url,
            {...data},
            {...options}
        );
        if (res.data && res.data['code'] == 401) {
            // Redirect to login screen
            navigation.navigate("Home")
        } else {
            return res;
        }
    },
};

export default request;
