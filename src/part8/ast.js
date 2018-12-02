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
var AST = /** @class */ (function () {
    function AST() {
    }
    return AST;
}());
exports.AST = AST;
var BinOp = /** @class */ (function (_super) {
    __extends(BinOp, _super);
    function BinOp(left, op, right) {
        var _this = _super.call(this) || this;
        _this.left = left;
        _this.token = op;
        _this.right = right;
        return _this;
    }
    return BinOp;
}(AST));
exports.BinOp = BinOp;
var UnaryOp = /** @class */ (function (_super) {
    __extends(UnaryOp, _super);
    function UnaryOp(token, expr) {
        var _this = _super.call(this) || this;
        _this.token = token;
        _this.expr = expr;
        return _this;
    }
    return UnaryOp;
}(AST));
exports.UnaryOp = UnaryOp;
var Num = /** @class */ (function (_super) {
    __extends(Num, _super);
    function Num(token) {
        var _this = _super.call(this) || this;
        _this.token = token;
        _this.value = token.tokenValue;
        return _this;
    }
    return Num;
}(AST));
exports.Num = Num;
//# sourceMappingURL=ast.js.map