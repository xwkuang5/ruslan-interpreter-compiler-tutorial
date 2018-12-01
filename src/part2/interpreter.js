"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var token_1 = require("./token");
var Interpreter = /** @class */ (function () {
    function Interpreter(program) {
        this.curToken = null;
        this.lexer = new lexer_1.Lexer(program);
    }
    Interpreter.prototype.setProgramToInterpret = function (program) {
        this.constructor(program);
    };
    Interpreter.prototype.eat = function (tokenType) {
        if (this.curToken.tokenType == tokenType) {
            this.curToken = this.lexer.getNextToken();
        }
        else {
            throw Error("Invalid syntax");
        }
    };
    Interpreter.prototype.term = function () {
        var token = this.curToken;
        this.eat(token_1.INTEGER);
        return token.tokenValue;
    };
    Interpreter.prototype.interpret = function () {
        this.curToken = this.lexer.getNextToken();
        var result = this.term();
        while (this.curToken.tokenType == token_1.PLUS || this.curToken.tokenType == token_1.MINUS) {
            if (this.curToken.tokenType == token_1.PLUS) {
                this.eat(token_1.PLUS);
                result += this.term();
            }
            else if (this.curToken.tokenType == token_1.MINUS) {
                this.eat(token_1.MINUS);
                result -= this.term();
            }
        }
        this.eat(token_1.EOF);
        return result;
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map