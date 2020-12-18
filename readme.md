## init
```shell script
npm init -y
tsc --init
```

## install dependencies
```shell script
npm install
```

## npm install
```s
npm install npm@latest -g
npm update
npm outdated
```

## fix IE not working properly & performence
window display size = 100%
internet option - security - protected mode: enable or disable for all zones
using ieServerDrive32.exe instead of 64bit

```javascript
cap.set("nativeEvents", false);
```

## url
* TFS - ORN
https://tfs.cancercare.on.ca/tfs/CCO 

* ORRS - QA
https://qaorrs.renalnetwork.on.ca/orrs

* ORRS - local
https://localhost/orrs.web

* workday
https://wd3.myworkday.com/cco/

* Office 365 portal 
http://portal.office.com

* Outlook 
http://outlook.office.com

* PF_Digital-Technology
https://cancercareontario4.sharepoint.com/sites/928f77d70/ 


# Database
  >server name: `ORNTRN1ORDBS2`

## fix step definition time out
```typescript
import {setDefaultTimeout} from 'cucumber';
setDefaultTimeout(50 * 1000);
```

## config
```js
// cucumber.js
let common = [
  'features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require step-definitions/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--format node_modules/cucumber-pretty' // Load custom formatter
].join(' ');

module.exports = {
  default: common
};
```

```json
// package.json
{
  // ...
  "scripts": {
    "test": "./node_modules/.bin/cucumber-js -p default"
  },
  // ...
}
```
```typescript
    console.log(new Date("2019-05-19"));
    console.log(new Date().toLocaleDateString());
    process.exit();
    ```
## docs
* typescript
https://www.typescriptlang.org/docs/home.html

* cucumber-tsflow
  https://dev.to/denolfe/cucumber-js-with-typescript-44cg


---not sure yet
## setup debug
* in package.json
```json
"build": "tsc"
```

* launch.json
  ```json
  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "NPM Cukes",
            "type": "node",
            "request": "launch",
            "console": "integratedTerminal",
            "program": "${workspaceRoot}/node_modules/cucumber/bin/cucumber-js",
            "args": [
                "./features/**/*.feature",
                "-r",
                "./src/steps/**/*",
                "--tags",
                "@your-tags"
            ]
        }
    ]
}
```
```json
{
    "type": "node",
    "request": "launch",
    "name": "Debug",
    "program": "${workspaceFolder}/node_modules/cucumber/bin/cucumber-js",
    "args": [
        "features/"
    ],
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen",
    "preLaunchTask": "npm: build"
}
```
## tsconfig.json
When working with NodeJs, your tsconfig.json should look like this:
```json
{
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ],
   "compilerOptions": {
        "lib": ["es6"],        // No need for "es5" if you have "es6"
        "types": ["node"],      // When you code for nodejs
        "target": "es6",       // NodeJs v8.9.3 supports most of the es6 features
        "pretty": true,
        "module": "commonjs",
        "outDir": "./build",
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true,
        "sourceMap": true
   }
}
