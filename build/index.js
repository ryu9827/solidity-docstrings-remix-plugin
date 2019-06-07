"use strict";
"use babel";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 8000;
app.use(_express.default.static("./src/public"));
app.listen(port, () => console.log("Example app listening on port ".concat(port)));