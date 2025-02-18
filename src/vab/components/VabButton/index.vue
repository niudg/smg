<template>
  <div v-if="btnList.length > 0" class="btn_main flex_start">
    <template v-for="(btn, index) in btnList">
      <template v-if="btn.showBtn">
        <div
          v-if="showPermise(btn)"
          :key="index"
          class="btn_box"
          :class="[
            btn.type == 'plain' ? 'borde_btn' : '',
            btn.disabled ? 'boxDisable' : '',
            btn.name == 'キャンセル' ? 'cancelColor' : '',
          ]"
          :style="{
            '--bg-color': btn.bg ? btn.bg : null,
            '--hover-color': btn.hover,
            '--default-color': btn.defaultColor,
            'min-width': btn.minWidht ? btn.minWidht + 'px' : '104px',
            width: btn.widht == 'auto' ? btn.widht : btn.widht + 'px',
            paddingLeft: btn.widht == 'auto' ? '7px' : 0,
            paddingRight: btn.widht == 'auto' ? '7px' : 0,
          }"
          @click="open(btn)"
        >
          {{ btn.show }}
          <div class="flex_start icon_box">
            <svg-icon
              v-if="btn.icon"
              :icon-class="btn.icon"
              class="iconName"
              :style="{
                fontSize: btn.iconFont ? btn.iconFont + '!important' : '18px',
              }"
            ></svg-icon>
            <span class="btnname">{{ btn.name }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-if="!btn.hidden"
          :key="index"
          v-permissions="btn.permissions"
          class="btn_box"
          :class="[
            btn.type == 'plain' ? 'borde_btn' : '',
            btn.disabled ? 'boxDisable' : '',
            btn.name == 'キャンセル' ? 'cancelColor' : '',
          ]"
          :style="{
            '--bg-color': btn.bg ? btn.bg : null,
            '--hover-color': btn.hover,
            '--default-color': btn.defaultColor,
            'min-width': btn.minWidht ? btn.minWidht + 'px' : '104px',
            width: btn.widht == 'auto' ? btn.widht : btn.widht + 'px',
            paddingLeft: btn.widht == 'auto' ? '7px' : 0,
            paddingRight: btn.widht == 'auto' ? '7px' : 0,
          }"
          @click="open(btn)"
        >
          {{ btn.show }}
          <div class="flex_start icon_box">
            <svg-icon
              v-if="btn.icon"
              :icon-class="btn.icon"
              class="iconName"
              :style="{
                fontSize: btn.iconFont ? btn.iconFont + '!important' : '18px',
              }"
            ></svg-icon>
            <span class="btnname">{{ btn.name }}</span>
          </div>
        </div>
      </template>
    </template>
  </div>
  <div
    v-else
    class="el-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      'el-button--' + ($attrs.type || 'primary'),
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
    @click="debounceHandle"
  >
    <i v-if="loading" class="el-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>

<script>
  import { handleEventList } from '@/utils/eventListHandler'
  import { vueDebounce } from '@/utils/index'
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabButton',
    mixins: [mixins],
    inject: {
      vm: { default: '' },
      page: { default: '' },
      elForm: {
        default: '',
      },
      elFormItem: {
        default: '',
      },
    },
    props: {
      btnList: {
        type: Array,
        default: () => [],
      },
      row: {
        type: Object,
        default: () => {},
      },
      size: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      nativeType: {
        type: String,
        default: 'button',
      },
      loading: {
        type: Boolean,
        default: false,
      },
      skipDisabled: {
        type: Boolean,
        default: false,
      },
      plain: {
        type: Boolean,
        default: false,
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      round: {
        type: Boolean,
        default: false,
      },
      circle: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      showPermise() {
        return (row) => {
          return row.showBtnDef && !row.hidden
        }
      },

      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
      },
      buttonDisabled() {
        if (this.$route?.query.type == 'view') {
          return !this.skipDisabled
        }
        return this.disabled
      },
    },

    methods: {
      open(row) {
        if (row.disabled) return
        if (this.$baseLodash.isEmpty(row.msg)) {
          // row.click && row.click(row)
          handleEventList(
            'click',
            {
              page: this.page,
              vm: this,
            },
            {
              ...row,
              row: this.row,
            }
          )
          return
        }
        this.$confirm({
          msg: row.msg,
          yesText: row.msgOk ? row.msgOk : row.name,
          yesColor: row.bg
            ? row.bg != '#EFEFEF'
              ? row.bg
              : '#0060c2'
            : '#0060c2',
          msgWidth: row.msgWidth ? row.msgWidth : '104px',
          yes: () => {
            if (this.row) {
              let data = this.$baseLodash.clone(this.row)
              this.$delete(data, 'btnList')
              row.rowData = data
            }
            // row.click && row.click(row)
            handleEventList(
              'click',
              {
                page: this.page,
                vm: this,
              },
              {
                ...row,
                row: this.row,
              }
            )
            if (this.vm && this.vm[row.submitMethod]) {
              this.vm[row.submitMethod](row)
            }
          },
        })
      },
      debounceHandle: vueDebounce('handleClick'),
      handleClick(evt) {
        if (this.buttonDisabled) {
          return
        }
        handleEventList(
          'click',
          {
            page: this.page,
            vm: this,
          },
          {
            eventList: this.$attrs['event-list'],
          }
        )
        this.$emit('click', { event: evt, attrs: this.$attrs })
      },
    },
  }
</script>

<style lang="scss" scoped>
  $bgColor: var(--bg-color, #0060c2);
  $hoverColor: var(--hover-color, #0171ee);
  $defaultColor: var(--default-color, #fff);
  .btn_main :last-child {
    margin-right: 0px !important;
  }
  .btn_box {
    width: 104px;
    height: 32px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 104px;
    cursor: pointer;
    color: $defaultColor;
    margin-right: 8px;
    @if ($bgColor) {
      background: $bgColor;
    } @else {
      background: #0060c2;
    }
    &:hover {
      @if $hoverColor {
        background: $hoverColor;
      } @else {
        background: #0171ee;
      }
    }
    &.borde_btn {
      background: #fff;
      border: 1px solid $defaultColor;
      color: $defaultColor;
      &:hover {
        border: 1px solid $hoverColor;
        color: $hoverColor;
      }
    }
    &.boxDisable {
      background: #efefef !important;
      border-color: #cecece !important;
      color: #a1a1a1;
      cursor: not-allowed;
      &:hover {
        color: #a1a1a1;
        cursor: default !important;
      }
    }
    .icon_box {
      align-items: center;
      .btnname {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
      }
      .iconName {
        font-size: 15px;
        margin-right: 5px;
      }
    }
  }
  .no_margin .btn_box {
    margin-left: 0;
  }

  .cancelColor {
    background: #ffffff;
    color: #848484;
    &:hover {
      background: #f7f7f7;
      color: #a1a1a1;
    }
  }
</style>
