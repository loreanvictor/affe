/* global CodeMirror */

const attachEditor = (el, mode) => {
  const editor = CodeMirror.fromTextArea(el, {
    mode,
    lineNumbers: true,
    theme: 'material',
    matchBrackets: true
  })
  editor.on('change', () => {
    el.value = editor.getValue()
    const event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    })
    el.dispatchEvent(event)
    editor.getAllMarks().forEach(mark => mark.clear())
  })

  editor.on('cursorActivity', () => {
    const cursor = code.getCursor()
    const index = code.indexFromPos(cursor)
    const event = new Event('cursor', {
      'bubbles': true,
      'cancelable': true
    })
    event.index = index
    event.line = cursor.line + 1
    event.ch = cursor.ch + 1
    el.dispatchEvent(event)
    editor.getAllMarks().forEach(mark => mark.clear())
  })

  return editor
}

const code = attachEditor(document.querySelector('#code'), 'jsx')

self.highlight = (start, end) => {
  code.getAllMarks().forEach(mark => mark.clear())
  code.markText(code.posFromIndex(start), code.posFromIndex(end), {
    className: 'hovered-code'
  })
}

self.error = (err) => {
  code.getAllMarks().forEach(mark => mark.clear())
  code.markText(code.posFromIndex(err.index), code.posFromIndex(err.index + 1), {
    className: 'error-code'
  })
}

attachEditor(document.querySelector('#query'), 'css')
