import { Node, Props } from './types'


export type Transformer = (node: any) => Node

export interface BuildSelectableOptions {
  transformer?: (n: any) => Node
  keep?: (n: any) => string[]
}


const _DefaultTransformer = (n: any) => n
const _DefaultKeep = () => ['range']


function _selectable(
  u: typeof import('unist-builder').u,
  tree: any,
  options: BuildSelectableOptions,
): Node {
  const transformer = options.transformer ?? _DefaultTransformer
  const keep = options.keep ?? _DefaultKeep

  const target = transformer(tree)
  const kept = keep(tree)

  if (typeof target === 'object') {
    const type = target.type ?? 'node'
    const props: Props = {}
    const children = [...(target.children ?? [])]

    Object.entries(target)
      .filter(([key]) => key !== 'type' && key !== 'children')
      .forEach(([key, value]) => {
        if (kept.includes(key) || typeof value !== 'object') {
          props[key] = value
        }
        else {
          if (value) {
            children.push({
              type: key,
              ...(
                value['type'] ? { children: [value] } :
                  Array.isArray(value) ? { children: value } :
                    value
              )
            })
          }
        }
      })

    return u(type, props, children.filter(child => !!child).map(child => _selectable(u, child, options)))
  } else {
    return u('node', { value: target })
  }
}


export async function selectable(tree: any, options: BuildSelectableOptions = {}): Promise<Node> {
  const { u } = await import('unist-builder')

  return _selectable(u, tree, options)
}
