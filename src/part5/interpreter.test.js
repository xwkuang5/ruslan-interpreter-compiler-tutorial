"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interpreter_1 = require("./interpreter");
var lexer_1 = require("./lexer");
test('adds 2 * 2 to equal 4', function () {
    var lexer = new lexer_1.Lexer("2 * 2");
    var interpreter = new interpreter_1.Interpreter(lexer);
    expect(interpreter.interpret()).toBe(4);
});
test('adds 2 / 2 to equal 1', function () {
    var lexer = new lexer_1.Lexer("2 / 2");
    var interpreter = new interpreter_1.Interpreter(lexer);
    expect(interpreter.interpret()).toBe(1);
});
test('mixed operators', function () {
    var lexer = new lexer_1.Lexer("7 + 4 * 3 / 6 - 2");
    var interpreter = new interpreter_1.Interpreter(lexer);
    expect(interpreter.interpret()).toBe(7);
});
//# sourceMappingURL=interpreter.test.js.map