<template>
  <div class="dynamic-popover" style="display:inline">
    <el-popover :value="visible" popper-class="popover-chat" ref="dynamic" placement="bottom" width="400" trigger="click">
      <chat :uuid="uuid" :room="room" :name="name" :session="session"></chat>
    </el-popover>
    <el-button ref="btnChat" v-show="name" v-popover:dynamic>{{name}}</el-button>
  </div>
</template>
<script>
import Chat from "./chat";

export default {
  components: {
    Chat
  },
  props: {
    uuid: {
      type: String,
      required: true
    },
    session: {
      type: Object,
      required: true
    },
    room: {
      type: Boolean
    }
  },
  async created() {
    try {
      if (this.room) {
        this.name = this.uuid;
      } else {
        let resp = await this.$http.get("/contacts/" + this.uuid);
        this.name = resp.data.firstName + " " + resp.data.lastName;
      }
      setTimeout(_ => {
        this.visible = true;
      }, 100);
    } catch (error) {}
  },
  data() {
    return {
      visible: false,
      name: ""
    };
  },
  name: "popoverchat"
};
</script>