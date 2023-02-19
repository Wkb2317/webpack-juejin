import "./static/css/index.css";
import "./static/css/box2.less";
import "./static/css/style.scss";
import "./static/font/iconfont";

const sum = (...args) => {
  return args.reduce((pre, current) => {
    return pre + current;
  }, 0);
};

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

sum(1, 2, 3);

console.log("hello webpack");
