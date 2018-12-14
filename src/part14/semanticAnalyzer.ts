import { NodeVisitor } from "./nodeVisitor";
import { ScopedSymbolTable, VarSymbol, ProcedureSymbol } from "./symbol";
import { Program, Block, BinOp, Num, UnaryOp, Compound, NoOp, VarDeclaration, ProcedureDecl, Assign } from "./ast";
import { Var } from "./ast";

export class SemanticAnalyzer extends NodeVisitor {
    currentScope: ScopedSymbolTable;

    public constructor() {
        super();
        this.currentScope = null;
    }

    public visitProgram(node: Program) {
        console.log("ENTER scope: global");
        const scope = new ScopedSymbolTable("global", 1, null);
        scope.initBuiltins();
        this.currentScope = scope;
        this.visit(node.block);
        console.log(scope);
        this.currentScope = this.currentScope.enclosingScope;
        console.log("Leave scope " + scope.scopeName);
    }

    private visitProcedureDecl(node: ProcedureDecl) {
        const procedureName = node.name;
        console.log("ENTER scope: " + procedureName);
        const procedureSymbol = new ProcedureSymbol(procedureName);
        this.currentScope.insert(procedureSymbol);

        const procedureScope = new ScopedSymbolTable(procedureName, this.currentScope.scopeLevel + 1, this.currentScope);
        this.currentScope = procedureScope;
        
        node.params.forEach(param => {
            const paramType = this.currentScope.lookup(param.typeNode.value);
            const paramName = param.varNode.value;
            const variableSymbol = new VarSymbol(paramName, paramType)
            procedureSymbol.params.push(variableSymbol);
            this.currentScope.insert(variableSymbol);
        });
        this.visit(node.block);
        console.log(procedureScope);

        this.currentScope = this.currentScope.enclosingScope;
        console.log("Leave scope " + procedureScope.scopeName);
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
        const typeSymbol: Symbol = this.currentScope.lookup(typeName);
        const varName: string = node.varNode.value;
        if (this.currentScope.lookup(varName, true) !== null) {
            throw "Error: duplicate identifier " + varName;
        }
        this.currentScope.insert(new VarSymbol(varName, typeSymbol));
    }

    private visitAssign(node: Assign) {
        // TODO: type checking
        const varName: string = node.left.value;
        if (this.currentScope.lookup(varName) === null) {
            throw Error("Error: assigning to non-existent variable: " + varName);
        }
        this.visit(node.right);
    }

    private visitVar(node: Var) {
        const varName: string = node.value;
        if (this.currentScope.lookup(varName) === null) {
            throw Error("Referencing non-existent variable: " + varName);
        }
    }
}