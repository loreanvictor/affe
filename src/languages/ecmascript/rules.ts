import { TransformerRule } from '../../transformer'


// TODO: to be completed from
// https://esprima.readthedocs.io/en/latest/syntax-tree-format.html


export const rules: TransformerRule[] = [
  [/Program/, node => ({type: 'program', children: node.body })],

  // expressions

  [/ThisExpression/, () => ({ type: 'this' })],
  [/Identifier/, node => ({ ...node, type: 'id' })],
  [/Literal/, node => ({ ...node, type: 'literal' })],
  [/ArrayExpression/, node => ({ type: 'array', children: node.elements })],
  [/ObjectExpression/, node => ({ type: 'object', children: node.properties })],
  [/Property/, node => ({...node, type: 'property', name: node.key?.name ?? node.key?.value })],

  // exports
  [/ExportAllDeclaration/, () => ({ type: 'export', kind: 'all' })],
  [/ExportDefaultDeclaration/, node => ({ type: 'export', kind: 'default', children: [node.declaration] })],
  [/ExportNamedDeclaration/, node => ({ ...node, type: 'export', kind: 'named', children: [node.declaration] })],
]
