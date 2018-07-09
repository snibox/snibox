import { getPropertyOrDefault } from './tools'

const hljsModesMatrix = {
  automaticaly: '',
  c: 'cpp',
  html: 'xml'
}

export const processHljsMode = (mode) => {
  return getPropertyOrDefault(hljsModesMatrix, mode)
}
