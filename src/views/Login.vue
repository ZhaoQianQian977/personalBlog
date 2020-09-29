<template>
  <div>
    <div class="sign-box">
      <div class="signIn" v-if="status === 1" key="login">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-width="0px"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="signbtn" @click="signIn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <span class="signText" @click="toSignUp">注册新账号</span>
      </div>
      <div class="signUp" v-else key="register">
        <el-form
          :model="regForm"
          :rules="regRules"
          ref="regForm"
          label-width="0px"
        >
          <el-form-item prop="username">
            <el-input
              v-model="regForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="regForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input
              v-model="regForm.nickname"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="signbtn" @click="signUp"
              >注册</el-button
            >
          </el-form-item>
          <span class="signText" @click="toSignIn">返回登录</span>
        </el-form>
      </div>
      <div v-loading.fullscreen.lock="loading"></div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      status: 1,
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      regForm: {
        username: "",
        password: "",
        nickname: "",
      },
      regRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    signIn() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios.post("api/users/login", this.loginForm).then((res) => {
            let result = res.data;
            if (result.code === 0) {
              Cookie.set("token", result.token);
              this.$store.commit("setToken", result.token);
              this.$store.commit("changeSignIn", 1);
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: "/home" });
              }, 1500);
            }
          });
        } else {
          return false;
        }
      });
    },
    toSignUp() {
      this.status = 2;
    },
    signUp() {
      this.$refs["regForm"].validate((valid) => {
        if (valid) {
          this.$axios.post("api/users/register", this.regForm).then((res) => {
            // console.log(res)
            if (res.status === 200) {
              this.$notify({
                title: "成功",
                message: "注册成功",
                type: "success",
              });
            }
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "注册失败",
          });
          return false;
        }
      });
    },
    toSignIn() {
      this.status = 1;
    },
  },
};
</script>

<style lang="less" scoped>
.sign-box {
  width: 300px;
  margin: 200px auto 0;
  text-align: center;
  .signbtn {
    width: 100%;
  }
  .signText {
    color: #3b78dd;
    cursor: pointer;

    &:hover {
      color: #1760d7;
    }
  }
}
</style>
