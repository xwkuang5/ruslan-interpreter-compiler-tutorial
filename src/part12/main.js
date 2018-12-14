"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var symbolTableBuilder_1 = require("./symbolTableBuilder");
var program = "\nPROGRAM Part12;\nVAR\n   a : INTEGER;\n\nPROCEDURE P1;\nVAR\n   a : REAL;\n   k : INTEGER;\n\n   PROCEDURE P2;\n   VAR\n      a, z : INTEGER;\n   BEGIN {P2}\n      z := 777;\n   END;  {P2}\n\nBEGIN {P1}\n\nEND;  {P1}\n\nBEGIN {Part12}\n   a := 10;\nEND.  {Part12}\n";
var lexer = new lexer_1.Lexer(program);
var parser = new parser_1.Parser(lexer);
var tree = parser.parse();
var symbolTableBuilder = new symbolTableBuilder_1.SymbolTableBuilder();
symbolTableBuilder.visit(tree);
console.log(symbolTableBuilder.symbolTable._symbols);
//# sourceMappingURL=main.js.map