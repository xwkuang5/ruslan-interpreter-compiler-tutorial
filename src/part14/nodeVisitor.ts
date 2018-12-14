import * as _ from "lodash";
import { AST } from "./ast";

export class NodeVisitor {
    /*
     *  By using the Visitor patten, we can decouple data structure from application consumer
     *  Interpreter is a consumer (visitor) of the AST data structure
     *  We can easily define other consumer (e.g., a program for analyzing syntax)
     */
    public visit(node: AST): number {
        const visitor = _.get(this, "visit" + node.constructor["name"], this.defaultVisitMethod);
        return visitor.call(this, node);
    }

    private defaultVisitMethod(node: AST) {
        throw Error("Node visit method (visit" + node.constructor["name"] + ") not implemented!");
    }
}