"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = require("./config/database");
(0, database_1.connect)();
var app = (0, express_1.default)();
var port = "".concat(process.env.PORT) || 3000;
// parse application/json
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
var index_route_1 = __importDefault(require("./api/v1/routes/index.route"));
(0, index_route_1.default)(app);
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
