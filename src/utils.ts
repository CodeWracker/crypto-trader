const getTaxValue = (taxVector): number => {
  return taxVector[0] / taxVector[1];
};
export default getTaxValue;
