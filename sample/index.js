import { from, observe, Subject } from 'https://esm.sh/quel'
import { html } from 'https://esm.sh/rehtm'

import { jsx, js, tag } from '../src'


const raw = tag({ parse: async code => JSON.parse(code) })

const result = document.querySelector('#result')
const code = from(document.querySelector('#code'))
const query = from(document.querySelector('#query'))

const parser = new Subject()
const parsers = { jsx, js, raw }

parser.set(jsx)

const parsed = $ => $(parser)($(code) ?? '')

document.querySelectorAll('[data-parser]').forEach(element => {
  element.addEventListener('click', event => {
    parser.set(parsers[event.target.dataset.parser])
  })
})

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
