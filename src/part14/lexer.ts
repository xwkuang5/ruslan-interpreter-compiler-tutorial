import {
    INTEGER,
    REAL,
    PLUS,
    MINUS,
    MULT,
    DIV,
    LEFTPR,
    RIGHTPR,
    EOF,
    BEGIN,
    END,
    DOT,
    ID,
    Token,
    RESERVED_KEYWORDS,
    COMMA,
    SEMICOLON,
    ASSIGN,

    REAL_CONST,
    INTEGER_CONST,
    COLON,
    FLOAT_DIV
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
    private curChar: string;
    private idx: number;

    public constructor(text: string) {
        this.program = text;
        this.idx = 0;
        this.curChar = this.program.length === 0 ? null : this.program[0];
    }

    private error(): void {
        throw Error("Invalid character");
    }

    private advance(): void {
        this.idx += 1;
        if (this.idx == this.program.length) {
            this.curChar = null;
        } else {
            this.curChar = this.program[this.idx];
        }
    }

    private peek(): string {
        if (this.idx + 1 == this.program.length) {
            return null;
        } else {
            return this.program[this.idx + 1];
        }
    }

    private _id(): Token {
        let acc = '';
        while (this.curChar !== null && /^[a-z0-9A-Z]$/.test(this.curChar)) {
            acc += this.curChar;
            this.advance();
        }

        // convert to uppercase before comparison with reserved keywords to support case-insensitivenss
        return acc.toLocaleUpperCase() in RESERVED_KEYWORDS ? RESERVED_KEYWORDS[acc.toUpperCase()] : new Token(ID, acc);
    }

    private number(): Token {
        let acc = '';
        while (this.curChar !== null && /[0-9]/.test(this.curChar)) {
            acc += this.curChar;
            this.advance();
        }

        if (this.curChar === '.') {
            acc += this.curChar;
            this.advance();
            while (this.curChar !== null && /[0-9]/.test(this.curChar)) {
                acc += this.curChar;
                this.advance();
            }

            return new Token(REAL_CONST, parseFloat(acc));
        }

        return new Token(INTEGER_CONST, parseInt(acc));
    }

    private skipWhitespace(): void {
        while (this.curChar !== null && /^\s$/.test(this.curChar)) {
            this.advance();
        }
    }

    private skipComment(): void {
        while (this.curChar !== null && this.curChar !== '}') {
            this.advance();
        }
        this.advance();
    }

    public getNextToken(): Token {
        while (this.curChar !== null) {
            switch (true) {
                case this.curChar === '{':
                    this.advance();
                    this.skipComment();
                    break;
                case /^\s$/.test(this.curChar):
                    this.skipWhitespace();
                    break;
                // in general an identifier can be named using digits as long as it is not leading
                case /^[a-zA-Z]$/.test(this.curChar):
                    // DIV keyword is handled here
                    return this._id();
                case /^[0-9]$/.test(this.curChar):
                    return this.number();
                case this.curChar === ':' && this.peek() === '=':
                    this.advance();
                    this.advance();
                    return new Token(ASSIGN, ':=');
                case this.curChar === ':':
                    this.advance();
                    return new Token(COLON, ':');
                case this.curChar === ',':
                    this.advance();
                    return new Token(COMMA, ',');
                case this.curChar === '.':
                    this.advance();
                    return new Token(DOT, '.');
                case this.curChar === '+':
                    this.advance();
                    return new Token(PLUS, '+');
                case this.curChar === '-':
                    this.advance();
                    return new Token(MINUS, '-');
                case this.curChar === '*':
                    this.advance();
                    return new Token(MULT, '*');
                case this.curChar === '/':
                    this.advance();
                    return new Token(FLOAT_DIV, '/');
                case this.curChar === '(':
                    this.advance();
                    return new Token(LEFTPR, '(');
                case this.curChar === ')':
                    this.advance();
                    return new Token(RIGHTPR, ')');
                case this.curChar === ';':
                    this.advance();
                    return new Token(SEMICOLON, ';');
                default:
                    this.error();
            }
        }
        return new Token(EOF, EOF);
    }
}