<template>
  <div class="messenger">
    <div class="chats">
      <div class="light box p-1" v-if="chats">
        <h3 class="block-title"><span>Chats</span></h3>

        <div class="chat-list">
          <nuxt-link :to="'/chat/' + chat.key" class="chat-item" v-for="(chat, key) in chats" :key="key">
            <div class="icon"><i class="icon-user"></i></div>
            <div class="label">{{chat.users[0].name}}</div>
          </nuxt-link>
        </div>
      </div>

      <div class="light box p-1 scrollbar" v-if="rooms">
        <h3 class="block-title"><span>Rooms</span><i :class="{'icon-plus': !createRoom, 'icon-minus': createRoom}" @click="createRoom=!createRoom"></i></h3>

        <div class="chat-list">
          <div class="create-room" v-if="createRoom">
            <form @submit.prevent.stop="saveRoom">
              <input type="text" v-model="rootSubject" placeholder="Enter room name...">
              <button></button>
            </form>
          </div>
          <nuxt-link :to="'/chat/' + room.key" class="chat-item" v-for="(room, key) in rooms" :key="key">
            <div class="icon"><i class="icon-heart"></i></div>
            <div class="label">{{room.name}}</div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <message-box></message-box>

    <div class="light box p-1 room-users" v-if="chat.name">
      <h3 class="block-title">Room users</h3>

      <div class="users-list list">
        <div class="user" v-for="(user, key) in chat.users" :key="key">
          <div class="light box hover p-1">
            <div class="user-name">
              {{user.name}}
            </div>
            <div class="start-chat">
              <i class="icon-message-circle" @click="startChat(user.id)"></i>
            </div>
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
      await this.$axios.$post(`/load-chats`).then(response => {
        this.$store.commit('SET_CHATS', response.chats)
        this.$store.commit('SET_ROOMS', response.rooms)
        this.loading = false
      }).catch(error => {
        this.loading = false
      })
    },
    fetchOnServer: false,
    data () {
      return {
        loading: false,
        createRoom: false,
        rootSubject: ''
      }
    },
    computed: {
      chats () {
        return this.$store.getters['chats']
      },
      rooms () {
        return this.$store.getters['rooms']
      },
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
      saveRoom () {
        if(this.rootName !== ''){
          this.$axios.$post(`/create-room`, {name: this.rootSubject}).then(response => {
            this.$store.commit('ADD_ROOM', response)
            this.$router.push({path: '/chat/' + response.key})
          })
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
