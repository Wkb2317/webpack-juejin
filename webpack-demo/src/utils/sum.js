const sum = (...args) => {
  return args.reduce((pre, current) => {
    return pre + current;
  }, 0);
};

const dec = () => {
  console.log("1");
};

export { sum, dec };
