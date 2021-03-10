import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Table,
  Input,
  Form,
  TabPane,
  Tabs,
  FormItem,
  TableColumn,
  Breadcrumb,
  Popover,
  BreadcrumbItem,
  Pagination,
  MessageBox,
  Select,
  Option,
  Loading
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'
import { DataTablesServer } from 'vue-data-tables'
import DataTables from 'vue-data-tables'

locale.use(lang)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Dialog.name, Dialog)
Vue.component(Table.name, Table)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Form.name, Form)
Vue.component(Popover.name, Popover)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(MessageBox.name, MessageBox)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(DataTables.name, DataTables)
Vue.component(DataTablesServer.name, DataTablesServer)

Vue.use(Loading.directive)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt