export type Props = Record<string, unknown>
export interface Node extends Props {
  type: string
  children?: Node[]
}

export type Query<Meta> = {
  resolve: () => Promise<Node[]>
  meta: Meta
}
