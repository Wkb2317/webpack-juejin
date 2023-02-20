import "./static/css/index.css";
import "./static/css/box2.less";
import "./static/css/style.scss";
import "./static/font/iconfont";

import { sum } from "./utils/sum";
console.log(sum(1, 2, 3));

if (module.hot) {
  module.hot.accept("./utils/sum.js");
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
