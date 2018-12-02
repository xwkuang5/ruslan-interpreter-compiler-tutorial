import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

test('adds 2 * 2 to equal 4', () => {
    const lexer = new Lexer("2 * 2");
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    expect(interpreter.interpret()).toBe(4);
});

test('adds 2 / 2 to equal 1', () => {
    const lexer = new Lexer("2 / 2");
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    expect(interpreter.interpret()).toBe(1);
});

test('mixed operators', () => {
    const lexer = new Lexer("7 + 4 * 3 / 6 - 2");
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    expect(interpreter.interpret()).toBe(7);
});

test('parenthesis-1', () => {
    const lexer = new Lexer("7 + 4 * 3 / (6 - 2)");
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    expect(interpreter.interpret()).toBe(10);
});

test('parenthesis-2', () => {
    const lexer = new Lexer("7 + 4 * (((3))) / (6 - 2)");
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    expect(interpreter.interpret()).toBe(10);
});