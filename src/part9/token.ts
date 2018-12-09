export const INTEGER = "INTEGER";
export const PLUS = "PLUS";
export const MINUS = "MINUS";
export const MULT = "MULTIPLY";
export const DIV = "DIVIDE"
export const EOF = "EOF";
export const LEFTPR = "LEFT_PARENTHESIS";
export const RIGHTPR = "RIGHT_PARENTHESIS";

export const BEGIN = "BEGIN";
export const END = "END";
export const DOT = "DOT";
export const ASSIGN = "ASSIGN";
export const SEMICOLON = "SEMICOLON";

export const ID = "ID";

export class Token {
    tokenType: string;
    tokenValue: any;

    public constructor(tokenType:string, tokenValue:any) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }
}

export const RESERVED_KEYWORDS = {
    BEGIN: new Token(BEGIN, BEGIN),
    END: new Token(END, END),
}
