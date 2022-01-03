<template>
  <header id="header" class="light box">
    <div class="logo">
      <nuxt-link to="/"><i class="icon-message-circle"></i> Simple Chat</nuxt-link>
    </div>
    <div class="actions" v-if="!$auth.loggedIn">
      <nuxt-link to="/sign-in">Sign in</nuxt-link> / <nuxt-link to="/sign-up">Sign up</nuxt-link>
    </div>
    <div class="actions" v-else>
      Hi {{$auth.user.name}} <i class="icon-log-out" @click="logout"></i>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      async logout () {
        await this.$auth.logout()

      }
    }
  }
</script>

<style lang="scss">
  #header{
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo{
      a{
        font-size: 20px;
        display: flex;
        align-items: center;
        i{
          font-size: 2rem;
          margin-right: 0.5rem;
        }
      }
    }

    .actions{
      display: flex;
      align-items: center;
      .icon-log-out{
        cursor: pointer;
        margin-left: 1rem;
      }
    }
  }
</style>
