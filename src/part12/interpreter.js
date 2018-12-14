"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var nodeVisitor_1 = require("./nodeVisitor");
var Interpreter = /** @class */ (function (_super) {
    __extends(Interpreter, _super);
    function Interpreter(parser) {
        var _this = _super.call(this) || this;
        _this.parser = parser;
        _this.symbolTable = {};
        return _this;
    }
    Interpreter.prototype.visitProgram = function (node) {
        this.visit(node.block);
    };
    Interpreter.prototype.visitProcedureDecl = function (node) { };
    Interpreter.prototype.visitBlock = function (node) {
        var _this = this;
        node.declarations.map(function (decl) {
            _this.visit(decl);
        });
        this.visit(node.compoundStatement);
    };
    Interpreter.prototype.visitCompound = function (node) {
        var _this = this;
        node.children.forEach(function (child) {
            _this.visit(child);
        });
    };
    Interpreter.prototype.visitVarDeclaration = function (node) { };
    Interpreter.prototype.visitType = function (node) { };
    Interpreter.prototype.visitNoOp = function (node) { };
    Interpreter.prototype.visitAssign = function (node) {
        var variableName = node.left.value;
        this.symbolTable[variableName] = this.visit(node.right);
    };
    Interpreter.prototype.visitVar = function (node) {
        var variableName = node.value;
        if (!(variableName in this.symbolTable)) {
            throw new Error("Unrecognized identifier " + variableName);
        }
        return this.symbolTable[variableName];
    };
    Interpreter.prototype.visitBinOp = function (node) {
        var leftValue = this.visit(node.left);
        var rightValue = this.visit(node.right);
        switch (node.token.tokenType) {
            case token_1.PLUS:
                return leftValue + rightValue;
            case token_1.MINUS:
                return leftValue - rightValue;
            case token_1.MULT:
                return leftValue * rightValue;
            case token_1.INTEGER_DIV:
                return Math.floor(leftValue / rightValue);
            case token_1.FLOAT_DIV:
                return leftValue / rightValue;
        }
    };
    Interpreter.prototype.visitUnaryOp = function (node) {
        var value = this.visit(node.expr);
        switch (node.token.tokenType) {
            case token_1.PLUS:
                return value;
            case token_1.MINUS:
                return -1 * value;
        }
    };
    Interpreter.prototype.visitNum = function (node) {
        return node.value;
    };
    Interpreter.prototype.interpret = function () {
        var root = this.parser.parse();
        return this.visit(root);
    };
    return Interpreter;
}(nodeVisitor_1.NodeVisitor));
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map