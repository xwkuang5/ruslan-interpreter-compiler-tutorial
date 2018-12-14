"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var ast_1 = require("./ast");
var token_2 = require("./token");
var utils_1 = require("./utils");
var Parser = /** @class */ (function () {
    function Parser(lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }
    Parser.prototype.program = function () {
        // program : PROGRAM variable SEMI block DOT
        this.eat(token_1.PROGRAM);
        var varNode = this.variable();
        var programName = varNode.value;
        this.eat(token_1.SEMICOLON);
        var blockNode = this.block();
        this.eat(token_1.DOT);
        return new ast_1.Program(programName, blockNode);
    };
    Parser.prototype.block = function () {
        // block : declarations compoundStatement
        var decl = this.declarations();
        var compoundStatement = this.compoundStatement();
        return new ast_1.Block(decl, compoundStatement);
    };
    Parser.prototype.declarations = function () {
        // declarations : VAR (variable_declaration SEMI)+
        //              | (PROCEDURE ID(LPAREN formal_parameter_list RPAREN)? SEMI block SEMI)*
        //              | empty
        var declarationsList = [];
        while (true) {
            if (this.curToken.tokenType === token_1.VAR) {
                this.eat(token_1.VAR);
                while (this.curToken.tokenType === token_1.ID) {
                    var varDecl = this.variableDeclaration();
                    utils_1.arrayExtension(declarationsList, varDecl);
                    this.eat(token_1.SEMICOLON);
                }
            }
            else if (this.curToken.tokenType === token_1.PROCEDURE) {
                this.eat(token_1.PROCEDURE);
                var procedureName = this.curToken.tokenValue;
                this.eat(token_1.ID);
                var paramList = [];
                if (this.curToken.tokenType === token_1.LEFTPR) {
                    this.eat(token_1.LEFTPR);
                    paramList = this.formalParameterList();
                    this.eat(token_1.RIGHTPR);
                }
                this.eat(token_1.SEMICOLON);
                var procedureDeclarationNode = new ast_1.ProcedureDecl(procedureName, this.block(), paramList);
                declarationsList.push(procedureDeclarationNode);
                this.eat(token_1.SEMICOLON);
            }
            else {
                break;
            }
        }
        return declarationsList;
    };
    Parser.prototype.formalParameterList = function () {
        /*
         * formal_parameter_list : formal_parameters
                                 | formal_parameters SEMI formal_parameter_list
         */
        var params = this.formalParameters();
        while (this.curToken.tokenType === token_1.SEMICOLON) {
            this.eat(token_1.SEMICOLON);
            utils_1.arrayExtension(params, this.formalParameters());
        }
        return params;
    };
    Parser.prototype.formalParameters = function () {
        // formal_parameters : ID (COMMA ID)* COLON type_spec | empty
        if (this.curToken.tokenType !== token_1.ID) {
            return [];
        }
        var tokenList = [this.curToken];
        this.eat(token_1.ID);
        while (this.curToken.tokenType === token_1.COMMA) {
            this.eat(token_1.COMMA);
            tokenList.push(this.curToken);
            this.eat(token_1.ID);
        }
        this.eat(token_1.COLON);
        var typeNode = this.typeSpecification();
        return tokenList.map(function (token) { return new ast_1.Param(new ast_1.Var(token), typeNode); });
    };
    Parser.prototype.typeSpecification = function () {
        if (this.curToken.tokenType === token_2.INTEGER) {
            this.eat(token_2.INTEGER);
            return new ast_1.Type(token_2.RESERVED_KEYWORDS[token_2.INTEGER]);
        }
        else if (this.curToken.tokenType === token_2.REAL) {
            this.eat(token_2.REAL);
            new ast_1.Type(token_2.RESERVED_KEYWORDS[token_2.REAL]);
        }
        else {
            this.error();
        }
    };
    Parser.prototype.variableDeclaration = function () {
        var variableNodes = [new ast_1.Var(this.curToken)];
        this.eat(token_1.ID);
        while (this.curToken.tokenType === token_1.COMMA) {
            this.eat(token_1.COMMA);
            variableNodes = variableNodes.concat([new ast_1.Var(this.curToken)]);
            this.eat(token_1.ID);
        }
        this.eat(token_1.COLON);
        var typeNode = this.typeSpec();
        return variableNodes.map(function (node) { return new ast_1.VarDeclaration(node, typeNode); });
    };
    Parser.prototype.typeSpec = function () {
        var token = this.curToken;
        switch (token.tokenType) {
            case token_2.INTEGER:
                this.eat(token_2.INTEGER);
                break;
            case token_2.REAL:
                this.eat(token_2.REAL);
                break;
        }
        return new ast_1.Type(token);
    };
    Parser.prototype.compoundStatement = function () {
        // compoundStatement: BEGIN statementList END
        this.eat(token_1.BEGIN);
        var nodes = this.statementList();
        this.eat(token_1.END);
        var root = new ast_1.Compound();
        nodes.forEach(function (node) {
            root.children.push(node);
        });
        return root;
    };
    Parser.prototype.statementList = function () {
        // statementList: statement | statement SEMICOLON statementList
        var returnValues = new Array();
        returnValues.push(this.statement());
        while (this.curToken.tokenType === token_1.SEMICOLON) {
            this.eat(token_1.SEMICOLON);
            returnValues = returnValues.concat(this.statementList());
        }
        return returnValues;
    };
    Parser.prototype.statement = function () {
        /*
         *  statement: compoundStatement | assignmentStatement | empty
         */
        switch (this.curToken.tokenType) {
            case token_1.BEGIN:
                return this.compoundStatement();
            case token_1.ID:
                return this.assignmentStatement();
            default:
                return this.empty();
        }
    };
    Parser.prototype.assignmentStatement = function () {
        // assignmentStatement: variable ASSIGN expr
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
        while (this.curToken.tokenType === token_1.MULT || this.curToken.tokenType === token_1.FLOAT_DIV || this.curToken.tokenType === token_1.INTEGER_DIV) {
            var token = this.curToken;
            switch (this.curToken.tokenType) {
                case token_1.MULT:
                    this.eat(token_1.MULT);
                    break;
                case token_1.FLOAT_DIV:
                    this.eat(token_1.FLOAT_DIV);
                    break;
                case token_1.INTEGER_DIV:
                    this.eat(token_1.INTEGER_DIV);
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
                    | INTEGER_CONST
                    | REAL_CONST
                    | LPAREN expr RPAREN
                    | variable
         */
        if (this.curToken.tokenType === token_1.INTEGER_CONST) {
            var token = this.curToken;
            this.eat(token_1.INTEGER_CONST);
            return new ast_1.Num(token);
        }
        else if (this.curToken.tokenType === token_1.REAL_CONST) {
            var token = this.curToken;
            this.eat(token_1.REAL_CONST);
            return new ast_1.Num(token);
        }
        else if (this.curToken.tokenType === token_1.LEFTPR) {
            this.eat(token_1.LEFTPR);
            var node = this.expr();
            this.eat(token_1.RIGHTPR);
            return node;
        }
        else if (this.curToken.tokenType === token_1.PLUS || this.curToken.tokenType === token_1.MINUS) {
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
        if (this.curToken.tokenType !== token_1.EOF) {
            this.error();
        }
        return node;
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map