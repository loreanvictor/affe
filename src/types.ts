export type Props = Record<string, unknown>
export interface Node extends Props {
  type: string
  children?: Node[]
}

export type Query<Meta, Out=Node> = {
  resolve: () => Promise<Out[]>
  meta: Meta
}
