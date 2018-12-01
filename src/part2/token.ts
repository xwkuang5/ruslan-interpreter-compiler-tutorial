export const INTEGER = "INTEGER";
export const PLUS = "PLUS";
export const MINUS = "MINUS";
export const EOF = "EOF";

export class Token {
    tokenType: string;
    tokenValue: any;

    public constructor(tokenType:string, tokenValue:any) {
        this.tokenType = tokenType;
        this.tokenValue = tokenValue;
    }
}