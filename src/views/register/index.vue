<template>
  <div class="register-container">
    <div class="register-box">
      <!-- <div class="register-title">{{ translateTitle('アカウント登録') }}</div> -->
      <div class="register-subtitle">
        登録内容について、下記フォームに必要事項をご記入のうえ「登録」ボタンを押してください。
        <p>
          あるいは
          <a href="https://www.c-a-j.com/webpower/login" target="_blank">
            アカウントをお持ちですか？ログインはこちら
            <i class="fas fa-sign-in-alt"></i>
          </a>
        </p>
      </div>
      <el-form
        ref="registerForm"
        class="register-form"
        :model="form"
        :rules="registerRules"
      >
        <div class="service-plan-title-wrapper">
          <h2 class="service-plan-title">アカウント登録</h2>
          <div class="service-plan-background">Register</div>
        </div>
        <el-form-item label="会社名称" prop="name">
          <el-input
            v-model.trim="form.name"
            maxlength="100"
            :placeholder="translateTitle('例：株式会社ABC')"
            prefix-icon="el-icon-s-custom"
          />
        </el-form-item>
        <el-form-item label="代表者名" prop="representative">
          <el-input
            v-model.trim="form.representative"
            maxlength="100"
            :placeholder="translateTitle('例：田中 一郎')"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="郵便番号" prop="postCode">
          <el-input
            v-model.trim="form.postCode"
            maxlength="10"
            :placeholder="translateTitle('例：197-0804')"
            prefix-icon="el-icon-location-information"
          />
        </el-form-item>
        <el-form-item label="住所" prop="address">
          <el-input
            v-model.trim="form.address"
            maxlength="200"
            :placeholder="translateTitle('例：大阪府大阪市XXX')"
            prefix-icon="el-icon-location"
          />
        </el-form-item>
        <el-form-item label="電話番号" prop="telephone">
          <el-input
            v-model.trim="form.telephone"
            maxlength="14"
            :placeholder="translateTitle('例：08012345678')"
            prefix-icon="el-icon-phone"
          />
        </el-form-item>

        <el-form-item label="メールアドレス" prop="email">
          <el-input
            v-model.trim="form.email"
            maxlength="50"
            :placeholder="translateTitle('例：abc123@exmple.co.jp')"
          >
            <el-button
              slot="append"
              :disabled="isGetEmail || !isEmailValid"
              class="email-btn"
              @click="getEmailCode"
            >
              {{ emailCode }}
            </el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="メール認証コード" prop="emailVerifyCode">
          <el-input
            v-model.trim="form.emailVerifyCode"
            maxlength="6"
            :placeholder="translateTitle('例：653289')"
            prefix-icon="el-icon-key"
          />
        </el-form-item>
        <div class="service-plan-title-wrapper">
          <h2 class="service-plan-title">サービス料金</h2>
          <div class="service-plan-background">Plan</div>
        </div>

        <div class="service-plan-cards">
          <div
            v-for="(item, index) in serviceChargeList"
            :key="item.id"
            class="service-plan-card"
            :class="{ 'is-selected': form.serviceChargeId === item.id }"
            @click="form.serviceChargeId = item.id"
          >
            <div class="plan-header">
              <div v-if="form.serviceChargeId === item.id" class="check-icon">
                <i class="el-icon-check"></i>
              </div>
              <div class="plan-text">plan</div>
              <div class="plan-number">0{{ index + 1 }}</div>
            </div>
            <div class="plan-content">
              <div class="plan-name">{{ item.name }}</div>
              <div class="plan-detail">{{ item.description }}</div>
            </div>
            <div class="plan-price-wrapper">
              <div class="plan-price">
                {{ item.charge }}
                <span class="unit">円</span>
              </div>
            </div>
            <!-- <div v-if="index === 1" class="recommend-tag">
              <span>おすすめプラン</span>
            </div> -->
          </div>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            class="register-btn"
            :loading="loading"
            @click="handleRegister"
          >
            {{ translateTitle('登録') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  // import { isPassword } from '@/utils/validate'
  import { mapActions } from 'vuex'
  import {
    sendMail,
    register,
    getServiceChargeList,
    getServiceList,
  } from '@/api/user'
  export default {
    name: 'Register',
    directives: {},
    beforeRouteLeave(to, from, next) {
      if (this.timertimer) {
        clearInterval(this.timertimer)
      }
      next()
    },
    data() {
      const validateEmail = (rule, value, callback) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!value) {
          callback(new Error(this.translateTitle('メールアドレスは必須です')))
        } else if (!emailRegex.test(value)) {
          callback(
            new Error(
              this.translateTitle('有効なメールアドレスを入力してください')
            )
          )
        } else {
          callback()
        }
      }
      const validateEmailCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.translateTitle('認証コードは必須です')))
        } else if (!/^\d{6}$/.test(value)) {
          callback(
            new Error(this.translateTitle('正確な認証コードを入力してください'))
          )
        } else {
          callback()
        }
      }
      return {
        isGetPhone: false,
        timertimer: null,
        phoneCode: this.translateTitle('検証コードを取得'),
        showRegister: false,
        form: {
          name: '',
          representative: '',
          postCode: '',
          address: '',
          telephone: '',
          email: '',
          emailVerifyCode: '',
          serviceChargeId: '',
          serviceId: '',
        },
        serviceChargeList: [],
        serviceList: [],
        registerRules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              message: this.translateTitle('会社名称を入力してください'),
            },
          ],
          representative: [
            {
              required: true,
              trigger: 'blur',
              message: this.translateTitle('代表者名を入力してください'),
            },
          ],
          postCode: [
            {
              required: true,
              trigger: 'blur',
              message: this.translateTitle('郵便番号を入力してください'),
            },
          ],
          address: [
            {
              required: true,
              trigger: 'blur',
              message: this.translateTitle('住所を入力してください'),
            },
          ],
          telephone: [
            {
              required: true,
              trigger: 'blur',
              message: this.translateTitle('電話番号を入力してください'),
            },
          ],
          email: [
            {
              required: true,
              trigger: 'blur',
              message: this.translateTitle('メールアドレスを入力してください'),
            },
            { validator: validateEmail, trigger: 'blur' },
          ],
          emailVerifyCode: [
            {
              required: true,
              trigger: 'blur',
              message:
                this.translateTitle('メール認証コードを入力してください'),
            },
            { validator: validateEmailCode, trigger: 'blur' },
          ],
          serviceChargeId: [
            {
              required: true,
              trigger: 'change',
              message: this.translateTitle('サービスプランを選択してください'),
            },
          ],
        },
        loading: false,
        passwordType: 'password',
        captchaUrl: '',
        loadingVerify: false,
        isFormValid: false,
        isGetEmail: false,
        emailTimer: null,
        emailCode: this.translateTitle('認証コード'),
      }
    },
    computed: {
      isEmailValid() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(this.form.email)
      },
    },
    watch: {
      form: {
        handler: 'checkFormValid',
        deep: true,
      },
    },
    beforeDestroy() {
      if (this.timertimer) {
        clearInterval(this.timertimer)
        this.timertimer = null
      }
      if (this.emailTimer) {
        clearInterval(this.emailTimer)
        this.emailTimer = null
      }
    },
    created() {
      this.getServiceList()
    },
    mounted() {
      if (this.$refs.slideVerify) {
        this.$refs.slideVerify.init()
      }
    },
    methods: {
      ...mapActions({
        setToken: 'user/setToken',
      }),
      translateTitle,
      async getServiceChargeList() {
        const changeList = await getServiceChargeList({
          serviceId: this.form.serviceId,
        })
        changeList.forEach((item) => {
          item.charge = this.formatCell(item.charge, 'INTEGER', '0,0')
        })
        if (changeList.length > 0) {
          this.form.serviceChargeId = changeList[0].id
          this.serviceChargeList = changeList
        }
      },
      async getServiceList() {
        // 解析URL中的location参数
        const locationParam = window.location.search
        // 从URL中获取serviceUrl参数
        const urlParams = new URLSearchParams(locationParam)
        const serviceUrl = urlParams.get('sUrl')
        if (!serviceUrl) {
          this.$alert(this.translateTitle('無効なサービスURLです'), '提示', {
            confirmButtonText: '確定',
            type: 'error',
            center: true,
            confirmButtonClass: 'wide-confirm-button',
            customClass: 'register-alert-box',
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
          })
          return
        }
        const serviceList = await getServiceList({
          serviceUrl: serviceUrl,
        })
        if (serviceList.length > 0) {
          this.serviceList = serviceList
          this.form.serviceId = serviceList[0].id
          this.getServiceChargeList()
        } else {
          this.$alert(this.translateTitle('無効なサービスURLです'), '提示', {
            confirmButtonText: '確定',
            type: 'error',
            center: true,
            confirmButtonClass: 'wide-confirm-button',
            customClass: 'register-alert-box',
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
          })
        }
      },
      handleRegister() {
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            this.registerPost()
          } else {
            // 获取第一个验证失败的表单项
            const firstErrorField = Object.keys(
              this.$refs['registerForm'].fields
            ).find(
              (key) =>
                this.$refs['registerForm'].fields[key].validateState === 'error'
            )

            if (firstErrorField) {
              // 获取对应的DOM元素
              const errorElement =
                this.$refs['registerForm'].fields[firstErrorField].$el

              // 平滑滚动到错误元素位置
              errorElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })

              // 聚焦到错误输入框
              const input = errorElement.querySelector('input')
              if (input) {
                input.focus()
              }
            }
          }
        })
      },
      async registerPost() {
        const res = await register(this.form)
        if (res) {
          // this.$alert(
          //   this.translateTitle(
          //     '登録成功しました。審査結果は2-3営業日以内にメールでお知らせいたします。'
          //   ),
          //   '提示',
          //   {
          //     confirmButtonText: '確定',
          //     type: 'success',
          //     center: true,
          //     confirmButtonClass: 'wide-confirm-button',
          //     customClass: 'register-alert-box',
          //     showClose: true,
          //     closeOnClickModal: true,
          //     closeOnPressEscape: true,
          //   }
          // )
          // フォームをリセット
          this.form = {
            name: '',
            representative: '',
            postCode: '',
            address: '',
            telephone: '',
            email: '',
            emailVerifyCode: '',
          }
          // フォームのバリデーション状態をリセット
          this.$refs['registerForm'].resetFields()

          this.$router.replace('/registerSuccess')
        }
      },
      initVerify() {
        if (this.$refs.slideVerify) {
          requestAnimationFrame(() => {
            this.$refs.slideVerify.init()
            this.loadingVerify = false
          })
        }
      },
      checkFormValid() {
        const {
          name,
          representative,
          postCode,
          address,
          telephone,
          email,
          emailVerifyCode,
          serviceChargeId,
        } = this.form

        // 检查所有必填字段是否已填写
        const isAllFieldsFilled =
          name?.trim() &&
          representative?.trim() &&
          postCode?.trim() &&
          address?.trim() &&
          telephone?.trim() &&
          email?.trim() &&
          emailVerifyCode?.trim() &&
          serviceChargeId

        // 检查邮箱格式
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const isEmailValid = emailRegex.test(email)

        // 检查验证码格式
        const isVerifyCodeValid = /^\d{6}$/.test(emailVerifyCode)

        this.isFormValid =
          isAllFieldsFilled && isEmailValid && isVerifyCodeValid

        // 如果表单验证通过，启用滑动验证
        if (this.$refs.verifyImgChip) {
          this.$refs.verifyImgChip.disabled = !this.isFormValid
        }
      },
      handleBeforeVerify() {
        if (!this.isFormValid) {
          this.$message.warning(
            this.translateTitle('必須項目を入力してください')
          )
          return false
        }
        return true
      },
      async getEmailCode() {
        if (!this.isEmailValid) {
          this.$refs['registerForm'].validateField('email')
          return
        }

        this.isGetEmail = true
        let countdown = 60

        this.$message.success(this.translateTitle('認証コードが送信されました'))

        this.emailTimer = setInterval(() => {
          if (countdown > 0) {
            countdown--
            this.emailCode = `${this.translateTitle('再取得')} ${countdown}s`
          } else {
            clearInterval(this.emailTimer)
            this.emailCode = this.translateTitle('認証コード')
            this.emailTimer = null
            this.isGetEmail = false
          }
        }, 1000)

        const res = await sendMail({
          toEmail: this.form.email,
        })
        console.log('res', res)
      },
    },
  }
