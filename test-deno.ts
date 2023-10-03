import "https://unpkg.com/mocha/mocha.js";
import { dirname, fromFileUrl } from "https://deno.land/std/path/mod.ts";
import { globber } from "https://lib.deno.dev/x/globber@latest/mod.ts";

(window as any).location = new URL("http://localhost:0");
mocha.setup({ ui: "bdd", reporter: "spec" });
mocha.checkLeaks();

const files = globber({
    cwd: dirname(fromFileUrl(import.meta.url)),
    include: ["*.test.ts"],
    exclude: ["getGlobal.test.ts"],
});

for await (const file of files) {
    await import(file.absolute);
}

mocha.run((failures: number) => {
    if (failures > 0) {
        Deno.exit(1);
    } else {
        Deno.exit(0);
    }
}).globals(["onerror"]);
