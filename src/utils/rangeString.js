const rangeString = (min, max, ending = "") => {
  if (min === null) {
    return "-";
  }
  if (min === max) {
    return `${min} ${ending}`;
  }
  return `${min} - ${max} ${ending}`;
};
const ageString = (min) => {
  if (min === null) {
    return "-";
  }
  return `${min}+`;
};

export { rangeString, ageString };
