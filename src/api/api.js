import articles from './types/articles';
import sections from './types/sections';
import users from './types/users';
import tests from './types/tests';

const api = {
  ...articles,
  ...sections,
  ...users,
  ...tests,
};

export default api;