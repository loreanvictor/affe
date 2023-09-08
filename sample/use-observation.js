import { observe } from 'https://esm.sh/quel?bundle'
import { onConnected, onDisconnected } from 'https://esm.sh/minicomp?bundle'


export function useObservation(...args) {
  let observation = null

  onConnected(() => observation = observe(...args))
  onDisconnected(() => observation?.stop())
}
