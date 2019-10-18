<!--
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 15:00:20
 * @LastEditors: zy
 * @LastEditTime: 2019-10-18 14:18:37
 -->

<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
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
      </vx-card>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
import { login } from '@/api/user'
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      this.$vs.loading()
      // this.$http({
      //   url: this.$http.adornUrl("sys/login"),
      //   method: "post",
      //   data: this.$http.adornData({
      //     username: this.userName,
      //     password: this.password
      //   })
      // }).then(({ data }) => {
      //   this.$vs.loading.close();
      //   if (data && data.code === 0) {
      //     this.$cookie.set("token", data.token);
      //     sessionStorage.setItem(
      //       "menuList",
      //       JSON.stringify(data.menuList || "[]")
      //     );
      //     this.$router.replace({ name: "home" });
      //   } else {
      //     this.$message.error(data.msg);
      //   }
      // });
      login({
        account: this.userName,
        password: Base64.encode(
          md5(this.password) + ';' + new Date()
        )
      }).then(({ data }) => {
        this.$vs.loading.close()
        this.$cookie.set('token', data.token)
        this.$router.replace({ name: 'dashboard-analytics' })
      }).catch(err => {
        console.log(err)
        this.$vs.loading.close()
      })
    }
  }
}
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
