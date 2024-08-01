
import config from "./config";

const api = {

  getSections: async () => {

    const uuid = APP.constant('user').uuid;
    const subdomain = APP.constant('account').subdomain;

    try {
      const response = await fetch(config.url + 'sections', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get sections: ', error);
      return [];
    }
  },

  createSection: async (newSection) => {

    const uuid = APP.constant('user').uuid;
    const subdomain = APP.constant('account').subdomain;

    console.log(newSection);
    
    try {
      const response = await fetch(config.url + 'sections', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        },
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

    const uuid = APP.constant('user').uuid;
    const subdomain = APP.constant('account').subdomain;

    try {
      const response = await fetch(config.url + `articles?section=${sectionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get sections: ', error);
      return [];
    }
  },

  getArticle: async (articleId) => {

    const uuid = APP.constant('user').uuid;
    const subdomain = APP.constant('account').subdomain;

    try {
      const response = await fetch(config.url + `articles/${articleId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get sections: ', error);
      return [];
    }
  },

  createArticle: async (newArticle) => {

    const uuid = APP.constant('user').uuid;
    const subdomain = APP.constant('account').subdomain;

    console.log(newArticle);
    
    try {
      const response = await fetch(config.url + 'articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        },
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

    const uuid = APP.constant('user').uuid;
    const amo_id = APP.constant('user').id;
    const subdomain = APP.constant('account').subdomain;

    try {
      const response = await fetch(config.url + `users/${amo_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get sections: ', error);
      return [];
    }
  },

  getUsers: async () => {

    const uuid = APP.constant('user').uuid;
    const subdomain = APP.constant('account').subdomain;

    try {
      const response = await fetch(config.url + `users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${uuid}`,
          'Suburl': `${subdomain}`,
          'Content-Type': 'application/json'
        }
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

