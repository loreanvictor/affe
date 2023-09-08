import { from, observe, Subject } from 'https://esm.sh/quel?bundle'
import { html } from 'https://esm.sh/rehtm?bundle'

import { jsx, js, tag, pipe, select, all } from '../src'


const raw = tag({ parse: async code => JSON.parse(code) })

const result = document.querySelector('#result')
const code = from(document.querySelector('#code'))
const query = from(document.querySelector('#query'))
const cursor = from(document.querySelector('#code'), 'cursor')
const index = $ => $(cursor)?.index

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
  try {
    const node = await pipe(
      $(parsed),
      select($(query)),
      all
    )

    result.innerHTML = ''
    result.appendChild(html`
      <tree-view
        node=${node}
        cursor=${index}
        onhighlight=${event => window.highlight(...event.detail)}
      />
    `)
  } catch(err) {
    window.error(err)
    result.innerHTML = ''
    result.appendChild(html`<pre class='error'>${err.message}</pre>`)
  }
})

observe($ =>
  document.querySelector('#cursor').textContent =
    'ln ' + ($(cursor)?.line ?? '-') + ', col ' + ($(cursor)?.ch ?? '-')
)
