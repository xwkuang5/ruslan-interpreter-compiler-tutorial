import { NodeVisitor } from "./nodeVisitor";
import { SymbolTable, VarSymbol } from "./symbol";
import { Program, Block, BinOp, Num, UnaryOp, Compound, NoOp, VarDeclaration, Assign } from "./ast";
import { Var } from "../part10/ast";

export class SymbolTableBuilder extends NodeVisitor {
    symbolTable: SymbolTable;

    public constructor() {
        super();
        this.symbolTable = new SymbolTable();
    }

    public visitProgram(node: Program) {
        this.visit(node.block);
    }

    private visitBlock(node: Block) {
        node.declarations.forEach(declNode => this.visit(declNode));
        this.visit(node.compoundStatement);
    }

    private visitBinOp(node: BinOp) {
        this.visit(node.left);
        this.visit(node.right);
    }

    private visitNum(node: Num) { }

    private visitUnaryOp(node: UnaryOp) {
        this.visit(node.expr);
    }

    private visitCompound(node: Compound) {
        node.children.forEach(child => this.visit(child));
    }

    private visitNoOp(node: NoOp) { }

    private visitVarDeclaration(node: VarDeclaration) {
        const typeName: string = node.typeNode.value;
        const typeSymbol: Symbol = this.symbolTable.lookup(typeName);
        const varName: string = node.varNode.value;
        this.symbolTable.define(new VarSymbol(varName, typeSymbol));
    }

    private visitAssign(node: Assign) {
        // TODO: type checking
        const varName: string = node.left.value;
        if (this.symbolTable.lookup(varName) === null) {
            throw Error("Assigning to non-existent variable: " + varName);
        }
        this.visit(node.right);
    }

    private visitVar(node: Var) {
        const varName: string = node.value;
        if (this.symbolTable.lookup(varName) === null) {
            throw Error("Referencing non-existent variable: " + varName);
        }
    }
}