<script>
  export default {
    name: 'VabRow',

    props: {
      gutter: {
        type: Number,
        default: null,
      },
      justify: {
        type: String,
        default: 'start',
      },
      align: {
        type: String,
        default: null,
      },
    },

    render() {
      return (
        <el-row
          type="flex"
          gutter={this.gutter}
          justify={this.justify}
          align={this.align}
          style="flex-wrap:wrap"
        >
          {this.$slots.default}
        </el-row>
      )
    },
  }
</script>
