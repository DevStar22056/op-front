
<template>
<div id="table_app" >
  <module-content>
    <span slot="title">Contacts</span>
    <span slot="description">Contacts App</span>
    <div slot="content">
      <data-tables-server 
      :data="app_data" 
      :total="app_data_total"
      :search-def="tableOptions.searchDef"
      :actions-def="tableOptions.actionsDef" 
      :checkbox-filter-def="tableOptions.checkFilterDef" 
      :action-col-def="tableOptions.actionColDef" 
      :pagination-def="tableOptions.paginationDef"
      :load-data="getData">

      <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">

    </el-table-column>

   <el-table-column prop="followed" label="Followed"  width="100">
     <template slot-scope="scope" >
       <div style="text-align:center">
           <icon v-if="scope.row.followed" style="color:#080" name="check-circle-o"></icon>
       <el-button
          v-if="!scope.row.followed"
          size="mini"
          @click="follow(scope.row)">Follow</el-button>
          </div>
     </template>
       
     
    </el-table-column>

    </el-table-column>
  </data-tables-server>
    </div>
  </module-content>

</div>
</template>

<script type="text/javascript">
import ModuleContent from "@/components/common/ModuleContent";
import { TableHelper } from "@/utilities/TableHelper";
import config from "@/config";
import { mapState, mapGetters, mapMutations } from "vuex";
import "vue-awesome/icons/circle-thin";
import "vue-awesome/icons/check-circle-o";
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

export default {
  name: "table_app",
  components: {
    ModuleContent
  },
  data() {
    return {
      titles,
      lastFilter: {},
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
      currentApp: {},
      app_data: [],
      app_data_total: 0
    };
  },
  computed: {
    ...mapGetters("session", ["currentUser"])
  },

  methods: {
    async follow(row) {
      try {
        let resp = await this.$http.post("/contacts/follow/" + row.uuid);
        this.$message.success("followed!");
        this.getData(this.lastFilter);
      } catch (error) {
        this.$message.error("error! try again");
      }
    },
    getData: async function(filter) {
      this.lastFilter = filter;
      console.log("filter ", filter.filters[0].vals[0]);
      let paramsRequest = TableHelper.selectParams(this.lastFilter, "firstName");
      this.loading = true;
      let response = await this.$http.get("/contacts", paramsRequest);
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
