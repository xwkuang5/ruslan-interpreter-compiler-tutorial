import { Interpreter } from "./interpreter";
import { Lexer } from "./lexer";

test('adds 2 * 2 to equal 4', () => {
    const lexer = new Lexer("2 * 2")
    const interpreter = new Interpreter(lexer);
    expect(interpreter.interpret()).toBe(4);
});

test('adds 2 / 2 to equal 1', () => {
    const lexer = new Lexer("2 / 2")
    const interpreter = new Interpreter(lexer);
    expect(interpreter.interpret()).toBe(1);
});

test('mixed operators', () => {
    const lexer = new Lexer("7 + 4 * 3 / 6 - 2");
    const interpreter = new Interpreter(lexer);
    expect(interpreter.interpret()).toBe(7);
})