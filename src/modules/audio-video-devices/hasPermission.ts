export const hasPermission = (permission: number): boolean => {
  return permission === 0 || permission === 1 || permission === 4;
};
