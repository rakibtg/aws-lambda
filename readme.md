# User Guide

## Common commands

### Run a lambda function

```bash
npm run FunctionName
```

### Watch (hot reload) a lambda function

```bash
npm run watch:FunctionName
```

### Deploy a function

```bash
npm run deploy FunctionName
```

## Creating a new lambda function

- Create a new folder in `functions` directory with the actual lambda function name.
- This new folder should contain two file:
  - **index.js** (the actual lambda function code that contains the `handler` function)
  - **run.js** (the lambda function will be executed in this file with valid mock data. Mock data for custom services can be generated from the lambda custom test configuration page)

## Adding a new package dependency

- Add the new package in `layers/nodejs/package.json` file
- Run `npm install`
- Zip the `nodejs` folder
- Create a new version of the layer and then activate the new version for lambdas

## Good to know

- Use commonjs patterns
- If a package has native binary dependencies then deploy the code in a aws linux docker container.
