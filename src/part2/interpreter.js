"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var Interpreter = /** @class */ (function () {
    function Interpreter(program) {
        this.lexer = new lexer_1.Lexer(program);
    }
    return Interpreter;
}());
//# sourceMappingURL=interpreter.js.map