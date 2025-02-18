import { convertToRules } from '@/utils/validate'
import mixActionButton from '@/utils/mixActionButton'
import _ from 'lodash'
export default {
  inject: {
    pageComponent: {
      default: '',
    },
    tableRoot: {
      default: '',
    },
  },
  mixins: [mixActionButton],
  data() {
    return {
      loading: true,
      localDisabled: false,
    }
  },
  props: {
    prop: {
      type: String,
      default: null,
    },
    column: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {},
    },
    valueId: {
      type: [String, Number],
      default: 'value',
    },
    labelId: {
      type: [String, Number],
      default: 'text',
    },
    row: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    explainValidate() {
      let rules = this.config.rules || []
      if (this.config.validate) {
        const result = convertToRules(
          this.config.validate,
          this.column?.label,
          this.config.type ?? 'string',
          this.config.trigger ?? ['change', 'blur']
        )

        //解析 validate
        rules = _.concat(this.config.rules || [], result.rules)
      }
      return rules
    },

    getDisabled() {
      let disabled = false

      if (this.$const.viewMode.includes(this.$route?.query.type)) {
        disabled = true
      } else {
        if (this.column?.disabled) {
          disabled = true
        } else {
          if (this.config?.disabled) {
            if (this.$baseLodash.isFunction(this.config?.disabled)) {
              disabled = this.config.disabled(this.row, this.prop)
            } else {
              disabled = this.config.disabled
            }
          }
        }
      }
      return disabled
    },
    validate(cb) {
      this.$children[0].validate('', cb)
    },
    resetField() {
      this.$children[0].resetField()
    },
    clearValidate() {
      this.$children[0].clearValidate()
    },
  },
}
