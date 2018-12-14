"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var semanticAnalyzer_1 = require("./semanticAnalyzer");
var program = "\nprogram Main;\n   var b, x, y : real;\n   var z : integer;\n\n   procedure AlphaA(a : integer);\n      var b : integer;\n\n      procedure Beta(c : integer);\n         var y : integer;\n\n         procedure Gamma(c : integer);\n            var x : integer;\n         begin { Gamma }\n            x := a + b + c + x + y + z;\n         end;  { Gamma }\n\n      begin { Beta }\n\n      end;  { Beta }\n\n   begin { AlphaA }\n\n   end;  { AlphaA }\n\n   procedure AlphaB(a : integer);\n      var c : real;\n   begin { AlphaB }\n      c := a + b;\n   end;  { AlphaB }\n\nbegin { Main }\nend.  { Main }\n";
var lexer = new lexer_1.Lexer(program);
var parser = new parser_1.Parser(lexer);
var tree = parser.parse();
var semanticAnalyzer = new semanticAnalyzer_1.SemanticAnalyzer();
semanticAnalyzer.visit(tree);
//# sourceMappingURL=main.js.map