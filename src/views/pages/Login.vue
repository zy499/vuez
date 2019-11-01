<!--
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 15:00:20
 * @LastEditors: zy
 * @LastEditTime: 2019-11-01 16:04:06
 -->

<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center" id="page-login">
    <div class="bg-img-left h-screen w-5.5/12">
      <div class="bg-left-title flex items-center">
        <span class="bg-left-nccc">NCCC</span>
        <span class="bg-left-ky">客运服务管理平台</span>
      </div>
      <div class="login-cont h-1/2 vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-auto m-4">
        <!-- <vx-card>
          <div slot="no-body" class="full-page-bg-color">
            <div class="vx-row no-gutter justify-center items-center">
              <div class="vx-col sm:w-full md:w-full lg:w-full d-theme-dark-bg">
                <div class="p-8 login-tabs-container">
                  <div class="vx-card__title mb-4">
                    <h4 class="mb-4">Login</h4>
                    <p>Welcome back, please login to your account.</p>
                  </div>
                  <div>
                    <vs-input
                      name="userName"
                      icon-no-border
                      icon="icon icon-user"
                      icon-pack="feather"
                      label-placeholder="请输入账号"
                      v-model="userName"
                      class="w-full"
                    />
                    <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="请输入密码"
                      v-model="password"
                      class="w-full mt-6"
                    />
                    <vs-button class="float-right" @click="handleLogin">登陆</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>-->
        <p class="contTitle">Welcome to</p>
        <p class="contNccc">NCCC</p>
        <div class="contInputBox mt-16">
          <div class="contInputFont">
            <span>账号</span>
            <span>Account</span>
          </div>
          <vs-input
            name="userName"
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="请输入账号"
            v-model="userName"
            class="w-full mt-6"
          />
          <div class="mt-6 contInputFont">
            <span>密码</span>
            <span>Password</span>
          </div>
          <div class="password-box">
            <vs-input
              :type="passwordType"
              name="password"
              icon-no-border
              icon="icon icon-lock"
              icon-pack="feather"
              label-placeholder="请输入密码"
              v-model="password"
              class="w-full mt-6"
              ref="password"
            />
            <feather-icon :style="{color:pwd_eye_color}" class="password-eye" icon="EyeIcon" @click="showPwd" />
          </div>
          <div class="mt-6 flex items-center">
            <vs-checkbox v-model="is_remember_pwd" class="ml-0 mr-1 remember_pwd" ></vs-checkbox>
            <span class="remember_pwd_text">记住密码</span>
          </div>
        </div>
        <vs-button class="mt-24 w-full handleBtn" @click="handleLogin">登&nbsp;录</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { Base64 } from "js-base64";
import { login } from "@/api/user";
export default {
  data() {
    return {
      userName: "",
      password: "",
      passwordType: "password",
      pwd_eye_color: 'rgba(0,0,0,.4)',
      is_remember_pwd: true
    };
  },
  methods: {
    handleLogin() {
      login({
        account: this.userName,
        password: Base64.encode(md5(this.password) + ";" + new Date())
      })
        .then(({ data }) => {
          this.$vs.loading.close();
          this.$cookie.set("token", data.data.token);
          this.$router.replace({ name: "passengerFlowWaringHomepage" });
        })
        .catch(err => {
          if (err) {
            this.$vs.notify({
              title: "Danger",
              text: err.data.msg,
              color: "danger"
            });
            this.$vs.loading.close();
          }
        });
    },
    // password show
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        this.pwd_eye_color = '#067ffe'
      } else {
        this.passwordType = 'password'
        this.pwd_eye_color = 'rgba(0,0,0,.4)'
      }
      this.$refs.password.focusInput()
    }
  }
};
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
