"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var interpreter_1 = require("./interpreter");
test("Test assignment", function () {
    var lexer = new lexer_1.Lexer("\n    PROGRAM Part10AST;\n    VAR\n       a, b : INTEGER;\n       c    : INTEGER;\n    \n    BEGIN \n        BEGIN \n            a := 2; \n            b := 2; \n        END; \n        c := 10; \n    END.");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    interpreter.interpret();
    expect(interpreter.symbolTable).toEqual({
        a: 2,
        b: 2,
        c: 10,
    });
});
test("Test variable reference", function () {
    var lexer = new lexer_1.Lexer("\n    PROGRAM Part10AST;\n    VAR\n       a, b : INTEGER;\n       c    : INTEGER;\n    \n    BEGIN \n        BEGIN \n            a := 2; \n            b := 2; \n        END; \n        c := a + b; \n    END.");
    var parser = new parser_1.Parser(lexer);
    var interpreter = new interpreter_1.Interpreter(parser);
    interpreter.interpret();
    expect(interpreter.symbolTable).toEqual({
        a: 2,
        b: 2,
        c: 4,
    });
});
//# sourceMappingURL=interpreter.test.js.map