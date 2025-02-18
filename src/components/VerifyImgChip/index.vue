<template>
  <div
    class="verify-img-chip"
    :style="{ width: width + 'px' }"
    :class="{ 'is-disabled': disabled }"
  >
    <div class="verify-area">
      <canvas
        ref="canvas"
        :width="width"
        :height="height"
        class="verify-canvas"
      ></canvas>
      <div class="verify-bar" :style="{ background: barBackground }">
        <div
          ref="slider"
          class="verify-button"
          :style="{ left: moveDistance + 'px' }"
          @mousedown="startDrag"
          @touchstart.prevent="startDrag"
        >
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div
          class="verify-bar-area"
          :style="{
            width: moveDistance + 'px',
            background: barSuccessBackground,
          }"
        ></div>
        <span class="verify-text" :style="{ color: textColor }">
          {{ currentText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VerifyImgChip',
    props: {
      width: {
        type: Number,
        default: 320,
      },
      height: {
        type: Number,
        default: 160,
      },
      barHeight: {
        type: Number,
        default: 40,
      },
      defaultText: {
        type: String,
        default: '向右滑动完成验证',
      },
      successText: {
        type: String,
        default: '验证通过',
      },
      failText: {
        type: String,
        default: '验证失败',
      },
      barBackground: {
        type: String,
        default: '#f5f7fa',
      },
      barSuccessBackground: {
        type: String,
        default: '#409eff',
      },
      textColor: {
        type: String,
        default: '#606266',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        moveDistance: 0,
        startX: 0,
        originX: 0,
        currentText: this.defaultText,
        isSuccess: false,
        verifyPosition: 0,
        isDragging: false,
      }
    },
    mounted() {
      this.initCanvas()
    },
    beforeDestroy() {
      // 清理事件监听
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('mouseup', this.endDrag)
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('touchend', this.endDrag)
    },
    methods: {
      initCanvas() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')

        // 清空画布
        ctx.clearRect(0, 0, this.width, this.height)

        // 绘制背景
        ctx.fillStyle = '#edf0f5'
        ctx.fillRect(0, 0, this.width, this.height)

        // 生成随机位置，但不要太靠边
        const minPosition = 60 // 最小位置
        const maxPosition = this.width - 60 // 最大位置
        this.verifyPosition =
          Math.floor(Math.random() * (maxPosition - minPosition)) + minPosition

        // 绘制目标区域
        ctx.fillStyle = '#dcdfe6'
        ctx.beginPath()
        ctx.arc(this.verifyPosition, this.height / 2, 20, 0, Math.PI * 2)
        ctx.fill()

        // 添加目标区域的指示
        ctx.strokeStyle = '#0060c2'
        ctx.setLineDash([5, 5]) // 虚线效果
        ctx.beginPath()
        ctx.moveTo(this.verifyPosition, 0)
        ctx.lineTo(this.verifyPosition, this.height)
        ctx.stroke()

        // 绘制一些随机图形作为干扰
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * this.width
          const y = Math.random() * this.height
          const size = Math.random() * 20 + 10

          ctx.fillStyle = `rgba(220, 223, 230, ${Math.random() * 0.3 + 0.2})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      },
      startDrag(e) {
        if (this.isSuccess || this.disabled) return

        // 触发验证前的处理
        if (this.$listeners['before-verify']) {
          const canVerify = this.$emit('before-verify')
          if (canVerify === false) return
        }

        this.isDragging = true
        this.startX = e.type.includes('mouse')
          ? e.clientX
          : e.touches[0].clientX
        this.originX = this.moveDistance

        document.addEventListener('mousemove', this.moving)
        document.addEventListener('mouseup', this.endDrag)
        document.addEventListener('touchmove', this.moving)
        document.addEventListener('touchend', this.endDrag)
      },
      moving(e) {
        if (!this.isDragging) return

        const eventX = e.type.includes('mouse')
          ? e.clientX
          : e.touches[0].clientX
        const moveX = eventX - this.startX

        this.moveDistance = Math.min(
          Math.max(0, this.originX + moveX),
          this.width - 40
        )
      },
      endDrag() {
        if (!this.isDragging) return

        this.isDragging = false
        document.removeEventListener('mousemove', this.moving)
        document.removeEventListener('mouseup', this.endDrag)
        document.removeEventListener('touchmove', this.moving)
        document.removeEventListener('touchend', this.endDrag)

        // 验证滑块位置
        const buttonPosition = this.moveDistance + 20 // 滑块中心点位置
        const diff = Math.abs(buttonPosition - this.verifyPosition)

        // 放宽验证通过的误差范围到20像素
        if (diff < 20) {
          this.isSuccess = true
          this.currentText = this.successText
          this.$emit('success')
        } else {
          // 如果误差太大，重置并提示失败
          this.reset()
          this.$emit('fail')
        }
      },
      reset() {
        this.moveDistance = 0
        this.originX = 0
        this.currentText = this.defaultText
        this.isSuccess = false
        this.isDragging = false
        this.initCanvas()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .verify-img-chip {
    margin: 0 auto;
    user-select: none; // 防止拖动时选中文字

    .verify-area {
      position: relative;

      .verify-canvas {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 4px 4px 0 0;
      }

      .verify-bar {
        position: relative;
        height: 40px;
        background: #f5f7fa;
        border-radius: 0 0 4px 4px;

        .verify-button {
          position: absolute;
          width: 40px;
          height: 100%;
          background: #fff;
          cursor: pointer;
          z-index: 2;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          border-radius: 4px;
          transition: left 0.1s;
          touch-action: none; // 防止触摸设备上的默认行为

          &:hover {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
          }

          i {
            color: #409eff;
            font-size: 20px;
          }
        }

        .verify-bar-area {
          position: absolute;
          height: 100%;
          background: rgba(64, 158, 255, 0.9);
          left: 0;
          top: 0;
          transition: width 0.1s;
        }

        .verify-text {
          position: absolute;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 40px;
          color: #606266;
          user-select: none;
          font-size: 14px;
          pointer-events: none; // 防止文字影响拖动
        }
      }
    }

    &.is-disabled {
      opacity: 0.7;
      cursor: not-allowed;

      .verify-button {
        cursor: not-allowed !important;

        &:hover {
          box-shadow: none !important;
        }
      }

      .verify-text {
        color: #909399 !important;
      }
    }
  }
</style>
