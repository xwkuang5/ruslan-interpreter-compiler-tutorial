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
var nodeVisitor_1 = require("./nodeVisitor");
var symbol_1 = require("./symbol");
var SymbolTableBuilder = /** @class */ (function (_super) {
    __extends(SymbolTableBuilder, _super);
    function SymbolTableBuilder() {
        var _this = _super.call(this) || this;
        _this.symbolTable = new symbol_1.SymbolTable();
        return _this;
    }
    SymbolTableBuilder.prototype.visitProgram = function (node) {
        this.visit(node.block);
    };
    SymbolTableBuilder.prototype.visitProcedureDecl = function (node) { };
    SymbolTableBuilder.prototype.visitBlock = function (node) {
        var _this = this;
        node.declarations.forEach(function (declNode) { return _this.visit(declNode); });
        this.visit(node.compoundStatement);
    };
    SymbolTableBuilder.prototype.visitBinOp = function (node) {
        this.visit(node.left);
        this.visit(node.right);
    };
    SymbolTableBuilder.prototype.visitNum = function (node) { };
    SymbolTableBuilder.prototype.visitUnaryOp = function (node) {
        this.visit(node.expr);
    };
    SymbolTableBuilder.prototype.visitCompound = function (node) {
        var _this = this;
        node.children.forEach(function (child) { return _this.visit(child); });
    };
    SymbolTableBuilder.prototype.visitNoOp = function (node) { };
    SymbolTableBuilder.prototype.visitVarDeclaration = function (node) {
        var typeName = node.typeNode.value;
        var typeSymbol = this.symbolTable.lookup(typeName);
        var varName = node.varNode.value;
        this.symbolTable.define(new symbol_1.VarSymbol(varName, typeSymbol));
    };
    SymbolTableBuilder.prototype.visitAssign = function (node) {
        // TODO: type checking
        var varName = node.left.value;
        if (this.symbolTable.lookup(varName) === null) {
            throw Error("Assigning to non-existent variable: " + varName);
        }
        this.visit(node.right);
    };
    SymbolTableBuilder.prototype.visitVar = function (node) {
        var varName = node.value;
        if (this.symbolTable.lookup(varName) === null) {
            throw Error("Referencing non-existent variable: " + varName);
        }
    };
    return SymbolTableBuilder;
}(nodeVisitor_1.NodeVisitor));
exports.SymbolTableBuilder = SymbolTableBuilder;
//# sourceMappingURL=symbolTableBuilder.js.map