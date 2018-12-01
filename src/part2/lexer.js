"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.program = text;
        this.idx = 0;
    }
    Lexer.prototype.getNextToken = function () {
        while (this.idx < this.program.length && (this.program[this.idx] == ' ')) {
            this.idx += 1;
            continue;
        }
        if (this.idx >= this.program.length) {
            return new token_1.Token(token_1.EOF, null);
        }
        var acc = '';
        while (this.idx < this.program.length && (!isNaN(parseInt(this.program[this.idx])))) {
            acc += this.program[this.idx];
            this.idx += 1;
        }
        if (acc != '') {
            return new token_1.Token(token_1.INTEGER, Number(acc));
        }
        else {
            if (this.program[this.idx] == '+') {
                this.idx += 1;
                return new token_1.Token(token_1.PLUS, '+');
            }
            else if (this.program[this.idx] == '-') {
                this.idx += 1;
                return new token_1.Token(token_1.MINUS, '-');
            }
        }
        throw Error("Error in getNextToken");
    };
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map