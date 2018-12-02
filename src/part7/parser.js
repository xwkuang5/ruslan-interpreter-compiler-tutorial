"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var ast_1 = require("./ast");
var Parser = /** @class */ (function () {
    function Parser(lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }
    Parser.prototype.error = function () {
        throw "Invalid syntax";
    };
    Parser.prototype.eat = function (tokenType) {
        if (this.curToken.tokenType == tokenType) {
            this.curToken = this.lexer.getNextToken();
        }
        else {
            this.error();
        }
    };
    Parser.prototype.expr = function () {
        // Assume left associativity
        var node = this.term();
        while (this.curToken.tokenType == token_1.PLUS || this.curToken.tokenType == token_1.MINUS) {
            var token = this.curToken;
            switch (this.curToken.tokenType) {
                case token_1.PLUS:
                    this.eat(token_1.PLUS);
                    break;
                case token_1.MINUS:
                    this.eat(token_1.MINUS);
                    break;
            }
            node = new ast_1.BinOp(node, token, this.term());
        }
        return node;
    };
    Parser.prototype.term = function () {
        var node = this.factor();
        while (this.curToken.tokenType == token_1.MULT || this.curToken.tokenType == token_1.DIV) {
            var token = this.curToken;
            switch (this.curToken.tokenType) {
                case token_1.MULT:
                    this.eat(token_1.MULT);
                    break;
                case token_1.DIV:
                    this.eat(token_1.DIV);
                    break;
            }
            node = new ast_1.BinOp(node, token, this.factor());
        }
        return node;
    };
    Parser.prototype.factor = function () {
        if (this.curToken.tokenType == token_1.INTEGER) {
            var token = this.curToken;
            this.eat(token_1.INTEGER);
            return new ast_1.Num(token);
        }
        else if (this.curToken.tokenType == token_1.LEFTPR) {
            this.eat(token_1.LEFTPR);
            var node = this.expr();
            this.eat(token_1.RIGHTPR);
            return node;
        }
    };
    Parser.prototype.parse = function () {
        return this.expr();
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map