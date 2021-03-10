<template>
    <div id="register_wrapper">
	    <div class="wrapper">
        <div class="block-center mt-xl wd-xl">
            <div class="panel panel-dark panel-flat">
                <div class="panel-heading text-center">
                    <a href="/">
                        <img src="/static/img/logo.png" alt="Image" class="block-center img-rounded">
                    </a>
                </div>
                <div class="panel-body">
                    <p class="text-center pv">SIGNUP TO GET INSTANT ACCESS. </p>

                    <el-form :model="user" ref="signupForm" label-width="120px" :rules="rules"  label-position="top" on:submit.prevent="register">
                        <el-form-item label="App UUID" prop="appUuid">
                        <el-input v-model="user.appUuid"></el-input>
                        </el-form-item>
                        <el-form-item label="FirstName" prop="firstName">
                        <el-input v-model="user.firstName"></el-input>
                        </el-form-item>
                        <el-form-item label="Last Name" prop="lastName">
                        <el-input v-model="user.lastName" ></el-input>
                        </el-form-item>
                        <el-form-item label="Country" prop="country">
                        <el-input v-model="user.country" ></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                        <el-input v-model="user.email" ></el-input>
                        </el-form-item>
                        <el-form-item label="Mobile Number" prop="mobileNumber">
                        <el-input v-model="user.mobileNumber" ></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="user.password" ></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm password" prop="rePassword">
                        <el-input type="password" v-model="user.rePassword" ></el-input>
                        </el-form-item>
                        <button id="login" type="button" class="btn btn-block btn-primary mt-lg"
                                                            v-on:click='register'>Create Account
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
import { mapActions } from "vuex";

export default {
  name: "register_wrapper",
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
        appUuid: [
          {
            required: true,
            message: "Please input App UUID",
            trigger: "blur"
          }
        ],
        firstName: [
          {
            required: true,
            message: "Please input first name",
            trigger: "blur"
          }
        ],
        lastName: [
          {
            required: true,
            message: "Please input last name",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input email ",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please input password ",
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
      user: {
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        mobileNumber: "",
        password: "",
        rePassword: ""
      }
    };
  },
  methods: {
    ...mapActions("session", ["authenticate"]),
    register: async function(event) {
      this.$refs["signupForm"].validate(async valid => {
        if (!valid) {
          return false;
        }
        try {
          let response = await this.$http.post("auth/signup", this.user);
          this.authenticate(response.data);
        } catch (error) {
          if (
            error.headers &&
            error.headers["x-message-code-error"] === "user:alreadyExists"
          ) {
            this.$message.error("User Already Exists");
          } else {
            this.$message.error("An error has ocurred: (" + error.headers["x-message-code-error"] + ")");
          }
        }
      });
    }
  }
};
</script>
