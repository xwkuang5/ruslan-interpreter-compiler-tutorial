import { AST, UnaryOp, BinOp, Num, Compound, NoOp, Assign, Var, Program, Block, Type } from "./ast";
import { Parser } from "./parser";
import { PLUS, MULT, MINUS, INTEGER_DIV, FLOAT_DIV, EOF } from "./token";
import { Lexer } from "./lexer";
import { NodeVisitor } from "./nodeVisitor";

export class Interpreter extends NodeVisitor {
    parser: Parser;
    symbolTable: Object;

    public constructor(parser: Parser) {
        super();
        this.parser = parser;
        this.symbolTable = {};
    }

    private visitProgram(node: Program): void {
        this.visit(node.block);
    }

    private visitBlock(node: Block): void {
        node.declarations.map(decl => {
            this.visit(decl);
        });
        this.visit(node.compoundStatement);
    }

    private visitCompound(node: Compound): void {
        node.children.forEach(child => {
            this.visit(child);
        })
    }

    private visitVarDeclaration(node: VarDeclaration): void { }

    private visitType(node: Type): void { }

    private visitNoOp(node: NoOp): void { }

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
            case INTEGER_DIV:
                return Math.floor(leftValue / rightValue);
            case FLOAT_DIV:
                return leftValue / rightValue;
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