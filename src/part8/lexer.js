"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.program = text;
        this.idx = 0;
    }
    Lexer.prototype.error = function () {
        throw Error("Invalid character");
    };
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
            var token = void 0;
            switch (this.program[this.idx]) {
                case '+':
                    token = new token_1.Token(token_1.PLUS, '+');
                    break;
                case '-':
                    token = new token_1.Token(token_1.MINUS, '-');
                    break;
                case '*':
                    token = new token_1.Token(token_1.MULT, '*');
                    break;
                case '/':
                    token = new token_1.Token(token_1.DIV, '/');
                    break;
                case '(':
                    token = new token_1.Token(token_1.LEFTPR, '(');
                    break;
                case ')':
                    token = new token_1.Token(token_1.RIGHTPR, ')');
                    break;
                default:
                    this.error();
            }
            this.idx += 1;
            return token;
        }
    };
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map