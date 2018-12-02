"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var interpreter_1 = require("./interpreter");
test('adds 2 * 2 to equal 4', function () {
    var lexer = new lexer_1.Lexer("2 * 2");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    expect(interpreter.interpret()).toBe(4);
});
test('adds 2 / 2 to equal 1', function () {
    var lexer = new lexer_1.Lexer("2 / 2");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    expect(interpreter.interpret()).toBe(1);
});
test('mixed operators', function () {
    var lexer = new lexer_1.Lexer("7 + 4 * 3 / 6 - 2");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    expect(interpreter.interpret()).toBe(7);
});
test('parenthesis-1', function () {
    var lexer = new lexer_1.Lexer("7 + 4 * 3 / (6 - 2)");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    expect(interpreter.interpret()).toBe(10);
});
test('parenthesis-2', function () {
    var lexer = new lexer_1.Lexer("7 + 4 * (((3))) / (6 - 2)");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    expect(interpreter.interpret()).toBe(10);
});
//# sourceMappingURL=interpreter.test.js.map