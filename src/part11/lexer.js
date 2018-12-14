"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.program = text;
        this.idx = 0;
        this.curChar = this.program.length === 0 ? null : this.program[0];
    }
    Lexer.prototype.error = function () {
        throw Error("Invalid character");
    };
    Lexer.prototype.advance = function () {
        this.idx += 1;
        if (this.idx == this.program.length) {
            this.curChar = null;
        }
        else {
            this.curChar = this.program[this.idx];
        }
    };
    Lexer.prototype.peek = function () {
        if (this.idx + 1 == this.program.length) {
            return null;
        }
        else {
            return this.program[this.idx + 1];
        }
    };
    Lexer.prototype._id = function () {
        var acc = '';
        while (this.curChar !== null && /^[a-z0-9A-Z]$/.test(this.curChar)) {
            acc += this.curChar;
            this.advance();
        }
        // convert to uppercase before comparison with reserved keywords to support case-insensitivenss
        return acc.toLocaleUpperCase() in token_1.RESERVED_KEYWORDS ? token_1.RESERVED_KEYWORDS[acc.toUpperCase()] : new token_1.Token(token_1.ID, acc);
    };
    Lexer.prototype.number = function () {
        var acc = '';
        while (this.curChar !== null && /[0-9]/.test(this.curChar)) {
            acc += this.curChar;
            this.advance();
        }
        if (this.curChar === '.') {
            acc += this.curChar;
            this.advance();
            while (this.curChar !== null && /[0-9]/.test(this.curChar)) {
                acc += this.curChar;
                this.advance();
            }
            return new token_1.Token(token_1.REAL_CONST, parseFloat(acc));
        }
        return new token_1.Token(token_1.INTEGER_CONST, parseInt(acc));
    };
    Lexer.prototype.skipWhitespace = function () {
        while (this.curChar !== null && /^\s$/.test(this.curChar)) {
            this.advance();
        }
    };
    Lexer.prototype.skipComment = function () {
        while (this.curChar !== null && this.curChar !== '}') {
            this.advance();
        }
        this.advance();
    };
    Lexer.prototype.getNextToken = function () {
        while (this.curChar !== null) {
            switch (true) {
                case this.curChar === '{':
                    this.advance();
                    this.skipComment();
                    break;
                case /^\s$/.test(this.curChar):
                    this.skipWhitespace();
                    break;
                // in general an identifier can be named using digits as long as it is not leading
                case /^[a-zA-Z]$/.test(this.curChar):
                    // DIV keyword is handled here
                    return this._id();
                case /^[0-9]$/.test(this.curChar):
                    return this.number();
                case this.curChar === ':' && this.peek() === '=':
                    this.advance();
                    this.advance();
                    return new token_1.Token(token_1.ASSIGN, ':=');
                case this.curChar === ':':
                    this.advance();
                    return new token_1.Token(token_1.COLON, ':');
                case this.curChar === ',':
                    this.advance();
                    return new token_1.Token(token_1.COMMA, ',');
                case this.curChar === '.':
                    this.advance();
                    return new token_1.Token(token_1.DOT, '.');
                case this.curChar === '+':
                    this.advance();
                    return new token_1.Token(token_1.PLUS, '+');
                case this.curChar === '-':
                    this.advance();
                    return new token_1.Token(token_1.MINUS, '-');
                case this.curChar === '*':
                    this.advance();
                    return new token_1.Token(token_1.MULT, '*');
                case this.curChar === '/':
                    this.advance();
                    return new token_1.Token(token_1.FLOAT_DIV, '/');
                case this.curChar === '(':
                    this.advance();
                    return new token_1.Token(token_1.LEFTPR, '(');
                case this.curChar === ')':
                    this.advance();
                    return new token_1.Token(token_1.RIGHTPR, ')');
                case this.curChar === ';':
                    this.advance();
                    return new token_1.Token(token_1.SEMICOLON, ';');
                default:
                    this.error();
            }
        }
        return new token_1.Token(token_1.EOF, token_1.EOF);
    };
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map