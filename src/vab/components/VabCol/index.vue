<script>
  export default {
    name: 'VabCol',

    props: {
      span: {
        type: Number,
        default: null,
      },
      tag: {
        type: String,
        default: 'div',
      },
      offset: {
        type: Number,
        default: null,
      },
      pull: {
        type: Number,
        default: null,
      },
      push: {
        type: Number,
        default: null,
      },
      xs: {
        type: [Number, Object],
        default: () => ({}),
      },
      sm: {
        type: [Number, Object],
        default: () => ({}),
      },
      md: {
        type: [Number, Object],
        default: () => ({}),
      },
      lg: {
        type: [Number, Object],
        default: () => ({}),
      },
      xl: {
        type: [Number, Object],
        default: () => ({}),
      },
    },

    data() {
      return {
        lspan: this.span,
        loffset: this.offset,
        lpull: this.pull,
        lpush: this.push,
        lxs: this.xs,
        lsm: this.lsm,
        lmd: this.md,
        llg: this.lg,
        lxl: this.xl,
      }
    },
    render() {
      //屏幕计算
      // xs	<768px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
      // sm	≥768px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
      // md	≥992px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
      // lg	≥1200px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
      // xl	≥1920px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})

      if (typeof this['span'] !== 'number') {
        //默认分配
        if (typeof this['xl'] !== 'number') {
          this.lxl = 8
        }
        if (typeof this['lg'] !== 'number') {
          this.llg = 8
        }
        if (typeof this['md'] !== 'number') {
          this.lmd = 24
        }
        if (typeof this['sm'] !== 'number') {
          this.lsm = 24
        }
        if (typeof this['xs'] !== 'number') {
          this.lxs = 24
        }
      } else {
        this.lspan = this.span
      }

      return (
        <el-col
          span={this.lspan}
          offset={this.loffset}
          pull={this.lpull}
          xs={this.lxs}
          sm={this.lsm}
          md={this.lmd}
          lg={this.llg}
          xl={this.lxl}
        >
          {this.$slots.default}
        </el-col>
      )
    },
  }
</script>
