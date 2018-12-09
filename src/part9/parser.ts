import { Lexer } from "./lexer";
import { INTEGER, PLUS, MINUS, MULT, DIV, LEFTPR, RIGHTPR, Token, DOT, BEGIN, END, SEMICOLON, ID, ASSIGN } from "./token";
import { AST, BinOp, UnaryOp, Num, Compound, Var, Assign, NoOp } from "./ast";
import { EOF } from "../part8/token";

export class Parser {
   /*
    *    program : compound_statement DOT
    *
    *    compound_statement : BEGIN statement_list END
    *
    *    statement_list : statement
    *                   | statement SEMI statement_list
    *
    *    statement : compound_statement
    *              | assignment_statement
    *              | empty
    *
    *    assignment_statement : variable ASSIGN expr
    *
    *    empty :
    *
    *    expr: term ((PLUS | MINUS) term)*
    *
    *    term: factor ((MUL | DIV) factor)*
    *
    *    factor : PLUS factor
    *           | MINUS factor
    *           | INTEGER
    *           | LPAREN expr RPAREN
    *           | variable
    *
    *    variable: ID
    */

    lexer: Lexer;
    curToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }

    public program(): AST {
        // program: compound_statement DOT
        const node: AST = this.compound_statement();
        this.eat(DOT);

        return node;
    }

    private compound_statement(): AST {
        // compound_statement: BEGIN statement_list END
        this.eat(BEGIN);
        const nodes: Array<AST> = this.statement_list();
        this.eat(END);

        const root: Compound = new Compound();
        nodes.forEach(node => {
            root.children.push(node);
        });

        return root;
    }

    private statement_list(): Array<AST> {
        // statement_list: statement | statement SEMICOLON statement_list
        let returnValues = new Array<AST>();

        returnValues.push(this.statement());
        while (this.curToken.tokenType === SEMICOLON) {
            this.eat(SEMICOLON);
            returnValues = returnValues.concat(this.statement_list());
        }
        return returnValues;
    }

    private statement(): AST {
        /*
         *  statement: compound_statement | assignment_statement | empty
         */

        switch (this.curToken.tokenType) {
            case BEGIN:
                return this.compound_statement();
            case ID:
                return this.assignment_statement();
            default:
                return this.empty();
        }
    }

    private assignment_statement(): AST {
        // assignment_statement: variable ASSIGN expr
        const left = this.variable();
        const token = this.curToken;
        this.eat(ASSIGN);
        const right = this.expr();
        return new Assign(left, token, right);
    }

    private variable(): Var {
        const variableNode = new Var(this.curToken);
        this.eat(ID);
        return variableNode;
    }

    private empty(): AST {
        return new NoOp();
    }

    private error(): void {
        throw "Invalid syntax";
    }

    private eat(tokenType: string): void {
        if (this.curToken.tokenType === tokenType) {
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
        /*
         *
         * factor :   PLUS  factor
                    | MINUS factor
                    | INTEGER
                    | LPAREN expr RPAREN
                    | variable
         */
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
        } else {
            return this.variable();
        }
    }

    public parse(): AST {
        const node = this.program();
        if (this.curToken.tokenType !== EOF) {
            this.error();
        }
        return node;
    }
}