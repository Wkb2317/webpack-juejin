import "./static/css/index.css";
import "./static/css/box2.less";
import "./static/css/style.scss";
import "./static/font/iconfont";

import { sum } from "./utils/sum.js";
console.log(sum(1, 2, 3));

// if (module.hot) {
//   module.hot.accept("./utils/sum.js");
// }

new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  import(/* webpackChunkName:"count" */ "./utils/count").then((fn) => {
    console.log(fn.default());
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
