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
var _ = require("lodash");
var token_1 = require("./token");
var NodeVisitor = /** @class */ (function () {
    function NodeVisitor() {
    }
    /*
     *  By using the Visitor patten, we can decouple data structure from application consumer
     *  Interpreter is a consumer (visitor) of the AST data structure
     *  We can easily define other consumer (e.g., a program for analyzing syntax)
     */
    NodeVisitor.prototype.visit = function (node) {
        var visitor = _.get(this, "visit" + node.constructor["name"], this.defaultVisitMethod);
        return visitor.call(this, node);
    };
    NodeVisitor.prototype.defaultVisitMethod = function (node) {
        throw Error("Node visit method (visit" + node.constructor["name"] + ") not implemented!");
    };
    return NodeVisitor;
}());
var Interpreter = /** @class */ (function (_super) {
    __extends(Interpreter, _super);
    function Interpreter(parser) {
        var _this = _super.call(this) || this;
        _this.parser = parser;
        _this.symbolTable = {};
        return _this;
    }
    Interpreter.prototype.visitCompound = function (node) {
        var _this = this;
        node.children.forEach(function (child) {
            _this.visit(child);
        });
    };
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
            case token_1.DIV:
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
}(NodeVisitor));
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map