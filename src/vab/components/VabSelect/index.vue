<template>
  <el-form-item
    v-if="$attrs['prop']"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-select
      :id="$attrs['prop']"
      v-model="innerValue"
      v-bind="$attrs"
      v-select="{
        value: innerValue,
        list: options,
        directive: directive,
      }"
      class="vab_select"
      :popper-class="textEllipsis ? 'optionsContent' : ''"
      :disabled="$attrs['disabled'] || localDisabled"
      @focus="handleFocus"
      @change="onChange"
      @clear="onClear"
    >
      <!-- 文字超過モード -->
      <template v-if="textEllipsis">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.label"
            :disabled="item.label.length < 13"
            placement="right"
          >
            <span>{{ item.label }}</span>
          </el-tooltip>
        </el-option>
      </template>
      <template v-else>
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
          <slot :item="item"></slot>
        </el-option>
      </template>
    </el-select>
    <template #error="{ error }">
      <el-tooltip class="item" effect="dark" :content="error" placement="left">
        <div
          class="el-form-item__error"
          :class="{ error_box: $attrs['error'] == 'true' }"
        >
          {{ error }}
        </div>
      </el-tooltip>
    </template>
  </el-form-item>
  <el-form-item
    v-else
    :label-width="$attrs['label-width']"
    :label="$attrs['label']"
  >
    <el-select
      v-bind="$attrs"
      v-model="innerValue"
      :disabled="$attrs['disabled'] || localDisabled"
      class="vab_select"
      @change="onChange"
      @clear="onClear"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabSelect',
    componentName: 'VabSelect',
    directives: {
      select: {
        update: function (el, binding) {
          setTimeout(() => {
            if (!binding.value.directive) return
            const defaultValues = binding.value.value
            if (defaultValues) {
              const tags = el.querySelectorAll('.el-tag__close')
              tags.forEach((item) => {
                if (defaultValues.length == 1) {
                  item.style.display = 'none'
                } else {
                  item.style.display = 'block'
                }
              })
            }
          }, 0)
        },
      },
    },
    mixins: [mixins],
    props: {
      display: {
        type: String,
        default: null,
      },
      refProp: {
        type: String,
        default: null,
      },
      refField: {
        type: String,
        default: null,
      },
    },

    data() {
      return {
        options: [],
      }
    },

    computed: {
      effect: {
        get: function () {
          if (this.refProp) {
            return this.$baseLodash.get(this.form.model, this.refProp)
          }
          return null
        },
      },
    },

    watch: {
      effect: {
        handler(val) {
          this.onClear()
          if (this.refField) {
            if (!val) {
              this.localDisabled = true
            } else {
              this.localDisabled = false
            }
            let list = this.$baseLodash.filter(this.dataSource, {
              [this.refField]: val,
            })

            this.fillList(list)
          }
        },
        immediate: true,
      },
    },
    created() {
      this.trigger = 'change'
      this.fetchData()
    },
    methods: {
      handleValueIds(item, valueId) {
        let vals = []
        valueId.split(',').map((id) => {
          vals.push(item[id])
        })
        return vals.join('|')
      },

      fillList(list) {
        if (list && list.length > 0) {
          this.options = []
          list.forEach((item) => {
            this.options.push({
              label: this.handleValueIds(item, this.labelId),
              value: this.handleValueIds(item, this.valueId),
              disabled: item?.disabled,
              display: this.display ? item[this.display] : item[this.labelId],
              data: item,
            })
          })
        } else {
          this.options = []
        }
      },
      onChange(value) {
        this.handleChange(value)
      },
      onClear() {
        this.handleChange(null)
      },
      setValueMore(val1, val2) {
        setTimeout(() => {
          this.innerValue = [val1, val2]
        }, 0)
      },
      setValue(val) {
        setTimeout(() => {
          this.innerValue = val
        }, 0)
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '@/vab/styles/component.scss';
</style>
