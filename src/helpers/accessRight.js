import { Cookies } from 'react-cookie';
// import _ from 'lodash';

const cookies = new Cookies();

const getRole = cookies.get('id_role') || null;

const checkAccess = () => {
  const role = getRole;
  if (role === 1 || role === '1') {
    return true;
  }
  if (role === 2 || role === '2') {
    return false;
  }
  return role;
};

export { getRole, checkAccess };
