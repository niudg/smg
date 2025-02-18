<template>
  <div class="coll_main">
    <div class="coll_main mt8" :class="fold ? 'mess_mb8' : ''">
      <div class="flex_colum coll_box">
        <div class="show_box flex_center flex_auto" @click="handleFold">
          <span class="show_title">{{ localTitle }}</span>
          <svg-icon
            icon-class="arrow_bottom"
            class="show_img"
            :class="{ rote: !fold }"
          ></svg-icon>
        </div>
        <div :class="{ dot_box: dot && !fold }"></div>
      </div>
    </div>
    <div v-show="!fold" class="mt8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VabCollapse',
    props: {
      dot: {
        type: Boolean,
        default: false,
      },
      tfold: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        fold: true, // true 折疊 false 展開
        localTitle: this.title,
      }
    },
    mounted() {
      if (this.title == 'カレンダーを閉じる') {
        this.fold = false
      } else if (this.title == 'コメント履歴を閉じる') {
        this.fold = false
      } else if (this.title == '詳細検索を閉じる') {
        this.fold = true
      }
    },
    methods: {
      handleFold() {
        this.fold = !this.fold
        if (!this.dot) {
          this.$baseEventBus.$emit('resetTableHeight')
        }
        if (this.title === '削除済みの作業日程を表示') {
          this.localTitle =
            this.localTitle === '削除済みの作業日程を表示'
              ? '削除済みの作業日程を閉じる'
              : '削除済みの作業日程を表示'
        }
        if (this.fold) {
          switch (this.title) {
            case '詳細検索を表示':
              this.localTitle = '詳細検索を表示'
              break
            case 'カレンダーを閉じる':
              this.localTitle = 'カレンダーを表示'
              break
            case 'コメント履歴を閉じる':
              this.localTitle = 'コメント履歴を表示'
              break
          }
        } else {
          switch (this.title) {
            case '詳細検索を表示':
              this.localTitle = '詳細検索を閉じる'
              break
            case 'カレンダーを閉じる':
              this.localTitle = 'カレンダーを閉じる'
              break
            case 'コメント履歴を閉じる':
              this.localTitle = 'コメント履歴を閉じる'
              break
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .coll_main {
    box-sizing: border-box;
    width: 100%;
    .dotPading {
      padding: 0 12px;
    }
  }
  .coll_box {
    width: 100%;
  }

  .rote {
    transform: rotate(180deg);
  }
</style>
