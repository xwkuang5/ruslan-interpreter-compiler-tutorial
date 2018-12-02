import { Lexer } from "./lexer";
import { INTEGER, PLUS, MINUS, MULT, DIV, LEFTPR, RIGHTPR, Token } from "./token";
import { AST, BinOp, UnaryOp, Num } from "./ast";

export class Parser {
    /*
     * Grammar
     *      expr        : term ((PLUS | MINUS) term)*
     *      term        : factor ((MULT | DIV) factor)*
     *      factor      : (PLUS | MINUS) factor | INTEGER | '(' expr ')'
     * 
     * This interpreter can be generalized to handle common arithmetic operations
     * by following the ruls of translating a precedence table into codes
     *      1. For each row of the precedence table, construct a production using
     *         the operators from that level and non-terminals consiting of operators
     *         with higher level of precedence.
     *      2. Create a terminal rule consisting of the basic arithmetic units (Integer, 
     *         etc)
     * 
     * Note:
     *      1. How to deal with right associativity?
     */

    lexer: Lexer;
    curToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }

    private error(): void {
        throw "Invalid syntax";
    }

    private eat(tokenType: string): void {
        if (this.curToken.tokenType == tokenType) {
            this.curToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    private expr(): AST {
        // Assume left associativity
        let node = this.term();
        while (this.curToken.tokenType == PLUS || this.curToken.tokenType == MINUS) {
            const token = this.curToken;
            switch (this.curToken.tokenType) {
                case PLUS:
                    this.eat(PLUS);
                    break;
                case MINUS:
                    this.eat(MINUS);
                    break;
            }
            node = new BinOp(node, token, this.term());
        }

        return node;
    }

    private term(): AST {
        let node = this.factor();
        while (this.curToken.tokenType == MULT || this.curToken.tokenType == DIV) {
            const token = this.curToken;
            switch (this.curToken.tokenType) {
                case MULT:
                    this.eat(MULT);
                    break;
                case DIV:
                    this.eat(DIV);
                    break;
            }
            node = new BinOp(node, token, this.factor());
        }

        return node;
    }

    private factor(): AST {
        if (this.curToken.tokenType == INTEGER) {
            let token = this.curToken;
            this.eat(INTEGER);
            return new Num(token);
        } else if (this.curToken.tokenType == LEFTPR) {
            this.eat(LEFTPR);
            let node = this.expr();
            this.eat(RIGHTPR);
            return node;
        } else if (this.curToken.tokenType == PLUS || this.curToken.tokenType == MINUS) {
            const token = this.curToken;
            switch (this.curToken.tokenType) {
                case PLUS:
                    this.eat(PLUS);
                    break;
                case MINUS:
                    this.eat(MINUS);
                    break;
            }
            return new UnaryOp(token, this.factor());
        }
        this.error();
    }

    public parse(): AST {
        return this.expr();
    }
}