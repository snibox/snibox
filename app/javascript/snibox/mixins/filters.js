import _ from 'lodash'

export default {
  filters: {
    clean(value) {
      if (value.length < 25) return value
      return value.substring(0, 22) + '...'
    },

    capitalize(value) {
      return _.upperFirst(value)
    }
  }
}
