import { from, observe } from 'https://esm.sh/quel'
import { html } from 'https://esm.sh/rehtm'

import { esselector } from '../src'


const result = document.querySelector('#result')
const code = from(document.querySelector('#code'))
const query = from(document.querySelector('#query'))

const select = async $ => {
  return (await esselector($(code) ?? '')).selectAll
}

observe($ => {
  const s = $(select)
  if (s) {
    const tree = s($(query))
    result.innerHTML = ''
    result.appendChild(html`<tree-view node=${tree} onhighlight=${event => window.highlight(...event.detail)} />`)
  }
})
