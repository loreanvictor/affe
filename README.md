<div align="right">

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/affe@latest?color=black&label=&style=flat-square)](https://bundlephobia.com/package/affe@latest)
[![npm](https://img.shields.io/npm/v/affe?color=black&label=&style=flat-square)](https://www.npmjs.com/package/affe)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/affe/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/affe/actions/workflows/coverage.yml)

</div>

<img src="./logo-dark.svg#gh-dark-mode-only" height="72px"/>
<img src="./logo-light.svg#gh-light-mode-only" height="72px"/>

AST querying for lazy people.

```js
import { esselector } from 'affe'

//
// 👉 STEP 1: create a selector function
//
const { select } = await esselector(`
  export default [
    {
      rules: {
          semi: "error",
          "prefer-const": "error"
      }
    }
  ]
`)

//
// 👉 STEP 2: query the code like you would CSS
//
const rule = select(`
  export[kind=default]
  property[name=rules]
  > value > object > property > key > *
`)

rules.forEach(rule => console.log(rule.name ?? rule.value))
// > semi
// > prefer-const
```

<br>

# Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)

<br>

# Installation

[Node](https://nodejs.org/en/):

```bash
npm i affe
```

Browser / [Deno](https://deno.land):

```js
import { selector } from 'https://esm.sh/affe'
```

<br>

# Usage

> _👷🏽 TODO: look at the example above. to be completed.

<br>

# Contribution

You need [node](https://nodejs.org/en/), [NPM](https://www.npmjs.com) to start and [git](https://git-scm.com) to start.

```bash
# clone the code
git clone git@github.com:loreanvictor/affe.git
```
```bash
# install stuff
npm i
```

Make sure all checks are successful on your PRs. This includes all tests passing, high code coverage, correct typings and abiding all [the linting rules](https://github.com/loreanvictor/affe/blob/main/.eslintrc). The code is typed with [TypeScript](https://www.typescriptlang.org), [Jest](https://jestjs.io) is used for testing and coverage reports, [ESLint](https://eslint.org) and [TypeScript ESLint](https://typescript-eslint.io) are used for linting. Subsequently, IDE integrations for TypeScript and ESLint would make your life much easier (for example, [VSCode](https://code.visualstudio.com) supports TypeScript out of the box and has [this nice ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)), but you could also use the following commands:

```bash
# run tests
npm test
```
```bash
# check code coverage
npm run coverage
```
```bash
# run linter
npm run lint
```
```bash
# run type checker
npm run typecheck
```

<br>

<div align="center">
<img src="./misc/monke-dark.svg#gh-dark-mode-only" width="80px"/>
<img src="./misc/monke-light.svg#gh-light-mode-only" width="80px"/>
</div>