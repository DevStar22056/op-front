<template>
  <div
    class="message is-flex is-align-center is-justify-center"
    :style="{ backgroundColor }">
    <span class="message__text">{{ content }}</span>
    <span class="message__icon" @click="setMessage(null)">
      <icon name="x"></icon>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import '@icons/x'

export default {
  name: 'message',
  computed: {
    ...mapState('message', {
      content: state => state.content,
      type: state => state.type
    }),
    backgroundColor () {
      switch (this.type) {
        case 'success':
          return '#43c04e'
        case 'warning':
          return '#febe00'
        case 'error':
          return '#ff4f60'
      }
    }
  },
  methods: {
    ...mapMutations('message', ['setMessage'])
  }
}
</script>

<style lang="stylus" scoped>
.message
  position fixed
  top 0px
  left 50%
  transform translateX(-50%)
  min-height 40px
  width calc(100% - 2em)
  max-width 430px
  border-radius 100px
  z-index 3000      
  padding .5em 1.5em
  box-sizing border-box

.message__text
  color #fff

.message__icon
  position absolute
  right 15px
  top 50%
  margin-top 2px
  transform translateY(-50%)
  cursor pointer

  >>> g
    fill #fff

  &:hover >>> g
    fill rgba(255, 255, 255, .85)
</style>
