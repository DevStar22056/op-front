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
            <p class="text-center pv">Forgot Password</p>

            <el-form :model="user" ref="forgotForm" label-width="120px" :rules="rules" label-position="top">
              <el-form-item label="Email" prop="email">
                <el-input v-model.trim="user.email"></el-input>
              </el-form-item>
              <button id="login" :disabled="!user.email" type="button" class="btn btn-block btn-primary mt-lg" v-on:click='resetPassword'>Reset Password
              </button>
            </el-form>
            <p class="pt-lg text-center">Need to Sign in?</p>
            <router-link to="login" class="btn btn-block btn-default">Sign in</router-link>
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
            message: "Please input the email",
            trigger: "blur"
          }
        ]
      },
      user: { email: "" }
    };
  },

  methods: {
    resetPassword: async function(event) {
      this.$refs["forgotForm"].validate(async valid => {
        if (!valid) {
          return false;
        }
        try {
          let login = await this.$http.post("auth/resetPassword", this.user);
        } catch (e) {}
        this.$message.success("If your email is registered, you will receive a message.");
        this.$router.push({ name: "login" });
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
