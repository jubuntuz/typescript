//note from nodejs
const { basename } = require("path");
const {createInterface} = require("readline");
const { log } = require("util");
const { getHeapStatistics } = require("v8");

const interact = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question("Are you sure to clean data?(Y/N)", answer => {
        log(basename.__filename);
        if (answer == 'Y') log("request clean data");
        else log(getHeapStatistics());
    })
} 

const timeControl = (seconds: number) => {
    setTimeout(interact, seconds);
    let interval = setInterval(interact, Math.floor(seconds / 10));
    clearInterval(interval);
}