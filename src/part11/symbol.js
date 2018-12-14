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
    return BuiltInTypeSymbol;
}(Symbol));
var VarSymbol = /** @class */ (function (_super) {
    __extends(VarSymbol, _super);
    function VarSymbol(name, type) {
        return _super.call(this, name, type) || this;
    }
    return VarSymbol;
}(Symbol));
exports.VarSymbol = VarSymbol;
var SymbolTable = /** @class */ (function () {
    function SymbolTable() {
        this._symbols = {};
    }
    SymbolTable.prototype._initBuiltins = function () {
        this.define(new BuiltInTypeSymbol(token_1.INTEGER));
        this.define(new BuiltInTypeSymbol(token_1.REAL));
    };
    SymbolTable.prototype.define = function (symbol) {
        this._symbols[symbol.name] = symbol;
    };
    SymbolTable.prototype.lookup = function (name) {
        return this._symbols[name] || null;
    };
    return SymbolTable;
}());
exports.SymbolTable = SymbolTable;
//# sourceMappingURL=symbol.js.map