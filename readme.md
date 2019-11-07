## install latest version of npm
```shell script
npm install npm@latest -g
```
## install typeScript etc
```shell script
npm i -D cucumber cucumber-tsflow cucumber-pretty ts-node typescript chai
npm i -D @types/cucumber @types/chai @types/body-parser @types/express @types/node
```

## init
```shell script
npm init -y
tsc --init
```

## install other dependencies
```shell script
npm i -D chromedriver @types/chromedriver
npm i -D iedriver @types/iedriver
npm i -D selenium-webdriver @types/selenium-webdriver
npm i -D reflect-metadata @types/reflect-metadata
```

## fix chrome version error(make sure using node_modules/chromedriver instead of /node_modules/selenium-webdriver/chrome)
* uninstall selenium-webdriver/chrome
* specify chromedriver path while start browser
```typescript
const chromePath = require('chromedriver').path;
driver = new Builder(chromePath).....
```
## fix function time out
```typescript
import {setDefaultTimeout} from 'cucumber';
setDefaultTimeout(50 * 1000);
```

## install npm extension in VS Code

## create the project structure
root -> features && 
     -> src/steps

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
```


   ```cucumber
 

@smoke
Feature: ORRS smoke test

  Scenario:login
    Given I launch ORRS as a user:
      | username      | password |
      | junhong.zhang |          |

 
   @registration
  Scenario Outline: As a user, I should be able to register a patient
    When I register a Pregnancy patient at <location>
      | firstname |
      | Pregnancy |
    Then I should see patientId in the page
    Examples:
      | hospital | location |
      | "WRH"    | "DMA"    |
      | "WRH"    | "SPHD"   |



  @treatment
  Scenario Outline: As a user, I should not add any treatment having invalid modality for its location
    Given I have a patient in manage Census page at <location>
    When I add "M" treatment
    Then I should not see any of <invalidModalities> in Modality dropdown list
      And I should see an error while input any of <invalidModalities> in Modality code
    Examples:
      | location | invalidModalities |
      | "WHD"    | "281,291"         |
      | "SPHD"   | "040,442,443,444,050,452,453,454" |
   