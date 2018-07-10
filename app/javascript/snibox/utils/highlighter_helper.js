import _ from 'lodash'
import hljs from 'highlight.js'
import { getPropertyOrDefault } from './tools'

const hljsModesMatrix = {
  automatically: '',
  c: 'cpp',
  html: 'xml'
}

export const highlightMarkdownCodeBlocks = (component) => {
  if (_.isEqual(component.$store.state.labelSnippets.active.language, 'markdown')) {
    component.$el.querySelectorAll('pre code[class]').forEach((block, i) => {
      hljs.highlightBlock(block);
    })
  }
}

export const processHljsMode = (mode) => {
  return getPropertyOrDefault(hljsModesMatrix, mode)
}
