<template>
  <div class="container-login">
    <el-card class="myCard">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRule" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px; margin-right:8px"
          ></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import auth from '@/utils/auth'
export default {
  name: 'app-login',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },

      loginRule: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入六位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post(
            'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm
          ).then(res => {
            auth.setUser(res.data.data)
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less" >
.container-login {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  .myCard {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 10px;
    }
  }
}
</style>
