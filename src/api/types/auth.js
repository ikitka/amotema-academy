const getAuthHeaders = () => {
  const uuid = APP.constant('user').uuid;
  const subdomain = APP.constant('account').subdomain;
  return {
    'Authorization': `Bearer ${uuid}`,
    'Suburl': subdomain,
    'Content-Type': 'application/json'
  };
};

export { getAuthHeaders };
