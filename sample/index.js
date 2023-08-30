import { from, observe } from 'https://esm.sh/quel'
import { html } from 'https://esm.sh/rehtm'

import { jsx } from '../src'


const result = document.querySelector('#result')
const code = from(document.querySelector('#code'))
const query = from(document.querySelector('#query'))

const parsed = $ => jsx($(code) ?? '')

observe(async $ => {
  const { selectAll } = $(parsed)
  try {
    const tree = await selectAll($(query))
    const node = await Promise.all(tree.map(selected => selected.node()))
    result.innerHTML = ''
    result.appendChild(html`<tree-view node=${node} onhighlight=${event => window.highlight(...event.detail)} />`)
  } catch(err) {
    window.error(err)
    result.innerHTML = ''
    result.appendChild(html`<pre class='error'>${err.message}</pre>`)
  }
})
