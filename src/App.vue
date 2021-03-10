<template>
  <div id="app"
  >
    <router-view></router-view>
    <transition name="slide-fade-top">
      <app-message v-if="messageContent"></app-message>
    </transition>
  </div>
  
</template>

<script>
import store from "@/store";
import { mapState, mapGetters, mapMutations } from "vuex";
import AppMessage from "@/components/common/Message";

export default {
  name: "app",
  components: {
    AppMessage
  },
  computed: {
    ...mapState({
      messageContent: state => state.message.content
    })
  },
  updated() {
    if ("/" === this.$route.path) {
      store
        .dispatch("session/verifyAuthentication")
        .then(u => {
          this.$router.push({ name: "demo" });
        })
        .catch(e => {
          this.$router.push({ name: "login" });
        });
    }
  },
  methods: {
    setBodyBackground() {}
  }
};
</script>
