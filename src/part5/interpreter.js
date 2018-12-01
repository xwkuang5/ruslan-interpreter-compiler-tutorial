"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var Interpreter = /** @class */ (function () {
    function Interpreter(lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }
    Interpreter.prototype.error = function () {
        throw Error("Invalid syntax");
    };
    Interpreter.prototype.eat = function (tokenType) {
        if (this.curToken.tokenType == tokenType) {
            this.curToken = this.lexer.getNextToken();
        }
        else {
            this.error();
        }
    };
    Interpreter.prototype.term = function () {
        var token = this.curToken;
        this.eat(token_1.INTEGER);
        return token.tokenValue;
    };
    Interpreter.prototype.factor = function () {
        var result = this.term();
        while (this.curToken.tokenType == token_1.MULT || this.curToken.tokenType == token_1.DIV) {
            switch (this.curToken.tokenType) {
                case token_1.MULT:
                    this.eat(token_1.MULT);
                    result *= this.term();
                    break;
                case token_1.DIV:
                    this.eat(token_1.DIV);
                    result /= this.term();
                    break;
                default:
                    this.error();
            }
        }
        return result;
    };
    Interpreter.prototype.expr = function () {
        var result = this.factor();
        while (this.curToken.tokenType == token_1.PLUS || this.curToken.tokenType == token_1.MINUS) {
            switch (this.curToken.tokenType) {
                case token_1.PLUS:
                    this.eat(token_1.PLUS);
                    result += this.factor();
                    break;
                case token_1.MINUS:
                    this.eat(token_1.MINUS);
                    result -= this.factor();
                    break;
                default:
                    this.error();
            }
        }
        return result;
    };
    Interpreter.prototype.interpret = function () {
        return this.expr();
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map