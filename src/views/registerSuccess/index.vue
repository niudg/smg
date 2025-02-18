<template>
  <div class="register-success-container">
    <div class="register-success-box">
      <div class="success-content">
        <div class="success-icon">
          <img src="~@/assets/190411.png" alt="success" />
        </div>
        <div class="title">登録成功しました。</div>
        <!-- <div class="sub-title">
          審査結果は2-3営業日以内にメールでお知らせいたします。
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RegisterSuccess',
    methods: {
      goToLogin() {
        this.$router.push('/login')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .register-success-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
    background-image: url('~@/assets/success.png');
    background-size: cover;
    background-position: center;

    .register-success-box {
      width: 500px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
      backdrop-filter: blur(4px);

      .success-content {
        text-align: center;

        .success-icon {
          margin-bottom: 20px;

          img {
            width: 80px;
            height: 80px;
            animation: bounce 2s ease infinite;
          }
        }

        .title {
          color: #67c23a;
          font-size: 28px;
          font-weight: 600;
          margin: 50px 0;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .sub-title {
          color: #606266;
          font-size: 16px;
          line-height: 1.8;
          margin-top: 15px;
          padding: 0 20px;
          position: relative;

          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 30px;
            height: 1px;
            background: #dcdfe6;
          }

          &::before {
            left: 15%;
          }

          &::after {
            right: 15%;
          }
        }

        :deep(.el-result),
        :deep(.el-result__title),
        :deep(.el-result__sub-title),
        :deep(.el-result__icon) {
          display: none;
        }
      }
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
</style>
