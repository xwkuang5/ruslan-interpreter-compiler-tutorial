import { Interpreter } from "./interpreter";

test('adds 1 + 2 to equal 3', () => {
    const interpreter = new Interpreter("1 + 2");
    expect(interpreter.interpret()).toBe(3);
    interpreter.setProgramToInterpret("1+2");
    expect(interpreter.interpret()).toBe(3);
    interpreter.setProgramToInterpret("1      +2");
    expect(interpreter.interpret()).toBe(3);
    interpreter.setProgramToInterpret("1+       2");
    expect(interpreter.interpret()).toBe(3);
});

test('adds 1 - 2 to equal -1', () => {
    const interpreter = new Interpreter("1 - 2");
    expect(interpreter.interpret()).toBe(-1);
    interpreter.setProgramToInterpret("1-2");
    expect(interpreter.interpret()).toBe(-1);
    interpreter.setProgramToInterpret("1      -2");
    expect(interpreter.interpret()).toBe(-1);
    interpreter.setProgramToInterpret("1-       2");
    expect(interpreter.interpret()).toBe(-1);
});

test('adds addition and subtraction', () => {
    const interpreter = new Interpreter("1 - 2 + 3");
    expect(interpreter.interpret()).toBe(2);
    interpreter.setProgramToInterpret("1-2+3");
    expect(interpreter.interpret()).toBe(2);
    interpreter.setProgramToInterpret("1      -2+3");
    expect(interpreter.interpret()).toBe(2);
    interpreter.setProgramToInterpret("1-       2     +3");
    expect(interpreter.interpret()).toBe(2);
});