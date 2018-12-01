import { Lexer } from './lexer';
import { Token, EOF, INTEGER, PLUS, MINUS } from './token';

export class Interpreter {
    curToken:Token;
    lexer:Lexer;

    public constructor(program:string) {
        this.curToken = null;
        this.lexer = new Lexer(program);
    }

    public setProgramToInterpret(program:string) {
        this.constructor(program);
    }

    private eat(tokenType:string):void {
        if (this.curToken.tokenType == tokenType) {
            this.curToken = this.lexer.getNextToken();
        } else {
            throw Error("Invalid syntax");
        }
    }

    private term():number {
        let token:Token = this.curToken;
        this.eat(INTEGER);
        return token.tokenValue;
    }

    public interpret():number {
        this.curToken = this.lexer.getNextToken();

        let result:number = this.term();

        while(this.curToken.tokenType == PLUS || this.curToken.tokenType == MINUS) {
            if (this.curToken.tokenType == PLUS) {
                this.eat(PLUS);
                result += this.term();
            } else if (this.curToken.tokenType == MINUS) {
                this.eat(MINUS);
                result -= this.term();
            }
        }

        this.eat(EOF);

        return result;
    }
}