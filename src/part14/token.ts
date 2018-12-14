
// token
export const PLUS = "PLUS";
export const MINUS = "MINUS";
export const MULT = "MULTIPLY";
export const INTEGER_DIV = "INTEGER_DIV";
export const FLOAT_DIV = "FLOAT_DIV";
export const EOF = "EOF";
export const LEFTPR = "LEFT_PARENTHESIS";
export const RIGHTPR = "RIGHT_PARENTHESIS";
export const REAL_CONST = "REAL_CONST";
export const INTEGER_CONST = "INTEGER_CONST";

export const DOT = "DOT";
export const ASSIGN = "ASSIGN";
export const SEMICOLON = "SEMICOLON";
export const COLON = "COLON";
export const COMMA = "COMMA";
export const ID = "ID";

// reserved keywords
export const PROGRAM = "PROGRAM";
export const PROCEDURE = "PROCEDURE";
export const BEGIN = "BEGIN";
export const END = "END";
export const INTEGER = "INTEGER"; // integer type
export const REAL = "REAL"; // real type
export const DIV = "DIV"; // integer division
export const VAR = "VAR";

export class Token {
    tokenType: string;
    tokenValue: any;

    public constructor(tokenType:string, tokenValue:any) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }

    public toString(): string {
        return `Token(${this.tokenType}, ${this.tokenValue})`;
    }
}

export const RESERVED_KEYWORDS = {
    PROGRAM: new Token(PROGRAM, PROGRAM),
    PROCEDURE: new Token(PROCEDURE, PROCEDURE),
    BEGIN: new Token(BEGIN, BEGIN),
    END: new Token(END, END),
    DIV: new Token(INTEGER_DIV, DIV),
    INTEGER: new Token(INTEGER, INTEGER),
    REAL: new Token(REAL, REAL),
    VAR: new Token(VAR, VAR),
}
