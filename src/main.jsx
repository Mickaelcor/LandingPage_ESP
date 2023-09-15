import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import TagManager from "react-gtm-module";

var vertical = "ESP_B2B_RTK";
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
var hipto_uid = create_UUID();

// Google Tag Manager
const tagManagerArgs = {
  gtmId: "GTM-PPXQ58Z",
  site: document.location.origin + document.location.pathname,
  vertical: vertical,
  type_page: "lp",
  channel: "hiptoform",
  sector: "b2b",
  hipto_uid: hipto_uid,
};
TagManager.initialize(tagManagerArgs);

// Import the ModalProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
