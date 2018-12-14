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
var SemanticAnalyzer = /** @class */ (function (_super) {
    __extends(SemanticAnalyzer, _super);
    function SemanticAnalyzer() {
        var _this = _super.call(this) || this;
        _this.currentScope = null;
        return _this;
    }
    SemanticAnalyzer.prototype.visitProgram = function (node) {
        console.log("ENTER scope: global");
        var scope = new symbol_1.ScopedSymbolTable("global", 1, null);
        scope.initBuiltins();
        this.currentScope = scope;
        this.visit(node.block);
        console.log(scope);
        this.currentScope = this.currentScope.enclosingScope;
        console.log("Leave scope " + scope.scopeName);
    };
    SemanticAnalyzer.prototype.visitProcedureDecl = function (node) {
        var _this = this;
        var procedureName = node.name;
        console.log("ENTER scope: " + procedureName);
        var procedureSymbol = new symbol_1.ProcedureSymbol(procedureName);
        this.currentScope.insert(procedureSymbol);
        var procedureScope = new symbol_1.ScopedSymbolTable(procedureName, this.currentScope.scopeLevel + 1, this.currentScope);
        this.currentScope = procedureScope;
        node.params.forEach(function (param) {
            var paramType = _this.currentScope.lookup(param.typeNode.value);
            var paramName = param.varNode.value;
            var variableSymbol = new symbol_1.VarSymbol(paramName, paramType);
            procedureSymbol.params.push(variableSymbol);
            _this.currentScope.insert(variableSymbol);
        });
        this.visit(node.block);
        console.log(procedureScope);
        this.currentScope = this.currentScope.enclosingScope;
        console.log("Leave scope " + procedureScope.scopeName);
    };
    SemanticAnalyzer.prototype.visitBlock = function (node) {
        var _this = this;
        node.declarations.forEach(function (declNode) { return _this.visit(declNode); });
        this.visit(node.compoundStatement);
    };
    SemanticAnalyzer.prototype.visitBinOp = function (node) {
        this.visit(node.left);
        this.visit(node.right);
    };
    SemanticAnalyzer.prototype.visitNum = function (node) { };
    SemanticAnalyzer.prototype.visitUnaryOp = function (node) {
        this.visit(node.expr);
    };
    SemanticAnalyzer.prototype.visitCompound = function (node) {
        var _this = this;
        node.children.forEach(function (child) { return _this.visit(child); });
    };
    SemanticAnalyzer.prototype.visitNoOp = function (node) { };
    SemanticAnalyzer.prototype.visitVarDeclaration = function (node) {
        var typeName = node.typeNode.value;
        var typeSymbol = this.currentScope.lookup(typeName);
        var varName = node.varNode.value;
        if (this.currentScope.lookup(varName, true) !== null) {
            throw "Error: duplicate identifier " + varName;
        }
        this.currentScope.insert(new symbol_1.VarSymbol(varName, typeSymbol));
    };
    SemanticAnalyzer.prototype.visitAssign = function (node) {
        // TODO: type checking
        var varName = node.left.value;
        if (this.currentScope.lookup(varName) === null) {
            throw Error("Error: assigning to non-existent variable: " + varName);
        }
        this.visit(node.right);
    };
    SemanticAnalyzer.prototype.visitVar = function (node) {
        var varName = node.value;
        if (this.currentScope.lookup(varName) === null) {
            throw Error("Referencing non-existent variable: " + varName);
        }
    };
    return SemanticAnalyzer;
}(nodeVisitor_1.NodeVisitor));
exports.SemanticAnalyzer = SemanticAnalyzer;
//# sourceMappingURL=semanticAnalyzer.js.map