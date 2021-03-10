<template>
  <div style="background: #e5e5e5;">
    <div class="menu">
      <div class="name">{{name}}
        <el-button v-if="room" size="mini" @click="showMembers = !showMembers">Members</el-button>
      </div>
    </div>
    <ol class="chat" ref="chat" v-if="!showMembers">
      <li v-for="msg in messages" :key="msg.id" :class="{'self':msg.from === currentUser.uuid || msg.from.resource === currentUser.uuid, 'other': msg.from !== currentUser.uuid && msg.from.resource !== currentUser.uuid }">
        <div class="msg">
          <p v-if="room"><strong>{{getName(msg)}}</strong></p>
          <p>{{msg.body}}</p>
          <time>20:17</time>
        </div>
      </li>
    </ol>
    <ol class="chat" ref="chat" v-if="showMembers">
      <li v-for="member in members" :key="member.nick">
        <div class="msg">
          <p>{{member.identity.name}}</p>
        </div>
      </li>
    </ol>
    <form v-on:submit.prevent="send">
      <input type="text" class="textarea" v-model="message" placeholder="Type here!" />
    </form>
  </div>
</template>

<script type="text/javascript">
import config from "@/config";
import { mapState, mapGetters, mapMutations } from "vuex";
import { EventBus } from "@/eventbus";

export default {
  name: "chat",
  data() {
    return {
      showMembers: false,
      message: "",
      members: [],
      messages: []
    };
  },
  computed: {
    ...mapGetters("session", ["currentUser"])
  },

  created() {
    if (!this.room) {
      EventBus.$on("im:message", call => {
        if (call && call.body && this.session.remoteUser === call.from) {
          this.messages.push(call);
          this.scrollBtm();
        }
      });
    }
    if (this.room) {
      EventBus.$emit("im:getMembersRoom", {
        name: this.uuid,
        cb: (error, data) => {
          if (error) {
            return;
          }
          this.members = data;
        }
      });

      EventBus.$on("im:groupchat", call => {
        if (call && call.body && this.uuid === call.from.local) {
          this.messages.push(call);
          this.scrollBtm();
        }
      });
    }
    EventBus.$on("im:subscribed", call => {
      console.log("SUSBSCRIBED ", call);
    });
  },
  methods: {
    validateAllChatNames() {
      for (let index = 0; index < this.messages.length; index++) {
        this.validateName(this.messages[index]);
      }
    },
    validateName(call) {
      if (this.members) {
        for (let index = 0; index < this.members.length; index++) {
          const element = this.members[index];

          if (element.identity.userId === call.from.resource) {
            call.name = element.identity.name;
            break;
          }
        }
      }
    },
    getName(call){
      this.validateName(call);
      return call.name || '';
    },
    scrollBtm() {
      setTimeout(_ => {
        let elem = this.$refs["chat"];
        elem.scrollTop = elem.clientHeight;
      }, 800);
    },
    send() {
      if (!this.message) {
        return;
      }

      if (this.room) {
        EventBus.$emit("im:sendMessageRoom", {
          to: this.uuid,
          message: this.message
        });
      } else {
        this.messages.push({
          from: this.currentUser.uuid,
          body: this.message,
          to: this.session.remoteUser
        });
        EventBus.$emit("im:sendMessage", {
          to: this.session.remoteUser,
          message: this.message
        });
      }
      this.message = "";
      this.scrollBtm();
    }
  },

  props: {
    name: {
      type: String,
      required: true
    },
    uuid: {
      type: String,
      required: true
    },
    room: {
      type: Boolean
    },
    session: {
      type: Object,
      required: true
    }
  }
};
</script>
