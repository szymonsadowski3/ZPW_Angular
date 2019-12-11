export function checkAdminRole(router_) {
  return roles => {
    if ((roles.length > 0) && roles[0].role === 'admin') {
      return true;
    } else {
      router_.navigate(['/wycieczki']);
      return false;
    }
  };
}
