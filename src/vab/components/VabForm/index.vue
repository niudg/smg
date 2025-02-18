<template>
  <el-form
    ref="form"
    class="dpform"
    v-bind="$attrs"
    :size="$attrs['size'] ? $attrs['size'] : 'mini'"
    :label-position="
      $attrs['label-position'] ? $attrs['label-position'] : 'right'
    "
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <slot />
  </el-form>
</template>

<script>
  export default {
    name: 'VabForm',
    props: {
      model: {
        type: Object,
        default: () => {},
      },
      rules: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      validate(callback) {
        return this.$refs['form'].validate(callback)
      },
      validateField(props, cb) {
        return this.$refs['form'].validateField(props, cb)
      },
      resetFields() {
        return this.$refs['form'].resetFields()
      },
      clearValidate(props = []) {
        return this.$refs['form'].clearValidate(props)
      },
      validateTable() {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  .dpform ::v-deep {
    .el-form-item--mini.el-form-item {
      margin: 5px 0;
      .el-form-item--mini.el-form-item {
        margin: 0;
      }
    }

    .is-error {
      .el-form-item__error {
        font-size: 10px !important;
        position: inherit;
      }
    }

    // .is-success {
    //   animation: sucvalid 0.5s;
    //   animation-fill-mode: forwards;
    // }

    // @keyframes errvalid {
    //   from {
    //     margin-bottom: 5px;
    //   }
    //   to {
    //     margin-bottom: 10px;
    //   }
    // }
    // @keyframes sucvalid {
    //   from {
    //     margin-bottom: 10px;
    //   }
    //   to {
    //     margin-bottom: 5px;
    //   }
    // }
  }
</style>
