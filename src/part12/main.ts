import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { SymbolTableBuilder } from "./symbolTableBuilder";

const program = `
PROGRAM Part12;
VAR
   a : INTEGER;

PROCEDURE P1;
VAR
   a : REAL;
   k : INTEGER;

   PROCEDURE P2;
   VAR
      a, z : INTEGER;
   BEGIN {P2}
      z := 777;
   END;  {P2}

BEGIN {P1}

END;  {P1}

BEGIN {Part12}
   a := 10;
END.  {Part12}
`;

const lexer = new Lexer(program);
const parser = new Parser(lexer);

const tree = parser.parse();
const symbolTableBuilder = new SymbolTableBuilder();
symbolTableBuilder.visit(tree);
console.log(symbolTableBuilder.symbolTable._symbols);