import { define, useDispatch, onRendered } from 'https://esm.sh/minicomp'
import { html } from 'https://esm.sh/rehtm'
import style from './tree-view.css?inline'


const bchar = (index, arr) => {
  if (index === arr.length - 1) {
    return '┗━'
  } else {
    return ' ━'
  }
}


define('tree-view', ({ node }) => {
  const dispatch = useDispatch('highlight')
  const relay = event => dispatch(event.detail)

  onRendered(host => {
    const el = document.createElement('style')
    el.textContent = style
    host.shadowRoot.appendChild(el)
  })

  if (Array.isArray(node)) {
    return html`
      <ul>
        ${node.map((n, i, l) => html`
          <li>
            <b>${bchar(i, l)}</b>
            <tree-view node=${n} onhighlight=${relay}></tree-view>
          </li>`)}
      </ul>
    `
  } else if (typeof node === 'object') {
    const highlight = () => {
      if (node.range) {
        dispatch(node.range)
      } else if (node.children && node.children.length === 1 && node.children[0].range) {
        dispatch(node.children[0].range)
      }
    }

    return html`
      <details>
        <summary onmouseover=${highlight}>
         ${node.type || ''}
        </summary>
          ${
  Object.entries(node)
    .filter(([key]) => key !== 'type' && key !== 'range' && key !== 'children')
    .map(([key, value]) => html`
              <div>
              <label>${key}:</label> <span type=${typeof value}>${value ?? '??'}</span>
              </div>
            `)}
        ${
  (node.children && node.children.length > 0) ?
    html`<tree-view node=${node.children} onhighlight=${relay}></tree-view>`
    : '' }
      </details>
    `
  }
})
