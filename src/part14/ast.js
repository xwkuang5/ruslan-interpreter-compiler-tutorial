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
var Program = /** @class */ (function (_super) {
    __extends(Program, _super);
    function Program(name, block) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.block = block;
        return _this;
    }
    return Program;
}(AST));
exports.Program = Program;
var ProcedureDecl = /** @class */ (function (_super) {
    __extends(ProcedureDecl, _super);
    function ProcedureDecl(name, block, params) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.block = block;
        _this.params = params;
        return _this;
    }
    return ProcedureDecl;
}(AST));
exports.ProcedureDecl = ProcedureDecl;
var Param = /** @class */ (function (_super) {
    __extends(Param, _super);
    function Param(varNode, typeNode) {
        var _this = _super.call(this) || this;
        _this.varNode = varNode;
        _this.typeNode = typeNode;
        return _this;
    }
    return Param;
}(AST));
exports.Param = Param;
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(declarations, compoundStatement) {
        var _this = _super.call(this) || this;
        _this.declarations = declarations;
        _this.compoundStatement = compoundStatement;
        return _this;
    }
    return Block;
}(AST));
exports.Block = Block;
var VarDeclaration = /** @class */ (function (_super) {
    __extends(VarDeclaration, _super);
    function VarDeclaration(varNode, typeNode) {
        var _this = _super.call(this) || this;
        _this.varNode = varNode;
        _this.typeNode = typeNode;
        return _this;
    }
    return VarDeclaration;
}(AST));
exports.VarDeclaration = VarDeclaration;
var Type = /** @class */ (function (_super) {
    __extends(Type, _super);
    function Type(token) {
        var _this = _super.call(this) || this;
        _this.token = token;
        _this.value = token.tokenValue;
        return _this;
    }
    Type.prototype.toString = function () {
        return "Type (" + this.token.tokenType + ", " + this.token.tokenValue + ")";
    };
    return Type;
}(AST));
exports.Type = Type;
var Compound = /** @class */ (function (_super) {
    __extends(Compound, _super);
    function Compound() {
        var _this = _super.call(this) || this;
        _this.children = new Array();
        return _this;
    }
    return Compound;
}(AST));
exports.Compound = Compound;
var Var = /** @class */ (function (_super) {
    __extends(Var, _super);
    function Var(token) {
        var _this = _super.call(this) || this;
        _this.token = token;
        _this.value = token.tokenValue;
        return _this;
    }
    return Var;
}(AST));
exports.Var = Var;
var Assign = /** @class */ (function (_super) {
    __extends(Assign, _super);
    function Assign(left, op, right) {
        var _this = _super.call(this) || this;
        _this.left = left;
        _this.token = op;
        _this.right = right;
        return _this;
    }
    return Assign;
}(AST));
exports.Assign = Assign;
var NoOp = /** @class */ (function (_super) {
    __extends(NoOp, _super);
    function NoOp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoOp;
}(AST));
exports.NoOp = NoOp;
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