"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTEGER = "INTEGER";
exports.PLUS = "PLUS";
exports.MINUS = "MINUS";
exports.EOF = "EOF";
var Token = /** @class */ (function () {
    function Token(tokenType, tokenValue) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=token.js.map