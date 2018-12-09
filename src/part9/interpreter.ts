import { AST, UnaryOp, BinOp, Num, Compound, NoOp, Assign, Var } from "./ast";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import * as _ from "lodash";
import { PLUS, MULT, MINUS, DIV } from "./token";
import { EOF } from "../part5/token";

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
    symbolTable: Object;

    public constructor(parser: Parser) {
        super();
        this.parser = parser;
        this.symbolTable = {};
    }

    private visitCompound(node: Compound): void {
        node.children.forEach(child => {
            this.visit(child);
        })
    }

    private visitNoOp(node: NoOp): void {}

    private visitAssign(node: Assign): void {
        const variableName = node.left.value;
        this.symbolTable[variableName] = this.visit(node.right);
    }

    private visitVar(node: Var): Number {
        const variableName = node.value;
        if (!(variableName in this.symbolTable)) {
            throw new Error("Unrecognized identifier " + variableName);
        }
        return this.symbolTable[variableName];
    }

    private visitBinOp(node: BinOp): number {
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

    private visitUnaryOp(node: UnaryOp): number {
        const value = this.visit(node.expr);
        switch (node.token.tokenType) {
            case PLUS:
                return value;
            case MINUS:
                return -1 * value;
        }
    }

    private visitNum(node: Num): number {
        return node.value;
    }

    public interpret(): number {
        const root = this.parser.parse();
        return this.visit(root);
    }
}