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
exports.BEGIN = "BEGIN";
exports.END = "END";
exports.DOT = "DOT";
exports.ASSIGN = "ASSIGN";
exports.SEMICOLON = "SEMICOLON";
exports.ID = "ID";
var Token = /** @class */ (function () {
    function Token(tokenType, tokenValue) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }
    return Token;
}());
exports.Token = Token;
exports.RESERVED_KEYWORDS = {
    BEGIN: new Token(exports.BEGIN, exports.BEGIN),
    END: new Token(exports.END, exports.END),
};
//# sourceMappingURL=token.js.map