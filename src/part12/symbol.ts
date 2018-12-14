import { INTEGER, REAL } from "./token";

class Symbol {
    name: string;
    type: any;

    protected constructor(name: string, type: any) {
        this.name = name;
        this.type = type;
    }
}

class BuiltInTypeSymbol extends Symbol {
    public constructor(name: string) {
        super(name, null);
    }
}

export class VarSymbol extends Symbol {
    public constructor(name: string, type: any) {
        super(name, type);
    }
}

export class SymbolTable {
    _symbols: object;

    public constructor() { 
        this._symbols = {} 
    }

    private _initBuiltins() {
        this.define(new BuiltInTypeSymbol(INTEGER));
        this.define(new BuiltInTypeSymbol(REAL));
    }

    public define(symbol: Symbol) {
        this._symbols[symbol.name] = symbol;
    }

    public lookup(name: string) {
        return this._symbols[name] || null;
    }
}