</script>
<style lang="scss">
  .register-alert-box {
    .el-message-box__btns {
      display: none !important;
    }
  }

  .el-form-item.is-required:not(.is-no-asterisk) {
    .el-form-item__label::after {
      content: '必須' !important;
      color: #c90022;
      margin-right: 8px !important;
      font-size: 12px;
    }
    // .el-form-item__label::after {
    //   content: '' !important;
    //   margin-right: 8px !important;
    // }
  }
</style>

<style lang="scss" scoped>
  .register-container {
    min-height: 100vh;
    padding: 20px;
    background: #ffffff;
    .el-form-item__label {
      font-size: 16px;
    }
    @media screen and (max-width: 768px) {
      padding: 10px;
    }
    .email-btn {
      background: #102447;
      color: #fff;
      border: none;
      width: 100px;
      @media screen and (max-width: 768px) {
        position: absolute;
        right: 6px;
        top: 0;
      }
    }
    .register-box {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px;

      @media screen and (max-width: 768px) {
        padding: 20px 10px;
      }

      .register-title {
        font-size: 50px;

        @media screen and (max-width: 768px) {
          font-size: 32px;
        }
      }

      .register-subtitle {
        font-size: 18px;
        line-height: 24px;

        @media screen and (max-width: 768px) {
          font-size: 14px;
          padding: 0 10px;
        }

        a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
          display: inline-flex;
          align-items: center;

          i {
            margin-left: 5px;
            animation: moveLeftRight 1s infinite alternate;
          }

          @keyframes moveLeftRight {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(5px);
            }
          }
        }
      }
    }

    .register-form {
      .el-form-item {
        margin-bottom: 20px;
        ::v-deep .el-form-item__label {
          font-size: 16px !important;
        }
        @media screen and (max-width: 768px) {
          margin-bottom: 15px;
        }
      }

      // 输入框样式
      .el-input {
        height: 45px;
        margin-top: 16px;

        ::v-deep .el-input__inner {
          height: 45px;
          line-height: 45px;
          padding: 0 15px; // 移除左侧图标后调整padding
          font-size: 14px;
          border: 1px solid #102447;
          border-radius: 4px;
          background: #ffffff;
          position: relative;
          @media screen and (max-width: 768px) {
            padding-left: 5px !important;
          }

          &::placeholder {
            color: #c0c4cc;
            font-size: 14px;
            @media screen and (max-width: 768px) {
              font-size: 13px;
            }
          }
        }

        // 移除所有图标
        ::v-deep .el-input__prefix,
        ::v-deep .el-input__suffix {
          display: none;
        }

        // 修改按钮样式
        ::v-deep .el-input-group__append {
          padding: 0;
          border: none;
          background: none;
          padding-right: 0 !important;
          @media screen and (max-width: 768px) {
            padding-right: 0 !important;
          }

          .el-button {
            height: 45px;
            margin: 0;
            padding: 0 15px;
            font-size: 14px;
            border-radius: 0 4px 4px 0;

            &:hover {
              opacity: 0.8;
            }

            &:disabled {
              color: #fff;
              cursor: not-allowed;
            }
          }
        }
      }

      // 验证码输入框特殊处理
      .verify-code-input {
        .el-input {
          ::v-deep .el-input__inner {
            border-right: none;
            border-radius: 4px 0 0 4px;
          }
        }

        // 验证码按钮
        .verify-code-btn {
          height: 40px;
          padding: 0 15px;
          font-size: 14px;
          color: #606266;
          background: #f5f7fa;
          border: 1px solid #dcdfe6;
          border-radius: 0 4px 4px 0;

          &:disabled {
            color: #c0c4cc;
            background: #f5f7fa;
            cursor: not-allowed;
          }
        }
      }

      // 错误提示
      ::v-deep .el-form-item__error {
        padding-top: 4px;
        font-size: 12px;
        color: #f56c6c;
        left: inherit;
        right: 0;
        top: 5px;
        @media screen and (max-width: 768px) {
          top: 22px;
          font-size: 13px !important;
        }
      }
    }

    // 分隔线
    .divider {
      display: flex;
      align-items: center;
      margin: 24px 0;
      color: #606266;
      font-size: 14px;

      &::before,
      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #dcdfe6;
        margin: 0 16px;
      }
    }

    // 提交按钮
    .register-btn {
      width: 100%;
      max-width: 800px;
      height: 50px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      background: #102447;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      margin: 80px auto;
      display: block;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      letter-spacing: 4px;
      box-shadow: 0 4px 15px rgba(16, 36, 71, 0.1);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transition: 0.5s;
      }

      &:hover {
        transform: translateY(-2px);
        background: #1a3366;
        box-shadow: 0 6px 20px rgba(16, 36, 71, 0.15);

        &::before {
          left: 100%;
        }
      }

      &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 10px rgba(16, 36, 71, 0.1);
      }

      &:disabled {
        background: #e0e0e0;
        cursor: not-allowed;
        box-shadow: none;
        color: #999;
      }

      @media screen and (max-width: 768px) {
        height: 45px;
        font-size: 18px;
        margin: 0px auto;
      }
    }

    .service-plan-title-wrapper {
      position: relative;
      text-align: center;
      padding: 40px 0;
      margin: 20px 0 60px;
      @media screen and (max-width: 768px) {
        padding: 20px 0;
        margin: 0px 0 20px;
      }
      .service-plan-title {
        position: relative;
        font-size: 32px;
        font-weight: bold;
        color: #102447;
        margin: 0;
        z-index: 2;
        top: 20px;

        @media screen and (max-width: 768px) {
          font-size: 24px;
          top: 10px;
        }
      }

      .service-plan-background {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 150px;
        font-weight: bold;
        color: rgba(235, 243, 255, 0.8);
        white-space: nowrap;
        z-index: 1;
        letter-spacing: 5px;
        font-family: 'element-icons';

        @media screen and (max-width: 768px) {
          font-size: 70px;
        }
      }
    }

    .service-plan-cards {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 40px 0;

      .service-plan-card {
        flex: none;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        border-radius: 8px;
        background: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0px 2px 12px rgba(0, 43, 88, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: row;
        height: 200px;
        border: 2px solid transparent;

        &.is-selected {
          border: 2px solid #0066cc;
          background: #fff;
          box-shadow: 0px 4px 16px rgba(0, 102, 204, 0.15);
          transform: translateY(-5px);

          .plan-header {
            background: #ebf3ff;

            .plan-text {
              color: #0066cc;
            }

            .plan-number {
              color: #0066cc;
            }
          }

          .plan-content {
            .plan-name {
              color: #0066cc;
            }
          }

          .plan-price-wrapper {
            // border-left: 1px dashed #0066cc;

            .plan-price {
              color: #0066cc;
            }
          }
        }

        &:hover:not(.is-selected) {
          transform: translateY(-5px);
          box-shadow: 0px 4px 16px rgba(0, 43, 88, 0.15);
        }

        .plan-header {
          background: #ebf3ff;
          padding: 30px 20px;
          text-align: center;
          position: relative;
          width: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .check-icon {
            position: absolute;
            top: 15px;
            left: 15px;
            width: 24px;
            height: 24px;
            background: #0066cc;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            i {
              color: #fff;
              font-size: 16px;
            }
          }

          .plan-text {
            font-size: 24px;
            color: #102447;
            font-weight: normal;
            margin-bottom: 5px;
            opacity: 0.7;
          }

          .plan-number {
            font-size: 48px;
            font-weight: bold;
            color: #102447;
            font-style: italic;
            line-height: 1;
            margin-bottom: 20px;
          }

          .plan-description {
            font-size: 14px;
            color: #102447;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .plan-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 50%;

            img {
              width: 30px;
              height: 30px;
            }
          }
        }

        .plan-content {
          padding: 30px 20px;
          background: #fff;
          text-align: left;
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .plan-name {
            font-size: 25px;
            font-weight: bold;
            color: #102447;
            margin-bottom: 15px;
          }
          .plan-detail {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }

        .plan-price-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          border-left: 1px dashed #102447;
          .plan-price {
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            color: #102447;
            font-style: italic;

            .unit {
              font-size: 20px;
              font-weight: normal;
              font-style: normal;
              margin-left: 5px;
            }
          }
        }

        &:nth-child(2) {
          .recommend-tag {
            position: absolute;
            top: 10px;
            right: -30px;
            background: #ffe600;
            color: #102447;
            padding: 5px 40px;
            transform: rotate(45deg);
            font-size: 12px;
            font-weight: bold;
            z-index: 1;
          }
        }

        @media screen and (max-width: 768px) {
          height: auto;
          flex-direction: column;

          .plan-header {
            width: 100%;
            padding: 20px;

            .plan-text {
              font-size: 20px;
            }

            .plan-number {
              font-size: 36px;
              margin-bottom: 10px;
            }
          }

          .plan-content {
            width: 100%;
            padding: 20px;

            .plan-name {
              font-size: 20px;
              margin-bottom: 10px;
            }

            .plan-detail {
              font-size: 14px;
              margin-bottom: 15px;
            }
          }

          .plan-price-wrapper {
            border-left: none;
            border-top: 1px dashed #102447;
            padding: 15px;

            .plan-price {
              font-size: 32px;

              .unit {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .divider {
    margin: 15px 0;
    display: flex;
    align-items: center;
    text-align: center;

    &::before,
    &::after {
      content: '';
      flex: 1;
      border-top: 1px dashed #5d5e5f;
    }

    span {
      padding: 0 10px;
      color: #5d5e5f;
      font-size: 14px;
    }
  }
</style>
