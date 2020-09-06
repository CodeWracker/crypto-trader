const getTaxValue = (taxVector): number => {
  return taxVector[0] / taxVector[1];
};
const paramsURL = (params: object): string => {
  let path: string;
  for (let item in params) {
    !path
      ? (path = process.env.BASE_PATH_TAPI + "?" + item.valueOf() + "=" + item)
      : (path = path + "&" + item.valueOf() + "=" + item);
  }
  return path;
};
export default { getTaxValue, paramsURL };
