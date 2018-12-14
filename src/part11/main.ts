import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { SymbolTableBuilder } from "./symbolTableBuilder";

const program1 = `
PROGRAM NameError1;
VAR
   a : INTEGER;

BEGIN
   a := 2 + b;
END.
`;

const program2 = `
PROGRAM NameError2;
VAR
   b : INTEGER;

BEGIN
   b := 1;
   a := b + 2;
END.
`;

const lexer = new Lexer(program2);
const parser = new Parser(lexer);

const tree = parser.parse();
const symbolTableBuilder = new SymbolTableBuilder();
symbolTableBuilder.visit(tree);