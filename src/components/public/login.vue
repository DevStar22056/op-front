<template>
  <div id="login_wrapper">
    <div class="wrapper">
      <div class="block-center mt-xl wd-xl">
        <div class="panel panel-dark panel-flat">
          <div class="panel-heading text-center">
            <a href="/">
              <img src="/static/img/logo.png" alt="Image" class="block-center img-rounded">
            </a>
          </div>
          <div class="panel-body login-form">
            <p class="text-center pv">SIGN IN TO CONTINUE</p>

            <el-form :model="user" ref="loginForm" label-width="120px" :rules="rules" label-position="top" >
              <el-form-item label="Email" prop="email">
                <el-input v-model.trim="user.email"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input icon="secret" type="password" v-model.trim="user.password" required @keyup.enter.native="login()"></el-input>
              </el-form-item>

              <div class="row">
                <div class="col-xs-5">
                  <el-checkbox v-model="user.rememberme">Remember Me</el-checkbox>
                </div>
                <div class="col-xs-7 text-right forgot-password">
                  <router-link :to="{'name' :'forgot_password'}">Forgot you password?</router-link>
                </div>
              </div>
              <button id="login" :disabled="!user.password || !user.email" type="button" class="btn btn-block btn-primary mt-lg" v-on:click='login'>Login
              </button>
            </el-form>
            <!-- <p class="pt-lg text-center">Need to Signup?</p>
            <router-link to="/register" class="btn btn-block btn-default">Register Now</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bypassAuthRoute from "./bypassAuthRoute";
import { mapActions } from "vuex";

export default {
  name: "login_wrapper",
  data() {
    return {
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: "Please input the email",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please input the Password",
            trigger: "blur"
          }
        ]
      },
      user: { email: "", password: "", rememberme: false },
      retx: "",
      initAuth: "",
      newAuth: "",
      ishmar: true,
      newAuthUser: "",
      user_uuid: "",
      dev_token: "",
      hint: false,
      hint1: false,
      allDevelopers: "",
      checked: false
    };
  },

  updated: function() {},
  created: function() {
    this.initFunction();
  },
  methods: {
    ...mapActions("session", ["authenticate"]),
    initFunction: async function() {},

    login: async function(event) {
      this.$refs["loginForm"].validate(async valid => {
        if (!valid) {
          return false;
        }
        try {
          let login = await this.$http.post("auth/login", this.user);
          login.data.rememberme = this.user.rememberme;
          this.authenticate(login.data);
        } catch (e) {
          console.log("error", e);
          this.user.password = "";
          this.$message.error("Password or Username is incorrect.");
        }
      });
    }
  }
};
</script>
<style>
.login-form .el-checkbox__label,
.login-form .forgot-password {
  font-size: 12px;
  font-weight: normal;
}
</style>
