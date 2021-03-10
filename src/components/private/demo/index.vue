
<template>
  <div id="table_app">
    <module-content>
      <span slot="title">Demo</span>
      <span slot="description">Demo</span>
      <div slot="content">

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <h1>Contacts</h1>
            <div v-if="!xmpp && !sip">
              LOADING...
            </div>
            <data-tables-server v-if="xmpp || sip" :data="app_data" :total="app_data_total" :search-def="tableOptions.searchDef" :actions-def="tableOptions.actionsDef" :checkbox-filter-def="tableOptions.checkFilterDef" :action-col-def="tableOptions.actionColDef" :pagination-def="tableOptions.paginationDef" :load-data="getData">

              <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">

              </el-table-column>

              <el-table-column label="Actions" width="100">
                <template slot-scope="scope">
                  <div style="text-align:center">
                    <el-button size="mini" v-if="sip" @click="makeCall(scope.row)">Call</el-button>
                    <el-button size="mini" v-if="xmpp" @click="makeChat(scope.row)">Chat</el-button>
                  </div>
                </template>

              </el-table-column>

              </el-table-column>
            </data-tables-server>
          </div>
          <div class="col-xs-12 col-md-6" v-if="xmpp">
            <h1>Rooms</h1>
            <div v-if="!xmpp">
              LOADING...
            </div>
            <data-tables-server v-if="xmpp" :data="app_data_rooms" :total="app_data_total_rooms" :search-def="tableOptionsRooms.searchDef" :actions-def="tableOptionsRooms.actionsDef" :checkbox-filter-def="tableOptionsRooms.checkFilterDef" :action-col-def="tableOptionsRooms.actionColDef" :pagination-def="tableOptionsRooms.paginationDef" :load-data="getDataRooms">

              <el-table-column v-for="title in titlesRooms" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">

              </el-table-column>

              <el-table-column label="Actions" width="100">
                <template slot-scope="scope">
                  <div style="text-align:center">
                    <el-button size="mini" @click="joinRoom(scope.row)">Chat</el-button>
                  </div>
                </template>

              </el-table-column>

              </el-table-column>
            </data-tables-server>
          </div>
        </div>

      </div>
    </module-content>

  </div>
</template>

<script type="text/javascript">
import ModuleContent from "@/components/common/ModuleContent";
import { TableHelper } from "@/utilities/TableHelper";
import config from "@/config";
import { mapState, mapGetters, mapMutations } from "vuex";
import { EventBus } from "@/eventbus";
import * as Q from "q";

//**** local Storgs
let titles = [
  {
    prop: "firstName",
    label: "First Name"
  },
  {
    prop: "lastName",
    label: "Last Name"
  },
  {
    prop: "email",
    label: "Email"
  }
];
let titlesRooms = [
  {
    prop: "name",
    label: "Name"
  }
];
export default {
  name: "table_app",
  components: {
    ModuleContent
  },
  data() {
    EventBus.$on("connection", call => {
      this.xmpp = call.xmpp;
      this.sip = call.sip;
    });

    let tablRoom = TableHelper.defaultOptions(
      () => {
        console.log("created");
      },
      row => {
        console.log("EDITEd", row);
      },
      row => {
        console.log("DELETE ", row);
      }
    );
    tablRoom.actionsDef = {
      def: [
        {
          name: "Create",
          handler: () => {
            this.$prompt("Please input room name", "Tip", {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel"
            })
              .then(value => {
                EventBus.$emit("im:createRoom", { name: value.value });
              })
              .catch(() => {});
          }
        }
      ]
    };
    tablRoom.searchDef.colProps = {
      span: 10,
      offset: 9
    };

    return {
      titles,
      titlesRooms,
      tableOptions: TableHelper.defaultOptions(
        () => {
          console.log("created");
        },
        row => {
          console.log("EDITEd", row);
        },
        row => {
          console.log("DELETE ", row);
        }
      ),
      tableOptionsRooms: tablRoom,
      currentApp: {},
      xmpp: false,
      sip: false,
      loading: false,
      app_data: [],
      app_data_total: 0,
      app_data_rooms: [],
      app_data_total_rooms: 0
    };
  },
  computed: {
    ...mapGetters("session", ["currentUser"])
  },
  created() {
    EventBus.$emit("askConnection");
    EventBus.$on("im:started", call => {
      this.$message.success("session Started");
    });
  },

  methods: {
    makeCall(user) {
      EventBus.$emit("call:makeCall", {
        to: user.uuid,
        video: true,
        audio: true
      });
    },
    makeChat(user) {
      EventBus.$emit("im:startSession", {
        to: user.uuid
      });
    },
    joinRoom(room) {
      EventBus.$emit("im:joinRoom", {
        name: room.name,
        nick: this.currentUser.uuid
      });
    },
    getDataRooms: async function(filter) {
      let deferred = Q.defer();
      EventBus.$emit("im:getAllRooms", {
        cb: (error, data) => {
          if (error) {
            deferred.reject(error);
          }
          this.app_data_rooms = data[0];
          this.app_data_total_rooms = data[1];
          deferred.resolve({
            data: data[0],
            total: data[1]
          });
        }
      });
      return deferred.promise;
    },
    getData: async function(filter) {
      this.lastFilter = filter;
      console.log("filter ", filter.filters[0].vals[0]);
      this.loading = true;
      let response = await this.$http.get("/contacts/current", {
        params: {
          limit: filter.pageSize,
          offset: filter.page - 1,
          orderBy: filter.sortInfo.prop || "firstName",
          orderType: filter.sortInfo.order || "ascending"
        }
      });
      if (!response || !response.data || !Array.isArray(response.data)) {
        this.app_data = [];
        this.app_data_total = 0;
      } else {
        this.app_data = response.data[0];
        this.app_data_total = response.data[1];
      }
      return {
        data: this.app_data,
        total: this.app_data_total
      };
    }
  }
};
</script>
