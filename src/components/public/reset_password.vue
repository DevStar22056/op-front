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
            <p class="text-center pv">Reset Password</p>

            <el-form :model="user" ref="loginForm" label-width="120px" :rules="rules" label-position="top">
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm password" prop="rePassword">
                <el-input type="password" v-model="user.rePassword"></el-input>
              </el-form-item>
              <button id="login" :disabled="!user.password || !user.rePassword" type="button" class="btn btn-block btn-primary mt-lg" v-on:click='setPassword'>Reset Password
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
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.user.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [
          {
            required: true,
            message: "Please input the Password",
            trigger: "blur"
          }
        ],
        rePassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ]
      },
      user: { password: "", rePassword: "", hash: this.$route.params.hash }
    };
  },

  updated: function() {},
  created: async function() {
    try {
      let login = await this.$http.post("auth/validateHash", this.user);
    } catch (error) {
      this.$message.error("Invalid Hash");
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    ...mapActions("session", ["authenticate"]),
    setPassword: async function(event) {
      this.$refs["loginForm"].validate(async valid => {
        if (!valid) {
          return false;
        }
        try {
          let login = await this.$http.put("auth/setPassword", this.user);
          this.$message.success("the Password has been changed");
          this.authenticate(login.data);
        } catch (e) {
          console.log("error", e);
          this.user.password = "";
          this.user.rePassword = "";
          this.$message.error("Password is incorrect.");
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
