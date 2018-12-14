"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var symbolTableBuilder_1 = require("./symbolTableBuilder");
var program1 = "\nPROGRAM NameError1;\nVAR\n   a : INTEGER;\n\nBEGIN\n   a := 2 + b;\nEND.\n";
var program2 = "\nPROGRAM NameError2;\nVAR\n   b : INTEGER;\n\nBEGIN\n   b := 1;\n   a := b + 2;\nEND.\n";
var lexer = new lexer_1.Lexer(program2);
var parser = new parser_1.Parser(lexer);
var tree = parser.parse();
var symbolTableBuilder = new symbolTableBuilder_1.SymbolTableBuilder();
symbolTableBuilder.visit(tree);
//# sourceMappingURL=main.js.map