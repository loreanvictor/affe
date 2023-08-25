import { from, observe } from 'https://esm.sh/quel'

import { esselector } from '../src'


const result = document.querySelector('pre')
const code = from(document.querySelector('#code'))
const query = from(document.querySelector('#query'))

const select = async $ => (await esselector($(code) ?? '')).selectAll
observe($ => {
  const s = $(select)
  result.innerHTML = s && JSON.stringify(s($(query) ?? ''), null, 2)
})
