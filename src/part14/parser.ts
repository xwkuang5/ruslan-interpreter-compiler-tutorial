import { Lexer } from "./lexer";
import { INTEGER_CONST, REAL_CONST, PLUS, MINUS, MULT, DIV, LEFTPR, RIGHTPR, Token, DOT, BEGIN, END, SEMICOLON, ID, ASSIGN, EOF, PROGRAM, PROCEDURE, VAR, COMMA, COLON, FLOAT_DIV, INTEGER_DIV } from "./token";
import { AST, BinOp, UnaryOp, Num, Compound, Var, Assign, NoOp, Block, VarDeclaration, ProcedureDecl, Type, Program, Param } from "./ast";
import { INTEGER, REAL, RESERVED_KEYWORDS } from "./token";
import { arrayExtension } from "./utils";

export class Parser {
    /*
     program : PROGRAM variable SEMI block DOT
 
     block : declarations compoundStatement
 
     declarations : VAR (variable_declaration SEMI)+
                  | empty
 
     variable_declaration : ID (COMMA ID)* COLON type_spec
 
     type_spec : INTEGER
 
     compoundStatement : BEGIN statementList END
 
     statementList : statement
                    | statement SEMI statementList
 
     statement : compoundStatement
               | assignmentStatement
               | empty
 
     assignmentStatement : variable ASSIGN expr
 
     empty :
 
     expr : term ((PLUS | MINUS) term)*
 
     term : factor ((MUL | INTEGER_DIV | FLOAT_DIV) factor)*
 
     factor : PLUS factor
            | MINUS factor
            | INTEGER_CONST
            | REAL_CONST
            | LPAREN expr RPAREN
            | variable
 
     variable: ID
     */

