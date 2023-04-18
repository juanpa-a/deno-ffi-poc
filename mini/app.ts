import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// serve((req: Request) => new Response("Hello World")); 
// ffi.ts


// Determine library extension based on
// your OS.
let libSuffix = "";
switch (Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  default:
    libSuffix = "so";
    break;
}

const libName = `./libadd.${libSuffix}`;
// Open library and define exported symbols
const dylib = Deno.dlopen(
  libName,
  {
    "add": { parameters: ["isize", "isize"], result: "isize" },
  } as const,
);

// Call the symbol `add`
const result = dylib.symbols.add(35, 34); // 69

serve((req: Request) => new Response(result))
// console.log(`Result from external addition of 35 and 34: ${result}`);
