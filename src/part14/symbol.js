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
var Symbol = /** @class */ (function () {
    function Symbol(name, type) {
        this.name = name;
        this.type = type;
    }
    return Symbol;
}());
var BuiltInTypeSymbol = /** @class */ (function (_super) {
    __extends(BuiltInTypeSymbol, _super);
    function BuiltInTypeSymbol(name) {
        return _super.call(this, name, null) || this;
    }
    BuiltInTypeSymbol.prototype.toString = function () {
        return "BuiltInTypeSymbol(name=" + this.name + ")";
    };
    return BuiltInTypeSymbol;
}(Symbol));
var VarSymbol = /** @class */ (function (_super) {
    __extends(VarSymbol, _super);
    function VarSymbol(name, type) {
        return _super.call(this, name, type) || this;
    }
    VarSymbol.prototype.toString = function () {
        return "VarSymbol(name=" + this.name + ", type=" + this.type + ")";
    };
    return VarSymbol;
}(Symbol));
exports.VarSymbol = VarSymbol;
var ProcedureSymbol = /** @class */ (function (_super) {
    __extends(ProcedureSymbol, _super);
    function ProcedureSymbol(name, params) {
        if (params === void 0) { params = []; }
        var _this = _super.call(this, name, null) || this;
        _this.params = params;
        return _this;
    }
    ProcedureSymbol.prototype.toString = function () {
        return "ProcedureSymbol(name=" + this.name + ", parameters=" + this.params + ")";
    };
    return ProcedureSymbol;
}(Symbol));
exports.ProcedureSymbol = ProcedureSymbol;
var ScopedSymbolTable = /** @class */ (function () {
    function ScopedSymbolTable(scopeName, scopeLevel, enclosingScope) {
        if (enclosingScope === void 0) { enclosingScope = null; }
        this._symbols = {};
        this.scopeName = scopeName;
        this.scopeLevel = scopeLevel;
        this.enclosingScope = enclosingScope;
    }
    ScopedSymbolTable.prototype.initBuiltins = function () {
        this.insert(new BuiltInTypeSymbol(token_1.INTEGER));
        this.insert(new BuiltInTypeSymbol(token_1.REAL));
    };
    ScopedSymbolTable.prototype.insert = function (symbol) {
        this._symbols[symbol.name] = symbol;
    };
    ScopedSymbolTable.prototype.lookup = function (name, currentLevelOnly) {
        if (currentLevelOnly === void 0) { currentLevelOnly = false; }
        var currentScope = this;
        var lookupResult = null;
        while (currentScope !== null) {
            lookupResult = currentScope._symbols[name] || null;
            if (lookupResult !== null) {
                return lookupResult;
            }
            else if (currentLevelOnly) {
                break;
            }
            else {
                currentScope = currentScope.enclosingScope;
            }
        }
        return null;
    };
    return ScopedSymbolTable;
}());
exports.ScopedSymbolTable = ScopedSymbolTable;
//# sourceMappingURL=symbol.js.map