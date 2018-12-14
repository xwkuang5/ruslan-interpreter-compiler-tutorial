"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
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
exports.NodeVisitor = NodeVisitor;
//# sourceMappingURL=nodeVisitor.js.map