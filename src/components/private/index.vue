
<template>
  <div id="table_app">
    <div class="wrapper">
      <header class="topnavbar-wrapper">
        <!-- START Top Navbar-->
        <nav role="navigation" class="navbar topnavbar">
          <!-- START navbar header-->
          <div class="navbar-header">
            <a href="/" class="navbar-brand">
              <div class="brand-logo">
                <img src="/static/img/logo.png" alt="App Logo" class="img-responsive">
              </div>
              <div class="brand-logo-collapsed">
                <img src="/static/img/logo-single.png" alt="App Logo" class="img-responsive">
              </div>
            </a>
          </div>
          <!-- END navbar header-->
          <!-- START Nav wrapper-->
          <div class="nav-wrapper">
            <!-- START Left navbar-->
            <ul class="nav navbar-nav">
              <li>
                <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                <a data-toggle-state="aside-collapsed" class="hidden-xs" title="Collapse/expand sidebar" @click="openAside =! openAside">
                  <icon name="bars"></icon>
                </a>
                <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->
                <a href="#" data-toggle-state="aside-toggled" data-no-persist="true" class="visible-xs sidebar-toggle">
                  <icon name="bars"></icon>
                </a>
              </li>
              <!-- START User avatar toggle-->
              <li>
                <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                <a id="user-block-toggle" href="#user-block" data-toggle="collapse" title="Show/hide user block">
                  <icon name="user"></icon>
                </a>
              </li>
              <!-- END User avatar toggle-->
              <!-- START lock screen-->
              <li>
                <a class="ceil_bar_hover" title="Logout" v-on:click="logout">
                  <icon name="sign-out"></icon>
                </a>
              </li>

              <!-- END lock screen-->
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <!-- Search icon-->
              <li>
                <a v-if="sip" class="ceil_bar_hover" title="Enable Video" style="color:#0f0">
                  <icon name="video-camera"></icon>
                </a>
              </li>
              <li>
                <a v-if="sip" class="ceil_bar_hover" title="Enable Voice" style="color:#0f0">
                  <icon name="microphone"></icon>
                </a>
              </li>
              <li>
                <a v-if="xmpp" class="ceil_bar_hover" title="Enable IM" style="color:#0f0">
                  <icon name="comment"></icon>
                </a>
              </li>
              <!-- Fullscreen (only desktops)-->
              <!-- END Offsidebar menu-->
            </ul>
            <!-- END Right Navbar-->
          </div>
        </nav>
        <!-- END Top Navbar-->
      </header>
      <aside class="aside" v-show="openAside">
        <div></div>
        <!-- START Sidebar (left)-->
        <div class="aside-inner" v-bind:style="{height: height+'px'}">
          <nav data-sidebar-anyclick-close="" class="sidebar">
            <!-- START sidebar nav-->
            <ul class="nav">
              <!-- START user info-->
              <li class="has-user-block">
                <div id="user-block">
                  <div class="item user-block">
                    <!-- User picture-->
                    <div class="user-block-picture">
                      <a href="" data-toggle="modal">
                        <div class="user-block-status">
                          <img src="/static/img/userpic.png" alt="Avatar" title="Click to edit" width="60" height="60" class="img-thumbnail img-circle">
                          <div class="circle circle-success circle-lg"></div>
                        </div>
                      </a>
                    </div>
                    <!-- Name and Job-->
                    <div class="user-block-info">
                      <span class="user-block-name">Hello, {{currentUser.firstName}} {{currentUser.lastName}} </span>
                      <!--<span class="user-block-role"></span>-->
                    </div>
                  </div>
                </div>
              </li>
              <!-- END user info-->
              <!-- Iterates over all sidebar items-->
              <li class="nav-heading ">
                <span data-localize="sidebar.heading.HEADER">Main menu</span>
              </li>
              <router-link active-class="active" tag="li" :to='{name:"demo"}'>
                <a>
                  <icon name="play-circle-o"></icon>
                  <span>Demo</span>
                </a>
              </router-link>
              <router-link active-class="active" tag="li" :to='{name:"contacts"}'>
                <a>
                  <icon name="user"></icon>
                  <span>Contacts</span>
                </a>
              </router-link>
            </ul>
            <!-- END sidebar nav-->
          </nav>
        </div>
        <!-- END Sidebar (left)-->
      </aside>
      <el-popover :value="calling" popper-class="popover-chat" ref="dynamic" placement="bottom" width="700" trigger="click">
        <div style="max-width:600px">
          <video style="max-width:600px" v-show="calling" id="remoteVideo"></video>
        </div>
        <div style="max-width:200px">
          <video style="max-width:200px" v-show="calling" id="localVideo" muted="muted"></video>
        </div>
        <el-button v-show="calling" @click="hangup()">Hangup</el-button>
      </el-popover>

      <div style="position:fixed; bottom:0; right:0">
        <el-button ref="btnChat" v-show="calling" v-popover:dynamic>Video Call</el-button>
        <popoverchat v-for="chat in chats" :room="chat.room" :key="chat.uuid" :uuid="chat.uuid" :session="chat.session"></popoverchat>
      </div>

      <section class="sec" v-bind:class="{styleSec: openAside}" v-bind:style="{'min-height': (height-120)+'px'}">
        <router-view></router-view>
      </section>

      <footer>
        <span>Opentact DEMO v2 © 2017</span>
      </footer>
    </div>

  </div>