    lexer: Lexer;
    curToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.curToken = this.lexer.getNextToken();
    }

    public program(): AST {
        // program : PROGRAM variable SEMI block DOT
        this.eat(PROGRAM);
        const varNode = this.variable();
        const programName = varNode.value;
        this.eat(SEMICOLON);
        const blockNode = this.block();
        this.eat(DOT);
        return new Program(programName, blockNode);
    }

    private block(): Block {
        // block : declarations compoundStatement
        const decl = this.declarations();
        const compoundStatement = this.compoundStatement();

        return new Block(decl, compoundStatement);
    }

    private declarations(): Array<AST> {
        // declarations : VAR (variable_declaration SEMI)+
        //              | (PROCEDURE ID(LPAREN formal_parameter_list RPAREN)? SEMI block SEMI)*
        //              | empty

        let declarationsList: Array<AST> = [];
        while (true) {
            if (this.curToken.tokenType === VAR) {
                this.eat(VAR);
                while (this.curToken.tokenType === ID) {
                    const varDecl = this.variableDeclaration();
                    arrayExtension(declarationsList, varDecl);
                    this.eat(SEMICOLON);
                }
            } else if (this.curToken.tokenType === PROCEDURE) {
                this.eat(PROCEDURE);
                const procedureName = this.curToken.tokenValue;
                this.eat(ID);
                let paramList = [];
                if (this.curToken.tokenType === LEFTPR) {
                    this.eat(LEFTPR);
                    paramList = this.formalParameterList();
                    this.eat(RIGHTPR);
                }
                this.eat(SEMICOLON);
                const procedureDeclarationNode = new ProcedureDecl(procedureName, this.block(), paramList);
                declarationsList.push(procedureDeclarationNode);
                this.eat(SEMICOLON);
            } else {
                break;
            }
        }

        return declarationsList;
    }

    private formalParameterList(): Array<Param> {
        /*
         * formal_parameter_list : formal_parameters
                                 | formal_parameters SEMI formal_parameter_list
         */
        let params = this.formalParameters();

        while (this.curToken.tokenType === SEMICOLON) {
            this.eat(SEMICOLON);
            arrayExtension(params, this.formalParameters());
        }

        return params;
    }

    private formalParameters(): Array<Param> {
        // formal_parameters : ID (COMMA ID)* COLON type_spec | empty
        if (this.curToken.tokenType !== ID) {
            return [];
        }
        let tokenList: Array<Token> = [this.curToken];
        this.eat(ID);
        while (this.curToken.tokenType === COMMA) {
            this.eat(COMMA);
            tokenList.push(this.curToken);
            this.eat(ID);
        }
        this.eat(COLON);
        const typeNode = this.typeSpecification();

        return tokenList.map(token => new Param(new Var(token), typeNode));
    }

    private typeSpecification(): Type {
        if (this.curToken.tokenType === INTEGER) {
            this.eat(INTEGER);
            return new Type(RESERVED_KEYWORDS[INTEGER]);
        } else if (this.curToken.tokenType === REAL) {
            this.eat(REAL);
            new Type(RESERVED_KEYWORDS[REAL]);
        } else {
            this.error();
        }
    }

    private variableDeclaration(): Array<VarDeclaration> {
        let variableNodes = [new Var(this.curToken)];
        this.eat(ID);
        while (this.curToken.tokenType === COMMA) {
            this.eat(COMMA);
            variableNodes = [...variableNodes, new Var(this.curToken)];
            this.eat(ID);
        }
        this.eat(COLON);
        const typeNode = this.typeSpec();
        return variableNodes.map(node => new VarDeclaration(node, typeNode));
    }

    private typeSpec(): Type {
        const token = this.curToken;
        switch (token.tokenType) {
            case INTEGER:
                this.eat(INTEGER);
                break;
            case REAL:
                this.eat(REAL);
                break;
        }
        return new Type(token);
    }

    private compoundStatement(): AST {
        // compoundStatement: BEGIN statementList END
        this.eat(BEGIN);
        const nodes: Array<AST> = this.statementList();
        this.eat(END);

        const root: Compound = new Compound();
        nodes.forEach(node => {
            root.children.push(node);
        });

        return root;
    }

    private statementList(): Array<AST> {
        // statementList: statement | statement SEMICOLON statementList
        let returnValues = new Array<AST>();

        returnValues.push(this.statement());
        while (this.curToken.tokenType === SEMICOLON) {
            this.eat(SEMICOLON);
            returnValues = returnValues.concat(this.statementList());
        }
        return returnValues;
    }

    private statement(): AST {
        /*
         *  statement: compoundStatement | assignmentStatement | empty
         */

        switch (this.curToken.tokenType) {
            case BEGIN:
                return this.compoundStatement();
            case ID:
                return this.assignmentStatement();
            default:
                return this.empty();
        }
    }

    private assignmentStatement(): AST {
        // assignmentStatement: variable ASSIGN expr
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
        while (this.curToken.tokenType === MULT || this.curToken.tokenType === FLOAT_DIV || this.curToken.tokenType === INTEGER_DIV) {
            const token = this.curToken;
            switch (this.curToken.tokenType) {
                case MULT:
                    this.eat(MULT);
                    break;
                case FLOAT_DIV:
                    this.eat(FLOAT_DIV);
                    break;
                case INTEGER_DIV:
                    this.eat(INTEGER_DIV);
                    break
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
                    | INTEGER_CONST
                    | REAL_CONST
                    | LPAREN expr RPAREN
                    | variable
         */
        if (this.curToken.tokenType === INTEGER_CONST) {
            let token = this.curToken;
            this.eat(INTEGER_CONST);
            return new Num(token);
        } else if (this.curToken.tokenType === REAL_CONST) {
            let token = this.curToken;
            this.eat(REAL_CONST);
            return new Num(token);
        } else if (this.curToken.tokenType === LEFTPR) {
            this.eat(LEFTPR);
            let node = this.expr();
            this.eat(RIGHTPR);
            return node;
        } else if (this.curToken.tokenType === PLUS || this.curToken.tokenType === MINUS) {
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