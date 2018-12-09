import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

test("Test assignment", () => {
    const lexer = new Lexer(`
    BEGIN 
        BEGIN 
            a := 2; 
            b := 2; 
        END; 
        c := 10; 
    END.`);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.interpret();
    expect(interpreter.symbolTable).toEqual({
        a: 2, 
        b: 2,
        c: 10, 
    });
});

test("Test variable reference", () => {
    const lexer = new Lexer(`
    BEGIN 
        BEGIN 
            a := 2; 
            b := 2; 
        END; 
        c := a + b; 
    END.`);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.interpret();
    expect(interpreter.symbolTable).toEqual({
        a: 2, 
        b: 2,
        c: 4, 
    });
});

test("Test case-insensitive keywords", () => {
    const lexer = new Lexer(`
    begin 
        BEGIN 
            a := 2; 
            b := 2; 
        end; 
        c := a + b; 
    END.`);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.interpret();
    expect(interpreter.symbolTable).toEqual({
        a: 2, 
        b: 2,
        c: 4, 
    });
});