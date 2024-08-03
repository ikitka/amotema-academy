import config from "../config";
import { getAuthHeaders } from "./auth";

const users = {

  getUser: async () => {
    const amo_id = APP.constant('user').id;

    try {
      const response = await fetch(`${config.url}users/${amo_id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get user: ', error);
      return [];
    }
  },

  getUsers: async () => {
    try {
      const response = await fetch(`${config.url}users`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get users: ', error);
      return [];
    }
  },
};

export default users;
