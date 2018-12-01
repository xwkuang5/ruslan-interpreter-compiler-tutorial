"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interpreter_1 = require("./interpreter");
test('adds 1 + 2 to equal 3', function () {
    var interpreter = new interpreter_1.Interpreter("1 + 2");
    expect(interpreter.interpret()).toBe(3);
    interpreter.setProgramToInterpret("1+2");
    expect(interpreter.interpret()).toBe(3);
    interpreter.setProgramToInterpret("1      +2");
    expect(interpreter.interpret()).toBe(3);
    interpreter.setProgramToInterpret("1+       2");
    expect(interpreter.interpret()).toBe(3);
});
test('adds 1 - 2 to equal -1', function () {
    var interpreter = new interpreter_1.Interpreter("1 - 2");
    expect(interpreter.interpret()).toBe(-1);
    interpreter.setProgramToInterpret("1-2");
    expect(interpreter.interpret()).toBe(-1);
    interpreter.setProgramToInterpret("1      -2");
    expect(interpreter.interpret()).toBe(-1);
    interpreter.setProgramToInterpret("1-       2");
    expect(interpreter.interpret()).toBe(-1);
});
test('adds addition and subtraction', function () {
    var interpreter = new interpreter_1.Interpreter("1 - 2 + 3");
    expect(interpreter.interpret()).toBe(2);
    interpreter.setProgramToInterpret("1-2+3");
    expect(interpreter.interpret()).toBe(2);
    interpreter.setProgramToInterpret("1      -2+3");
    expect(interpreter.interpret()).toBe(2);
    interpreter.setProgramToInterpret("1-       2     +3");
    expect(interpreter.interpret()).toBe(2);
});
//# sourceMappingURL=interpreter.test.js.map