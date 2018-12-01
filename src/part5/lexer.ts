import {
    INTEGER,
    PLUS,
    MINUS,
    MULT,
    DIV,
    EOF,
    Token
} from "./token";

export class Lexer {
    /*
     * Assume that input string only contains digit, '+', '-', '*', '/' and ' '
     * 
     * The Lexer instance can have a flyweight token manager to avoid allocating space
     * for tokens that are the same. Note however, care should be taken for storing
     * tokens that may have many instances, e.g., Integer. 
     */
    private program: string;
    private idx: number;

    public constructor(text: string) {
        this.program = text;
        this.idx = 0;
    }

    private error(): void {
        throw Error("Invalid character");
    }

    public getNextToken(): Token {
        while (this.idx < this.program.length && (this.program[this.idx] == ' ')) {
            this.idx += 1;
            continue;
        }
        if (this.idx >= this.program.length) {
            return new Token(EOF, null);
        }

        let acc = '';
        while (this.idx < this.program.length && (!isNaN(parseInt(this.program[this.idx])))) {
            acc += this.program[this.idx];
            this.idx += 1;
        }
        if (acc != '') {
            return new Token(INTEGER, Number(acc));
        } else {
            let token: Token;
            switch (this.program[this.idx]) {
                case '+':
                    token = new Token(PLUS, '+');
                    break;
                case '-':
                    token = new Token(MINUS, '-');
                    break;
                case '*':
                    token = new Token(MULT, '*');
                    break;
                case '/':
                    token = new Token(DIV, '/');
                    break;
                default:
                    this.error();
            }
            this.idx += 1;
            return token;
        }
    }
}