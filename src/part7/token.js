"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTEGER = "INTEGER";
exports.PLUS = "PLUS";
exports.MINUS = "MINUS";
exports.MULT = "MULTIPLY";
exports.DIV = "DIVIDE";
exports.EOF = "EOF";
exports.LEFTPR = "LEFT_PARENTHESIS";
exports.RIGHTPR = "RIGHT_PARENTHESIS";
var Token = /** @class */ (function () {
    function Token(tokenType, tokenValue) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=token.js.map