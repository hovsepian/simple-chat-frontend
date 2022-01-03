export default {
  SET_USERS (state, user) {
    state.users = user
  },
  SET_CHATS (state, chats) {
    state.chats = chats
  },
  SET_ROOMS (state, rooms) {
    state.rooms = rooms
  },
  ADD_ROOM (state, room) {
    state.rooms.unshift(room)
  },
  UPDATE_ROOM_USERS (state, users){
    state.chat.users = users
  },
  SET_CHAT (state, chat) {
    state.chat = chat
  },
  ADD_MESSAGE (state, message) {
    state.chat.messages.push(message)
  }
}
