<template>
  <div class="rooms">
    <div class="heading">
      <div><section-title>Rooms</section-title></div>
      <form class="search" action="">
        <label for="search" class="icon">
          <i class="icon-search"></i>
        </label>
        <input type="text" id="search" class="input" placeholder="Search rooms...">
      </form>
    </div>
    <div class="list">
      <div class="room" v-for="(room, key) in rooms" :key="key">
        <nuxt-link to="/rooms/slug">
          <div class="light box hover p-1">
            <div class="user-img">
              <i class="icon-heart"></i>
            </div>
            <div class="user-name">
              {{room.name}}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rooms: [
          {name: 'Music'},
          {name: 'Films'},
          {name: 'Gaming'},
          {name: 'Sport'},
          {name: 'Political'}
        ]
      }
    }
  }
</script>

<style lang="scss">
  .rooms{
    margin-bottom: 3rem;

    .heading{
      display: flex;
      justify-content: space-between;
    }

    .list{
      margin-left: -0.5rem;
      margin-right: -0.5rem;
      display: flex;
      flex-wrap: wrap;

      .room{
        flex: 0 0 33.3333333%;
        max-width: 33.3333333%;
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
  }
</style>
