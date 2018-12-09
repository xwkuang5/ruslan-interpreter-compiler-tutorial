"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var ast_1 = require("./ast");
var token_2 = require("../part8/token");
var Parser = /** @class */ (function () {
    function Parser(lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }
    Parser.prototype.program = function () {
        // program: compound_statement DOT
        var node = this.compound_statement();
        this.eat(token_1.DOT);
        return node;
    };
    Parser.prototype.compound_statement = function () {
        // compound_statement: BEGIN statement_list END
        this.eat(token_1.BEGIN);
        var nodes = this.statement_list();
        this.eat(token_1.END);
        var root = new ast_1.Compound();
        nodes.forEach(function (node) {
            root.children.push(node);
        });
        return root;
    };
    Parser.prototype.statement_list = function () {
        // statement_list: statement | statement SEMICOLON statement_list
        var returnValues = new Array();
        returnValues.push(this.statement());
        while (this.curToken.tokenType === token_1.SEMICOLON) {
            this.eat(token_1.SEMICOLON);
            returnValues = returnValues.concat(this.statement_list());
        }
        return returnValues;
    };
    Parser.prototype.statement = function () {
        /*
         *  statement: compound_statement | assignment_statement | empty
         */
        switch (this.curToken.tokenType) {
            case token_1.BEGIN:
                return this.compound_statement();
            case token_1.ID:
                return this.assignment_statement();
            default:
                return this.empty();
        }
    };
    Parser.prototype.assignment_statement = function () {
        // assignment_statement: variable ASSIGN expr
        var left = this.variable();
        var token = this.curToken;
        this.eat(token_1.ASSIGN);
        var right = this.expr();
        return new ast_1.Assign(left, token, right);
    };
    Parser.prototype.variable = function () {
        var variableNode = new ast_1.Var(this.curToken);
        this.eat(token_1.ID);
        return variableNode;
    };
    Parser.prototype.empty = function () {
        return new ast_1.NoOp();
    };
    Parser.prototype.error = function () {
        throw "Invalid syntax";
    };
    Parser.prototype.eat = function (tokenType) {
        if (this.curToken.tokenType === tokenType) {
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
        /*
         *
         * factor :   PLUS  factor
                    | MINUS factor
                    | INTEGER
                    | LPAREN expr RPAREN
                    | variable
         */
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
        else if (this.curToken.tokenType == token_1.PLUS || this.curToken.tokenType == token_1.MINUS) {
            var token = this.curToken;
            switch (this.curToken.tokenType) {
                case token_1.PLUS:
                    this.eat(token_1.PLUS);
                    break;
                case token_1.MINUS:
                    this.eat(token_1.MINUS);
                    break;
            }
            return new ast_1.UnaryOp(token, this.factor());
        }
        else {
            return this.variable();
        }
    };
    Parser.prototype.parse = function () {
        var node = this.program();
        if (this.curToken.tokenType !== token_2.EOF) {
            this.error();
        }
        return node;
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map