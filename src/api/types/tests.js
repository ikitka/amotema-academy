import config from "../config";
import { getAuthHeaders } from "./auth";

const tests = {

  getTest: async (articleId) => {
    try {
      const response = await fetch(`${config.url}articles/${articleId}/test`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error("Тест не найден");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get articles: ', error);
      return null;
    }

  },

  handleCreateOrUpdateTest: async (test, articleId, newTest) => {
    try {
      const url = `${config.url}articles/${articleId}/test`;
      const method = test ? "PATCH" : "POST";
  
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(newTest)
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при сохранении теста");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при сохранении теста:", error);
      return null;
    }
  },

  handleDeleteTest : async (articleId) => {
    try {
      const response = await fetch(`${config.url}articles/${articleId}/test`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error("Тест не найден");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get articles: ', error);
      return null;
    }
  },

};

export default tests;
