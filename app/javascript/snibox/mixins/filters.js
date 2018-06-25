import _ from 'lodash'

const SETTINGS = Object.freeze({
  textLength: {
    short: 13,
    medium: 14,
    long: 19
  }
})

export default {
  filters: {
    // DEPRECATED: length now controlled by css
    setMaxLength(value, type) {
      if (value.length < SETTINGS.textLength[type]) return value
      return value.substring(0, SETTINGS.textLength[type] - 1) + '...'
    },

    capitalize(value) {
      return _.upperFirst(value)
    }
  }
}
