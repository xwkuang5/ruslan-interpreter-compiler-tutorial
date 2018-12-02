import { AST } from "./ast";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import * as _ from "lodash";
import { PLUS, MULT, MINUS, DIV } from "./token";

class NodeVisitor {
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

export class Interpreter extends NodeVisitor {
    parser: Parser;

    public constructor(parser: Parser) {
        super();
        this.parser = parser;
    }

    private visitBinOp(node: AST): number {
        const leftValue = this.visit(node.left);
        const rightValue = this.visit(node.right);
        switch (node.token.tokenType) {
            case PLUS:
                return leftValue + rightValue;
            case MINUS:
                return leftValue - rightValue;
            case MULT:
                return leftValue * rightValue;
            case DIV:
                return leftValue / rightValue
        }
    }

    private visitUnaryOp(node: AST): number {
        const value = this.visit(node.expr);
        switch (node.token.tokenType) {
            case PLUS:
                return value;
            case MINUS:
                return -1 * value;
        }
    }

    private visitNum(node: AST): number {
        return node.value;
    }

    public interpret(): number {
        const root = this.parser.parse();
        return this.visit(root);
    }
}