import { Lexer } from './lexer';
import { Token, EOF, INTEGER, PLUS, MINUS, MULT, DIV } from './token';

export class Interpreter {
    /*
     * Grammar
     *      expr    : factor ((PLUS | MINUS) factor)*
     *      factor  : term ((MULT | DIV) term)*
     *      term    : INTEGER
     */

    curToken: Token;
    lexer: Lexer;

    public constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }

    private error(): void {
        throw Error("Invalid syntax");
    }

    private eat(tokenType: string): void {
        if (this.curToken.tokenType == tokenType) {
            this.curToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    private term(): number {
        let token: Token = this.curToken;
        this.eat(INTEGER);
        return token.tokenValue;
    }

    private factor(): number {

        let result: number = this.term();

        while (this.curToken.tokenType == MULT || this.curToken.tokenType == DIV) {
            switch (this.curToken.tokenType) {
                case MULT:
                    this.eat(MULT);
                    result *= this.term();
                    break;
                case DIV:
                    this.eat(DIV);
                    result /= this.term();
                    break;
                default:
                    this.error();
            }
        }

        return result;
    }

    private expr(): number {
        let result: number = this.factor();

        while (this.curToken.tokenType == PLUS || this.curToken.tokenType == MINUS) {
            switch (this.curToken.tokenType) {
                case PLUS:
                    this.eat(PLUS);
                    result += this.factor();
                    break;
                case MINUS:
                    this.eat(MINUS);
                    result -= this.factor();
                    break;
                default:
                    this.error();
            }
        }

        return result;
    }

    public interpret(): number {
        return this.expr();
    }
}