<div align="right">

[![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/affe?style=flat-square&label=%20&color=black)](https://bundlejs.com/?q=affe)
[![npm](https://img.shields.io/npm/v/affe?color=black&label=&style=flat-square)](https://www.npmjs.com/package/affe)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/affe/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/affe/actions/workflows/coverage.yml)

</div>

<img src="./logo-dark.svg#gh-dark-mode-only" height="72px"/>
<img src="./logo-light.svg#gh-light-mode-only" height="72px"/>

Query any object with [CSS-like](https://github.com/syntax-tree/unist-util-select) selectors. Particularly useful for querying [ASTs](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of programming languages.

```js
import { js, pipe, select, all } from 'affe'


const config = await readFile('eslint.config.js', 'utf8')

//
// 👇 Let's find out which eslint rules are specified
//    in the config.
//
const rules = await pipe(
  // 👇 parse the config as JS to AST
  js(config),

  // 👇 select linting rules
  select(`
    export property[name=rules]
    > value > object > property > key > *
  `),

  // 👇 get all of the names of the rules
  all(),
)

console.log(rules)
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

`affe` transforms objects to a DOM-inspired format, so you can query them with CSS-like selectors. This can be paired with parsers of differnt languages to conveniently inspect code written in said language.

`affe` provides out-of-the-box support for JS/JSX (using [espree](https://github.com/eslint/espree)):

```js
import { jsx, pipe, select, pick, all } from 'affe'

const code = jsx`
  export default ({ name, style }) => (
    <div className={style}>Hello, {name}!</div>
  )
`

//
// 👇 Let's find out the name of the properties
//    of the exported component.
//
const params = pipe(
  code,
  select('export params property key *'),
  pick(node => node.name ?? node.value),
  all(),
)

console.log(params)
// > [name, style]
```

<br>

👉 Use `tag` to create a language tag for any other language:

```js
import * as csstree from 'css-tree'
import { tag } from 'affe'


export const css = tag({
  parse: csstree.parse,
})
```
Which can then be used like this:
```js
import { css } from './css'
import { pipe, select, pick, all } from 'affe'


const code = css`
  .foo {
    color: red;
  }

  .bar {
    color: blue;
  }
`

const classes = await pipe(
  code,
  select('ClassSelector'),
  pick(node => node.name),
  all(),
)

console.log(classess)
// > [ foo, bar ]
```

<div align="right">

[**▷ TRY IT**](https://codepen.io/lorean_victor/pen/xxmqppz?editors=0010)

</div>

👉 Use `query` to inspect any object:

```js
import { pipe, query, select, pick, first } from 'affe'

const graph = {
  vertices: [
    {
      id: 'a',
      label: 'Node A',
      edges: [
        { to: 'a', label: 'loopback' },
        { to: 'b' }
      ]
    },
    {
      id: 'b',
      label: 'Node B',
      edges: [
        { to: 'a' }
      ]
    }
  ]
}


// 👇 lets find a node with a labeled edge
const label = await pipe(
  query(() => graph),
  select('node:has(>edges [label])'),
  pick(node => node.label),
  first(),
)

console.log(label)
// > Node A

// 👇 now lets find nodes with an
//    unlabeled edge going to them
const ids = await pipe(
  query(() => graph),
  select('edges :not([label])'),
  pick(node => node.to),
  all(),
)

console.log(ids)
// > [ a, b ]
```

<div align="right">

[**▷ TRY IT**](https://codepen.io/lorean_victor/pen/MWZprqE?editors=0010)

</div>

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
