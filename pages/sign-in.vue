<template>
  <div class="auth light box">
    <section-title class="center">Sign in</section-title>

    <form class="form" @submit.prevent.stop="login">
      <div class="form-field" :class="{ 'has--error': $v.auth.username.$error }">
        <label for="Username">Username (chat name)</label>
        <input type="text" id="Username" v-model="auth.username" class="input">
      </div>
      <div class="form-field" :class="{ 'has--error': $v.auth.password.$error }">
        <label for="Password">Password</label>
        <input type="password" id="Password" v-model="auth.password" class="input">
      </div>
      <div class="form-field" v-if="notification">
        <div :class="status" class="center">{{notification}}</div>
      </div>
      <div class="form-field nb">
        <button class="button fluid">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default{
    data () {
      return {
        auth: {
          username: '',
          password: ''
        },
        notification: false,
        status: 'error'
      }
    },
    validations: {
      auth: {
        username: {required},
        password: {required}
      }
    },
    methods: {
      login () {
        this.notification = false
        this.$v.auth.$reset()
        this.$v.auth.$touch()
        if (!this.$v.auth.$invalid) {
          this.doLogin()
        }else{
          this.status = 'error'
          this.notification = 'Error!'
        }
      },
      async doLogin () {
        try {
          await this.$auth.loginWith('chatJWT', { data: this.auth }).then(response => {
            this.status = 'success'
            this.notification = 'Success!'
            this.$router.push({path: '/'})
          })
        } catch (err) {
          this.status = 'error'
          this.notification = err.response.data.message
        }
      }
    }
  }
</script>
