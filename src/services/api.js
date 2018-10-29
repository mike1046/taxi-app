/* eslint no-param-reassign: 0 */
// we have to mutate the api's request object
/* eslint dot-notation: 0 */
// picking the body paramerter's keys in brackets is a clearer style

import apisauce from "apisauce";
import { EASTERN as API_KEY, ENDPOINT } from "../api/keys";

const create = (baseURL = ENDPOINT) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 30000
  });

  api.addRequestTransform(request => {
    request.data["key"] = API_KEY;
    request.data["test"] = false;
    request.data["update_time"] = new Date();
    request.data["passenger_pos"] = request.data["passenger_pos"] || "0,0";
  });

  function send(data, axiosConfig) {
    return api.post("", data, axiosConfig);
  }

  function getProfile(email, password, lat, lng) {
    return send({
      method: "get_profile",
      passenger_pos: `${lat},${lng}`,
      email,
      password
    });
  }

  function getRewards(email, password) {
    return send({
      method: "get_rewards",
      email,
      password
    });
  }

  function applyCoupon(email, password, quote_id, code) {
    return send({
      method: "verify_reward",
      email,
      password,
      quote_id,
      code
    });
  }

  return {
    getProfile,
    getRewards,
    applyCoupon
  };
};

export default { create };
