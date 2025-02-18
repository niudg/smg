<template>
  <div class="l-content">
    <div class="tomooni_wrap"></div>
    <div class="l-inner">
      <div class="cnt-ttl-wrap">
        <h2 class="cnt-ttl--l">
          <span class="cnt-ttl-txt">ログアウト</span>
        </h2>
      </div>
      <div class="error-message-box">
        <div class="error-message-ttl-box">
          <h3 class="error-message-ttl">ログアウトが完了しました</h3>
        </div>
        <div class="error-message-cnt-box">
          <div class="error-message-link-box" @click="goLogin">
            <a class="sbmt-btn is-main">ログイン</a>
          </div>
        </div>
      </div>
    </div>
    <vab-main-footer />
  </div>
</template>

<script>
  import { toLoginRoute } from '@/utils/routes'
  import {
    baseURL,
    publicPath,
    authMode,
    /* tokenName, */
  } from '@/config'
  export default {
    name: 'Logout',
    methods: {
      goLogin() {
        if (authMode != 'normal') {
          window.location.href = `${baseURL}${publicPath}so/saml2/authenticate/adfs`
        } else {
          this.$router.push(toLoginRoute('/'))
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  body {
    line-height: 1.6;
    -webkit-text-size-adjust: 100%;
    color: #000;
  }

  .l-content {
    background-color: #f7f7f7;
  }

  .l-inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    padding: 0 32px;
    margin-bottom: 24px;
  }

  .cnt-ttl-wrap {
    margin: 0 0 12px;
  }

  .error-message-box {
    margin: 0 auto;
    padding: 40px;
    max-width: 800px;
    background-color: #fff;
    text-align: center;
  }
  .sbmt-btn {
    margin: 0 auto;
    padding: 12px 8px;
    width: 80%;
    max-width: 240px;
    background-color: #0060c2;
    color: #fff;
    border: none;
    font-weight: 900;
    text-align: center;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 18px;
    border-radius: 2px;
  }

  a:link {
    text-decoration: none;
  }

  a {
    transition: 0.3s color, 0.3s opacity;
    cursor: pointer;
  }

  .error-message-link-box {
    margin-top: 24px;
  }

  .error-message-box {
    text-align: center;
  }

  .error-message-ttl {
    font-size: 24px;
    margin: 0;
    font-weight: 700;
    color: #000000;
  }

  .cnt-ttl--l {
    font-size: 22px;
    color: #003350;
  }

  .tomooni_wrap {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 4px solid #003350;
    .tomooni {
      width: 120px;
      height: 38px;
      margin-left: 32px;
    }
  }
</style>
