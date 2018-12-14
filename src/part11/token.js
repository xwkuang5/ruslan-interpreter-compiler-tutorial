"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// token
exports.PLUS = "PLUS";
exports.MINUS = "MINUS";
exports.MULT = "MULTIPLY";
exports.INTEGER_DIV = "INTEGER_DIV";
exports.FLOAT_DIV = "FLOAT_DIV";
exports.EOF = "EOF";
exports.LEFTPR = "LEFT_PARENTHESIS";
exports.RIGHTPR = "RIGHT_PARENTHESIS";
exports.REAL_CONST = "REAL_CONST";
exports.INTEGER_CONST = "INTEGER_CONST";
exports.DOT = "DOT";
exports.ASSIGN = "ASSIGN";
exports.SEMICOLON = "SEMICOLON";
exports.COLON = "COLON";
exports.COMMA = "COMMA";
exports.ID = "ID";
// reserved keywords
exports.PROGRAM = "PROGRAM";
exports.BEGIN = "BEGIN";
exports.END = "END";
exports.INTEGER = "INTEGER"; // integer type
exports.REAL = "REAL"; // real type
exports.DIV = "DIV"; // integer division
exports.VAR = "VAR";
var Token = /** @class */ (function () {
    function Token(tokenType, tokenValue) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }
    return Token;
}());
exports.Token = Token;
exports.RESERVED_KEYWORDS = {
    PROGRAM: new Token(exports.PROGRAM, exports.PROGRAM),
    BEGIN: new Token(exports.BEGIN, exports.BEGIN),
    END: new Token(exports.END, exports.END),
    DIV: new Token(exports.INTEGER_DIV, exports.DIV),
    INTEGER: new Token(exports.INTEGER, exports.INTEGER),
    REAL: new Token(exports.REAL, exports.REAL),
    VAR: new Token(exports.VAR, exports.VAR),
};
//# sourceMappingURL=token.js.map