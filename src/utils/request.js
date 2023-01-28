import axios from "axios";

const request = {
    get: async (navigation, url, params, options) => {
        const res = await axios.get(
            url,
            { ...params },
            {...options}
        );
        if (res.data && res.data['code'] == 401) {
            // Redirect to login screen
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
            navigation.navigate("Login")
        } else {
            return res;
        }
    },
};

export default request;
