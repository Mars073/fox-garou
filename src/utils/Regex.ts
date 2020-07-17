const IS_EMPTY = /^\s*$/
const IS_UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){4}[0-9a-f]{8}$/i
const IS_USERNAME = /^[a-z0-9_\- ]{2,16}$/

function toHTMLPattern (regex: RegExp) {
  let pattern = regex.toString()
  pattern = pattern
    .replace(/^\/\^/, '')
    .replace(/\$\/$/, '')
    .replace(/\/$/, '.*')
    .replace(/^\//, '.*')
  // todo : fix more complexe patterns
  return pattern
}

const _default = {
  IS_EMPTY,
  IS_UUID,
  IS_USERNAME,
  toHTMLPattern
}

export default _default
