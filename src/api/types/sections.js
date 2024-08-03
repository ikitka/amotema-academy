import config from "../config";
import { getAuthHeaders } from "./auth";

const sections = {

  getSections: async () => {
    try {
      const response = await fetch(`${config.url}sections`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get sections: ', error);
      return [];
    }
  },

  createSection: async (newSection) => {
    try {
      const response = await fetch(`${config.url}sections`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSection)
      });

      if (!response.ok) {
        throw new Error('Failed to create section');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error create section:', error);
    }
  },
};

export default sections;
