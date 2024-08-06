import config from "../config";
import { getAuthHeaders } from "./auth";

const articles = {

  getArticles: async (sectionId) => {
    try {
      const response = await fetch(`${config.url}articles?section=${sectionId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get articles: ', error);
      return [];
    }
  },

  getArticle: async (articleId) => {
    try {
      const response = await fetch(`${config.url}articles/${articleId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get article: ', error);
      return [];
    }
  },

  createArticle: async (newArticle) => {
    try {
      const response = await fetch(`${config.url}articles`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newArticle)
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error create article:', error);
    }
  },

  saveArticle: async (resaveArticle) => {
    try {
      const response = await fetch(`${config.url}articles/${resaveArticle.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(resaveArticle)
      });

      if (!response.ok) {
        throw new Error('Failed to save article');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error save article:', error);
    }
  },

  deleteArticle: async (articleId) => {
    try {
      const response = await fetch(`${config.url}articles/${articleId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error delete article: ', error);
      return [];
    }
  },
};

export default articles;
