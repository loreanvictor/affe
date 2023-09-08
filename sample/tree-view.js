import { define, useDispatch, onRendered } from 'https://esm.sh/minicomp?bundle'
import { html, ref } from 'https://esm.sh/rehtm?bundle'
import { useObservation } from './use-observation'
import style from './tree-view.css?inline'


const bchar = (index, arr) => {
  if (index === arr.length - 1) {
    return '┗━'
  } else {
    return ' ━'
  }
}


const contains = (node, index) => {
  if (index) {
    if (node.range && node.range[0] <= index && node.range[1] >= index) {
      return true
    } else if (node.children) {
      return node.children.some(child => contains(child, index))
    }
  }

  return false
}


define('tree-view', ({ node, cursor }) => {
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
            <tree-view node=${n} cursor=${cursor} onhighlight=${relay}></tree-view>
          </li>`)}
      </ul>
    `
  } else if (typeof node === 'object') {
    const summary = ref()
    const details = ref()

    const highlight = () => {
      if (node.range) {
        dispatch(node.range)
      } else if (node.children && node.children.length === 1 && node.children[0].range) {
        dispatch(node.children[0].range)
      }
    }

    if (cursor) {
      useObservation($ => {
        if (summary.current && contains(node, $(cursor))) {
          summary.current.classList.add('hovered')
          details.current.classList.add('hovered')
          details.current.open = true
          details.current.scrollIntoView({ block: 'nearest' })
        } else {
          summary.current.classList.remove('hovered')
          details.current.classList.remove('hovered')
          details.current.open = false
        }
      })
    }

    const props = Object.entries(node).filter(([key]) => key !== 'type' && key !== 'range' && key !== 'children')

    return html`
      <details ref=${details}>
        <summary onmouseover=${highlight} ref=${summary}>
         ${node.type || ''}
        </summary>
          ${
  props.map(([key, value]) => html`
              <div>
              <label>${key}:</label> <span type=${typeof value}>${value ?? '??'}</span>
              </div>
            `)}
        ${
  (node.children && node.children.length > 0) ?
    html`<tree-view node=${node.children} cursor=${cursor} onhighlight=${relay}></tree-view>`
    : '' }
        ${
  node.children && node.children.length === 0 && props.length === 0
    ? html`<span class="empty">empty</span>`
    : ''}
      </details>
    `
  }
})
