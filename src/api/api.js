
import config from "./config";

const getAuthHeaders = () => {
  const uuid = APP.constant('user').uuid;
  const subdomain = APP.constant('account').subdomain;
  return {
    'Authorization': `Bearer ${uuid}`,
    'Suburl': subdomain,
    'Content-Type': 'application/json'
  };
};

const api = {

  getSections: async () => {

    try {
      const response = await fetch(config.url + 'sections', {
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
      const response = await fetch(config.url + 'sections', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSection)
      });

      if (!response.ok) {
        throw new Error('Failed to create section');
      }

      const result = await response.json();
      return result;
    }
    catch (error) {
      console.error('Error create section:', error);
    }
  },

  getArticles: async (sectionId) => {

    try {
      const response = await fetch(config.url + `articles?section=${sectionId}`, {
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

  getArticle: async (articleId) => {

    try {
      const response = await fetch(config.url + `articles/${articleId}`, {
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

  createArticle: async (newArticle) => {

    try {
      const response = await fetch(config.url + 'articles', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newArticle)
      });

      if (!response.ok) {
        throw new Error('Failed to create section');
      }

      const result = await response.json();
      return result;
    }
    catch (error) {
      console.error('Error create section:', error);
    }
  },

  getUser: async () => {

    const amo_id = APP.constant('user').id;

    try {
      const response = await fetch(config.url + `users/${amo_id}`, {
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

  getUsers: async () => {

    try {
      const response = await fetch(config.url + `users`, {
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

  
};

export default api;

