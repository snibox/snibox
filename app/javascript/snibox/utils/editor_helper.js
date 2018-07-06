import MobileDetect from 'mobile-detect'
import { tabletWidth } from './variables'
import { getPropertyOrDefault } from '../utils/tools'

const editorModesMatrix = {
  bash: 'shell',
  c: 'text/x-csrc',
  cpp: 'text/x-c++src',
  cs: 'text/x-csharp',
  html: 'text/html',
  java: 'text/x-java',
  less: 'css',
  objectivec: 'text/x-objectivec',
  scss: 'sass'
}

export const processEditorMode = (mode) => {
  return getPropertyOrDefault(editorModesMatrix, mode)
}

// ios safari 100vh fix
export const processIosEditorHeight = () => {
  return new MobileDetect(window.navigator.userAgent).userAgent() === 'Safari'
      && document.querySelector('body').offsetWidth > tabletWidth
}
