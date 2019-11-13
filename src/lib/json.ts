const test = require('./../../package.json').test;
export const read = (filename: string) => {
    let fs = require("fs");
    var contents = fs.readFileSync(`${test.data}${filename}.json`);
    return JSON.parse(contents);
}


