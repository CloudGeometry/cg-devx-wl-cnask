const defaultSort = { createdAt: 'asc' };

export const orderArray = (obj) => {
  const res = [];
  if (!obj) {
    return [defaultSort];
  }
  const keys = Object.keys(obj || {});
  keys.forEach((key) => {
    const jsObj = { [key]: obj[key] };
    res.push(jsObj);
  });
  if (!keys.includes('createdAt')) {
    res.push(defaultSort);
  }
  return res;
};
