<div align="right">

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/affe@latest?color=black&label=&style=flat-square)](https://bundlephobia.com/package/affe@latest)
[![npm](https://img.shields.io/npm/v/affe?color=black&label=&style=flat-square)](https://www.npmjs.com/package/affe)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/affe/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/affe/actions/workflows/coverage.yml)

</div>

<img src="./logo-dark.svg#gh-dark-mode-only" height="72px"/>
<img src="./logo-light.svg#gh-light-mode-only" height="72px"/>

AST querying for lazy people.

```js
import { js } from 'affe'


const config = await readFile('eslint.config.js', 'utf8')

//
// 👇 Let's find out which eslint rules are specified
//    in the config.
//
const rules = await js(config).selectAll(`
  export property[name=rules]
  > value > object > property > key > *
`)

rules => rules.forEach(
  rule => console.log(rule.name ?? rule.value)
)
// > semi
// > prefer-const
```

<div align="right">

[**▷ DEMO**](https://loreanvictor.github.io/affe/)

</div>

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
import { js } from 'https://esm.sh/affe'
```

<br>

# Usage

`affe` simplifies _ANY_ syntax tree into a format that can be queried with a CSS-like syntax. It also provides tooling for
further simplification of ASTs of a specific language
for more convenience.

`affe` provides support for JavaScript/JSX out of the box, but you can easily add support for any other language.

```js
import jsx from 'affe'

const code = jsx`
  export default ({ name }) => (
    <div>Hello, {name}!</div>
  )
`

//
// 👇 Let's find out the name of the properties
//    of the exported component.
//
const params = await code.select(`
  export params property key *
`)

params.forEach(param => console.log(param.name ?? param.value))
// > name
```

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
<img src="./misc/monke-dark.svg#gh-dark-mode-only" width="96px"/>
<img src="./misc/monke-light.svg#gh-light-mode-only" width="96px"/>
</div>