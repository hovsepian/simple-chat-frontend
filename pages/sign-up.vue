<template>
  <div class="auth light box">
    <section-title class="center">Sign in</section-title>

    <form class="form" @submit.prevent.stop="register">
      <div class="form-field" :class="{ 'has--error': $v.auth.name.$error }">
        <label for="full-name">Full name</label>
        <input type="text" id="full-name" v-model="auth.name" class="input">
      </div>
      <div class="form-field" :class="{ 'has--error': $v.auth.email.$error }">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="auth.email" class="input">
      </div>
      <div class="form-field" :class="{ 'has--error': $v.auth.username.$error }">
        <label for="Username">Username</label>
        <input type="text" id="Username" v-model="auth.username" class="input">
      </div>
      <div class="form-field" :class="{ 'has--error': $v.auth.password.$error }">
        <label for="Password">Password</label>
        <input type="password" id="Password" v-model="auth.password" class="input">
      </div>
      <div class="form-field" :class="{ 'has--error': $v.auth.password_confirmation.$error }">
        <label for="password-confirm">Password confirmation</label>
        <input type="password" id="password-confirm" v-model="auth.password_confirmation" class="input">
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
  import { required, email, sameAs } from 'vuelidate/lib/validators'

  export default{
    data () {
      return {
        auth: {
          name: '',
          email: '',
          username: '',
          password: '',
          password_confirmation: ''
        },
        notification: false,
        status: 'error'
      }
    },
    validations: {
      auth: {
        name: {required},
        email: {required, email},
        username: {required},
        password: {required},
        password_confirmation: {
          required,
          sameAs: sameAs('password')
        },
      }
    },
    methods: {
      register () {
        this.notification = false
        this.$v.auth.$reset()
        this.$v.auth.$touch()
        if (!this.$v.auth.$invalid) {

          this.$axios.$post('/auth/register', this.auth).then(response => {
            this.status = 'success'
            this.notification = 'Success!'
            this.doLogin()
          }).catch(error => {
            this.status = 'error'
            this.notification = 'Error!'
          })


        }else{
          this.status = 'error'
          this.notification = 'Error!'
        }
      },
      async doLogin () {
        await this.$auth.loginWith('chatJWT', { data: this.auth }).then(response => {
          this.$router.push({path: '/'})
        })
      }
    }
  }
</script>
