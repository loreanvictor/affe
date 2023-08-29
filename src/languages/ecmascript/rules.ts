import { TransformerRule } from '../../transformer'


// TODO: to be completed from
// https://esprima.readthedocs.io/en/latest/syntax-tree-format.html


export const rules: TransformerRule[] = [
  [/Program/, ({ body, ...node }) => ({ ...node, type: 'program', children: body })],

  // expressions

  [/ThisExpression/, node => ({ ...node, type: 'this' })],
  [/Identifier/, node => ({ ...node, type: 'id' })],
  [/Literal/, node => ({ ...node, type: 'literal' })],
  [/ArrayExpression/,
    ({ elements, ...node }) =>
      ({ ...node, type: 'array', children: elements })
  ],
  [/ObjectExpression/,
    ({ properties, ...node }) =>
      ({ ...node, type: 'object', children: properties })
  ],
  [/Property/, node => ({...node, type: 'property', name: node.key?.name ?? node.key?.value })],

  // exports
  [/ExportAllDeclaration/, node => ({ ...node, type: 'export', kind: 'all' })],
  [/ExportDefaultDeclaration/,
    ({ declaration, ...node }) =>
      ({ ...node, type: 'export', kind: 'default', children: [declaration] })
  ],
  [/ExportNamedDeclaration/, node => ({ ...node, type: 'export', kind: 'named', children: [node.declaration], range: node.range })],
]
