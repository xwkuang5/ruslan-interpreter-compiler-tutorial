import { Token } from "./token";

export class AST { 
    left: AST;
    right: AST;
    token: Token;
    value: number;
}

export class BinOp extends AST {
    left: AST;
    right: AST;
    token: Token;

    public constructor(left: AST, op: Token, right: AST) {
        super();
        this.left = left;
        this.token = op;
        this.right = right;
    }
}

export class Num extends AST {
    token: Token;
    value: number;

    public constructor(token:Token) {
        super();

        this.token = token;
        this.value = token.tokenValue;
    }
}
