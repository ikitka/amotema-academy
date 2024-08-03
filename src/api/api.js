import articles from './types/articles';
import sections from './types/sections';
import users from './types/users';

const api = {
  ...articles,
  ...sections,
  ...users,
};

export default api;