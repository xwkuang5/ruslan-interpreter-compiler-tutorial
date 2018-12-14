import { INTEGER, REAL } from "./token";
import { AST, Param } from "./ast";

class Symbol {
    name: string;
    type: AST;

    protected constructor(name: string, type: AST) {
        this.name = name;
        this.type = type;
    }
}

class BuiltInTypeSymbol extends Symbol {
    public constructor(name: string) {
        super(name, null);
    }

    public toString(): string {
        return `BuiltInTypeSymbol(name=${this.name})`;
    }
}

export class VarSymbol extends Symbol {
    public constructor(name: string, type: AST) {
        super(name, type);
    }

    public toString(): string {
        return `VarSymbol(name=${this.name}, type=${this.type})`;
    }
}

export class ProcedureSymbol extends Symbol {
    params: Array<VarSymbol>;

    public constructor(name: string, params: Array<VarSymbol> = []) {
        super(name, null); // null type because Pascal procedure does not return anything
        this.params = params;
    }

    public toString(): string {
        return `ProcedureSymbol(name=${this.name}, parameters=${this.params})`;
    }
}

export class ScopedSymbolTable {
    _symbols: object;
    scopeName: string;
    scopeLevel: number;
    enclosingScope: ScopedSymbolTable;

    public constructor(scopeName: string, scopeLevel: number, enclosingScope: ScopedSymbolTable = null) {
        this._symbols = {};
        this.scopeName = scopeName;
        this.scopeLevel = scopeLevel;
        this.enclosingScope = enclosingScope;
    }

    public initBuiltins() {
        this.insert(new BuiltInTypeSymbol(INTEGER));
        this.insert(new BuiltInTypeSymbol(REAL));
    }

    public insert(symbol: Symbol) {
        this._symbols[symbol.name] = symbol;
    }

    public lookup(name: string, currentLevelOnly = false) {
        let currentScope: ScopedSymbolTable = this;
        let lookupResult = null;
        while (currentScope !== null) {
            lookupResult = currentScope._symbols[name] || null;
            if (lookupResult !== null) {
                return lookupResult;
            } else if (currentLevelOnly) {
                break;
            } else {
                currentScope = currentScope.enclosingScope;
            }
        }
        return null;
    }
}