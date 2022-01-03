<template>
  <div class="message-box">
    <div class="messages">
      <div class="light box p-1 add-user" v-if="chat.name">
        <span>{{chat.name}} &nbsp;</span>
        <span class="icon-user-plus" @click="toggleUsers=true"></span>
      </div>

      <div class="light box p-1 messages">
        <div class="scrollbar" ref="messages" id="messages" v-if="$route.params.slug">
          <div class="message" :class="{interlocutor: message.sender_id!==$auth.user.id}" v-for="(message, key) in chat.messages" :key="key">
            <div class="icon-user"></div>
            <div class="msg">
              <div class="text">{{message.message}}</div>
              <div class="author" @click="startChat(message.sender.id)">{{message.sender.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="send-message" v-if="$route.params.slug">
      <div class="light box p-1">
        <form @submit.prevent.stop="send">
          <input type="text" placeholder="Type your message..." v-model="message">
          <button><i class="icon-send"></i></button>
        </form>
      </div>
    </div>

    <div class="add-room-user" v-if="toggleUsers" v-on:click.self="toggleUsers=false">
      <users @clicked="addUser"></users>
    </div>
  </div>
</template>

<script>
  export default {
    async fetch () {
      this.loading = true
      await this.$axios.$post(`/load-chat`, {key: this.$route.params.slug}).then(response => {
        this.loading = false
        this.$store.commit('SET_CHAT', response)


        if(process.client){
          this.scrollTo()
        }
      }).catch(error => {
        this.loading = false
      })
    },
    fetchOnServer: false,
    data () {
      return {
        loading: false,
        message: '',
        toggleUsers: false,
        toggleUsersList: false
      }
    },
    computed: {
      chat () {
        return this.$store.getters['chat']
      }
    },
    methods: {
      startChat (user_id){
        this.$axios.$post(`/start-chat`, {user_id: user_id}).then(response => {
          this.$router.push({path: '/chat/' + response.key})
        })
      },
      send () {
        if(this.message !== '') {
          this.$axios.$post(`/send-message`, {
            key: this.$route.params.slug,
            message: this.message
          }, {progress: false}).then(response => {
            this.message = ''
            for(let key in response){
              this.$store.commit('ADD_MESSAGE', response[key])
            }
            this.scrollTo()
          })
        }
      },
      scrollTo () {
        setTimeout(() => {
          var container = this.$el.querySelector("#messages");
          container.scrollTop = container.scrollHeight;
        })
      },
      addUser (user) {
        this.$axios.$post(`/add-room-user`, {
          key: this.$route.params.slug,
          user_id: user.id
        }, {progress: false}).then(response => {
          if(response.exists){
            alert('This user already exists in this room')
          }else{
            this.toggleUsers = false
            this.$store.commit('UPDATE_ROOM_USERS', response.users)
          }
        })
      }
    }
  }
</script>
