import { TransformerRule } from '../../transformer'


// TODO: to be completed from
// https://esprima.readthedocs.io/en/latest/syntax-tree-format.html


export const rules: TransformerRule[] = [
  [/Program/, ({ body, ...node }) => ({ ...node, type: 'program', children: body })],
  [/BlockStatement/, ({ body, ...node }) => ({ ...node, type: 'block', children: body })],
  [/ExpressionStatement/, ({ expression, ...node }) => ({ ...node, type: 'expression', children: [expression] })],

  // expressions

  [/ThisExpression/, node => ({ ...node, type: 'this' })],
  [/Identifier/, node => ({ ...node, type: 'identifier' })],
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
  [/FunctionExpression/,
    ({ id, ...node }) =>
      ({ id, ...node, type: 'function', kind: 'expression', name: id?.name })
  ],

  // patterns

  [/ArrayPattern/, ({ elements, ...node }) => ({ ...node, type: 'pattern', kind: 'array', children: elements })],
  [/ObjectPattern/, ({ properties, ...node }) => ({ ...node, type: 'pattern', kind: 'object', children: properties })],

  // declarations
  [/VariableDeclaration/, ({ declarations, ...node}) => ({ ...node, type: 'var', children: declarations })],
  [/VariableDeclarator/, node => ({ ...node, type: 'declarator', name: node?.id?.name  })],
  [/FunctionDeclaration/,
    ({ id, ...node }) =>
      ({ id, ...node, type: 'function', kind: 'declaration', name: id?.name })
  ],

  // exports
  [/ExportAllDeclaration/, node =>
    ({ ...node, type: 'export', kind: 'all', from: node.source.value })
  ],
  [/ExportDefaultDeclaration/,
    ({ declaration, ...node }) =>
      ({ ...node, type: 'export', kind: 'default', children: [declaration] })
  ],
  [/ExportNamedDeclaration/,
    ({declaration, specifiers, ...node }) =>
      ({ ...node, type: 'export', kind: 'named', children: [declaration, ...specifiers], from: node.source?.value })
  ],
  [/ExportSpecifier/, (node) => ({ ...node, type: 'specifier' })],

  // imports
  [/ImportDeclaration/,
    ({ specifiers, ...node}) => ({
      ...node, type: 'import', children: specifiers,
      from: node.source.value
    })],
  [/ImportSpecifier/, node => ({ ...node, type: 'specifier' })],
  [/ImportDefaultSpecifier/, node => ({ ...node, type: 'specifier', kind: 'default' })],
  [/ImportNamespaceSpecifier/, node => ({ ...node, type: 'specifier', kind: 'namespace' })],
]
