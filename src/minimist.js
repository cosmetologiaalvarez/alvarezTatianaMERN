import minimist from "minimist";
let mArgs = minimist(process.argv.slice(2));

let config = {
    PORT: mArgs.p || 8080
}
