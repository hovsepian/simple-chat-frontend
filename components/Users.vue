<template>
  <div class="users">
    <div class="heading">
      <div><section-title>Users</section-title></div>
      <form class="search" @submit.prevent.stop="findUser">
        <label for="search" class="icon">
          <i class="icon-search"></i>
        </label>
        <input type="text" id="search" class="input" placeholder="Search users..." v-model="search">
      </form>
    </div>
    <div class="users-list grid">
      <div class="user" v-for="(user, key) in users" :key="key">
        <div class="light box hover p-1" @click="clicked(user)">
          <div class="user-img">
            <i class="icon-user"></i>
          </div>
          <div class="user-name">
            {{user.name}}
          </div>
          <div class="user-name">
            <strong>{{user.username}}</strong>
          </div>
          <div class="start-chat" title="Start chat">
            <i class="icon-message-circle" @click="startChat(user.id)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: ['auth'],
    async fetch () {
      this.loading = true
      await this.$axios.$post(`/users`, {query: this.search}).then(response => {
        this.users = response
        this.loading = false
      }).catch(error => {
        this.loading = false
      })
    },
    fetchOnServer: false,
    data () {
      return {
        loading: false,
        users: [],
        search: ''
      }
    },
    methods: {
      startChat (user_id){
        this.$axios.$post(`/start-chat`, {user_id: user_id}).then(response => {
          this.$router.push({path: '/chat/' + response.key})
        })
      },
      clicked (user) {
        this.$emit('clicked', user)
      },
      findUser () {
        this.$fetch()
      }
    }
  }
</script>

<style lang="scss">
  .users{
    margin-bottom: 3rem;

    .heading{
      display: flex;
      justify-content: space-between;
    }
  }

  .users-list{
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    display: flex;
    flex-wrap: wrap;

    &.grid{
      .user {
        flex: 0 0 20%;
        max-width: 20%;
        padding: 0 0.5rem;
        margin-bottom: 1rem;
      }
    }

    &.list{
      .user {
        flex: 0 0 100%;
        max-width: 100%;

        .box{
          display: flex;
          align-items: center;
          justify-content: space-between;

          .user-name{
            margin-bottom: 0;
            font-size: 14px;
          }
        }
      }
    }

    .user{
      padding: 0 0.5rem;
      margin-bottom: 1rem;
      .box{
        height: 100%;
        .user-img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(0 0 0 / 3%);
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
          margin: auto;
          margin-bottom: 1rem;
          i{
            font-size: 40px;
          }
        }
        .user-name{
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 1rem;
        }
        strong{
          font-size: 14px;
        }
        .start-chat{
          text-align: center;
          i{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            line-height: 30px;
            text-align: center;
            background: $success-color;
            cursor: pointer;
            color: #fff;
            transition: all 0.2s;

            &:hover{
              background: darken($success-color, 10%);
            }

            &:active{
              background: darken($success-color, 20%);
            }
          }
        }
      }
    }
  }
</style>
