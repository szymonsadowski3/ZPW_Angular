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
