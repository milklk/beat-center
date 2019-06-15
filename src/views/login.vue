<template>
  <div class="login">
    <h1>桂林市禁毒预警研判平台</h1>
    <main>
      <form action="javascript">
        <h2>用户登录</h2>
        <aside class="warn">{{ warn }}</aside>
        <label for>
          用户名
          <input type="text" placeholder="请输入用户名" v-model="user">
        </label>
        <label for>
          密码
          <input type="password" placeholder="请输入密码" v-model="password">
        </label>
        <label for>
          验证码
          <div style="width:335px">
            <input type="text" style="width:170px" placeholder="验证码" v-model="code">
            <div @click="updata" style="color:#2e82ff" class="code">
              <img
                :src="
                  `${api}/getVerificationCode?time=${time}`
                "
                alt=""
                width="100"
                height="40"
              >
              <span style="margin-left:10px">换一张</span>
            </div>
          </div>
        </label>
        <button type="button" @click="sumbit">登录</button>
      </form>
    </main>
  </div>
</template>

<script>
import { getCode, Loging } from "../api";
import api from "../api/proxy";
export default {
  name: "login",
  data() {
    return {
      api: api,
      user: "",
      password: "",
      code: "",
      auto: false,
      warn: "",
      time: ""
    };
  },
  computed: {},
  methods: {
    async updata() {
      this.time = new Date();
    },
    async sumbit() {
      this.warn = !this.user
        ? "请输入用户名"
        : !this.password
        ? "请输入密码"
        : !this.code
        ? "请输入验证码"
        : "";
      if (!this.warn) {
        const account = this.user,
          password = this.password,
          code = this.code;
        const login = await Loging({ account, password, code });
        if (login.ret === "200") {
          const data = login.data,
            ses = window.sessionStorage;
          ses.setItem("token", data.token);
          ses.setItem("user", account);
        } else {
          this.warn = login.msg;
          this.updata();
          this.code = "";
        }
        if (window.sessionStorage.token) {
          this.$router.push({ path: "/" });
          this.$store.commit("nav/setTabs", {
            tab: {
              path: "/home",
              name: "首页",
              index: "1"
            },
            type: "find"
          });
        }
      } else {
        this.updata();
        this.code = "";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('../assets/images/login-bg.png');
  background-size: 100% 100%;
}

h1 {
  font-size: 27px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 11.5vw;
  top: 3.9vh;
  display: flex;
  align-items: center;
}

h1 img {
  margin-right: 10px;
}

main {
  width: 478px;
  height: 315px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(16, 14, 57, 1);
  border: 1px solid rgba(38, 70, 135, 1);
  opacity: 0.75;
  border-radius: 6px;
}

main h2 {
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
  text-align: center;
}

main .warn {
  color: red;
  height: 16px;
  padding-left: 39px;
}

main label {
  color: rgba(176, 176, 230, 1);
  line-height: 45px;
  padding: 0 39px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

main input {
  color: rgba(176, 176, 230, 1);
  width: 335px;
  height: 40px;
  background: rgba(4, 28, 54, 0.9);
  border: 1px solid rgba(39, 62, 136, 1);
  border-radius: 9px 9px 9px 9px;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 20px;
}

main label div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

main .code {
  color: #2e82ff;
  cursor: pointer;
}

main button {
  width: 335px;
  height: 46px;
  background: rgba(66, 139, 202, 1);
  border-radius: 10px;
  border: none;
  margin-left: 104px;
  margin-top: 10px;
  color: #ffffff;
  font-size: 24px;
}
</style>
