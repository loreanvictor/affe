import { observe } from 'https://esm.sh/quel'
import { onConnected, onDisconnected } from 'https://esm.sh/minicomp'


export function useObservation(...args) {
  let observation = null

  onConnected(() => observation = observe(...args))
  onDisconnected(() => observation?.stop())
}
