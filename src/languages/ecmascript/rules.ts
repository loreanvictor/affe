import { TransformerRule } from '../../transformer'


// TODO: to be completed from
// https://esprima.readthedocs.io/en/latest/syntax-tree-format.html


export const rules: TransformerRule[] = [
  [/Program/, node => ({type: 'program', children: node.body, range: node.range })],

  // expressions

  [/ThisExpression/, node => ({ type: 'this', range: node.range })],
  [/Identifier/, node => ({ ...node, type: 'id' })],
  [/Literal/, node => ({ ...node, type: 'literal' })],
  [/ArrayExpression/, node => ({ type: 'array', children: node.elements, range: node.range })],
  [/ObjectExpression/, node => ({ type: 'object', children: node.properties, range: node.range })],
  [/Property/, node => ({...node, type: 'property', name: node.key?.name ?? node.key?.value })],

  // exports
  [/ExportAllDeclaration/, node => ({ type: 'export', kind: 'all', range: node.range })],
  [/ExportDefaultDeclaration/, node => ({ type: 'export', kind: 'default', children: [node.declaration], range: node.range })],
  [/ExportNamedDeclaration/, node => ({ ...node, type: 'export', kind: 'named', children: [node.declaration], range: node.range })],
]