</template>

<script type="text/javascript">
//**** local Storgs
var userId = localStorage.getItem("userUuid");
var userDevToken = localStorage.getItem("userDevToken");
var newAuthadmin = localStorage.getItem("newAuthadmin");
var developer_name = localStorage.getItem("dev_name");
var devCount = localStorage.getItem("devCount");
import ModuleContent from "@/components/common/ModuleContent";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { EventBus } from "@/eventbus";
import popoverchat from "./popoverchat";

import "vue-awesome/icons/bars";
import "vue-awesome/icons/user";
import "vue-awesome/icons/sign-out";
import "vue-awesome/icons/play-circle-o";
import "vue-awesome/icons/user";
import "vue-awesome/icons/video-camera";
import "vue-awesome/icons/microphone";
import "vue-awesome/icons/comment";

import Opentact from "opentactv2";

export default {
  name: "table_app",
  components: {
    ModuleContent,
    popoverchat
  },
  data() {
    return {
      ringing: false,
      calling: false,
      sip: false,
      chats: [],
      xmpp: false,
      sessionRinging: {},
      client: {},
      userBalance: 0,
      openAside: true
    };
  },
  created: function() {
    this.updateViewportSize();
    this.setResizeListener();
    this.client = new Opentact({
      appId: this.currentUser.appUuid,
      sipProxy: "sipjs.onsip.com",
      sipWsUrl: "wss://edge.sip.onsip.com:8443"
    });

    this.client.on("call:received", session => {
      this.ringing = true;
      this.sessionRinging = session;
      this.$message.success("Incomming Call");
      this.$router.push({ name: "demo" });

      this.$confirm("incoming call ", "success", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "success"
      })
        .then(() => {
          this.acceptCall();
        })
        .catch(() => {
          this.rejectCall();
        });
    });

    EventBus.$on("call:makeCall", call => {
      if (!this.sip) {
        this.$message.error("VIDEO and Audio it is no ready");
      } else {
        console.log("call: ", call);
        this.sessionRinging = this.client.call(call);
      }
      //todo implements all types
    });
    EventBus.$on("im:startSession", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
      } else {
        this.client.im(call);
      }
    });
    EventBus.$on("im:joinRoom", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
      } else {
        this.client.joinRoom(call.name, call.nick);
      }
    });
    EventBus.$on("im:sendMessage", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
        return;
      }
      this.client.imMessage(call);
    });
    EventBus.$on("im:createRoom", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
        return;
      }
      this.client.createRoom(call.name);
    });
    EventBus.$on("im:sendMessageRoom", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
        return;
      }
      console.log("SEND MESSAGE ROOM", call);
      this.client.sendMessageRoom(call.to, call.message);
    });
    EventBus.$on("im:getAllRooms", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
        return;
      }
      this.client.getAllRooms(call.cb);
    });
    EventBus.$on("im:getMembersRoom", call => {
      if (!this.xmpp) {
        this.$message.error("Chat it is no ready");
        return;
      }
      this.client.getMembersRoom(call.name, call.cb);
    });
    EventBus.$on("askConnection", call => {
      EventBus.$emit("connection", { xmpp: this.xmpp, sip: this.sip });
    });

    this.client.on("call:rejected", session => {
      this.ringing = false;
      this.calling = false;
    });
    this.client.on("call:terminated", session => {
      this.ringing = false;
      this.calling = false;
    });

    this.client.on("call:started", session => {
      this.ringing = false;
      this.calling = true;
    });

    this.client.on("error", auth => {
      console.log("error ", auth);
    });

    this.client.on("authenticate", auth => {
      auth.callback(this.currentUser.token);
    });

    this.client.on("connection", conn => {
      console.log("connection: ", conn.sip, conn.xmpp);
      this.sip = conn.sip;
      this.xmpp = conn.xmpp;
      EventBus.$emit("connection", conn);
    });

    this.client.on("im:started", session => {
      let exists = false;
      for (let i in this.chats) {
        if (
          this.chats[i] &&
          this.chats[i].session &&
          this.chats[i].session.remoteUser == session.remoteUser
        ) {
          exists = true;
        }
      }
      if (!exists) {
        this.chats.push({
          uuid: session.remoteUser,
          session: session,
          room: false
        });
      }
    });
    this.client.on("im:presence", session => {
      console.log("im:presence id: =====================>", session);
    });
    this.client.on("im:subscription", session => {
      console.log("im:subscription id: =====================>", session);
    });
    this.client.on("im:subscribed", session => {
      EventBus.$emit("im:subscribed", session);
    });
    this.client.on("im:sending", session => {
      console.log("im:sending id: =====================>", session);
    });
    this.client.on("xmpp:error", session => {
      console.log("xmpp:error: =====================>", session);
    });
    this.client.on("im:state", session => {
      console.log("im:state id: =====================>", session);
    });
    this.client.on("im:error", session => {
      console.log("im:error id: =====================>", session);
    });
    this.client.on("im:receipt", session => {
      console.log("im:receipt id: =====================>", session);
    });

    this.client.on("im:chat", msg => {
      console.log("im:chat ", msg);
    });
    this.client.on("im:groupchat", msg => {
      EventBus.$emit("im:groupchat", msg);
      console.log("im:groupchat", msg);
    });
    this.client.on("im:error", msg => {
      console.error("im:error", msg);
    });
    this.client.on("im:muc:declined", msg => {
      console.log("im:muc:declined ", msg);
    });
    this.client.on("im:muc:destroyed", msg => {
      console.log("im:muc:destroyed ", msg);
    });
    this.client.on("im:muc:error", msg => {
      console.log("im:error ", msg);
    });
    this.client.on("im:muc:invite", msg => {
      console.log("im:muc:invite ", msg);
    });
    this.client.on("im:muc:join", session => {
      console.log("JOIN ROOM", session);
      let exists = false;
      for (let i in this.chats) {
        if (
          this.chats[i] &&
          this.chats[i].session &&
          this.chats[i].session.from &&
          this.chats[i].session.from.local &&
          this.chats[i].session.from.local == session.from.local
        ) {
          exists = true;
        }
      }
      if (!exists) {
        session.remoteUser = session.from.local;
        this.chats.push({
          uuid: session.from.local,
          session: session,
          room: true
        });
      }
    });
    this.client.on("im:muc:leave", msg => {
      console.log("im:muc:leave ", msg);
    });
    this.client.on("im:muc:subject", msg => {
      console.log("im:muc:subject ", msg);
    });
    this.client.on("im:muc:unavailable", msg => {
      console.log("im:muc:unavailable ", msg);
    });

    this.client.on("im:message", session => {
      setTimeout(() => {
        EventBus.$emit("im:message", session);
      }, 50);
    });

    this.client.connect({
      identity: this.currentUser.uuid
    });
  },
  computed: {
    ...mapState("screen", ["width", "height"]),
    ...mapGetters("session", ["currentUser"])
  },

  mounted: function() {},

  methods: {
    ...mapActions("session", ["logout"]),
    ...mapMutations("screen", ["updateWidth", "updateHeight"]),
    acceptCall() {
      this.client.accept({
        id: this.sessionRinging.id
      });
      this.ringing = false;
    },
    hangup() {
      this.client.hangup({
        id: this.sessionRinging.id
      });
    },
    handleClose() {},
    rejectCall() {
      this.client.reject({
        id: this.sessionRinging.id
      });
      this.ringing = false;
    },
    updateViewportSize() {
      const width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const height = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      this.updateWidth(width);
      this.updateHeight(height);
    },
    setResizeListener() {
      this.updateViewportSize();
      window.addEventListener("resize", this.updateViewportSize);
    }
  }
};
</script>

<style >
.dataTables_wrapper .el-table__row td:last-child .cell {
  padding: 0;
}
.dataTables_wrapper .el-table__row td:last-child .cell .action-list span {
  margin-right: 0px;
}
.dataTables_wrapper
  .el-table__row
  td:last-child
  .cell
  .action-list
  span
  button {
  padding: 7px;
}
</style>