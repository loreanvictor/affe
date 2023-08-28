/* global CodeMirror */

const attachEditor = (el, mode) => {
  const editor = CodeMirror.fromTextArea(el, { mode, lineNumbers: true, theme: 'material', matchBrackets: true })
  editor.on('change', () => {
    el.value = editor.getValue()
    const event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    })
    el.dispatchEvent(event)
    editor.getAllMarks().forEach(mark => mark.clear())
  })

  return editor
}

const code = attachEditor(document.querySelector('#code'), 'javascript')

self.highlight = (start, end) => {
  code.getAllMarks().forEach(mark => mark.clear())
  code.markText(code.posFromIndex(start), code.posFromIndex(end), {
    className: 'hovered-code'
  })
}


attachEditor(document.querySelector('#query'), 'css')