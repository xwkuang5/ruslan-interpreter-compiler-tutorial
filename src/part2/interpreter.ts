import { Lexer } from './lexer';
import { Token, EOF } from './token';

class Interpreter {
    lexer:Lexer;

    public constructor(program:string) {
        this.lexer = new Lexer(program);
    }
}