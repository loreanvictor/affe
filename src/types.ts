export type Props = Record<string, unknown>
export interface Node extends Props {
  type: string
  children?: Node[]
}

