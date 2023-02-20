const sum = (...args) => {
  return args.reduce((pre, current) => {
    return pre + current;
  }, 0);
};

export { sum };
