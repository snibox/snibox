import hljs from 'highlight.js'
import { getPropertyOrDefault } from './tools'

const hljsModesMatrix = {
  automaticaly: '',
  c: 'cpp',
  html: 'xml'
}

export const syncHljsTabs = (component) => {
  hljs.configure({tabReplace: ' '.repeat(component.$store.state.labelSnippets.active.tabs)})
}

export const processHljsMode = (mode) => {
  return getPropertyOrDefault(hljsModesMatrix, mode)
}
