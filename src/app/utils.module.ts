import get from 'lodash/get';

export function checkAdminRole(router_) {
  return roles => {
    if (get(roles, '[0].role') === 'admin') {
      return true;
    } else {
      router_.navigate(['/wycieczki']);
      return false;
    }
  };
}

export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
