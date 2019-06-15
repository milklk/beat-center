import Vue from "vue";
import {
  Message,
  Form,
  FormItem,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  menuItem,
  MenuItemGroup,
  Tag,
  Input,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  DatePicker,
  Upload,
  Loading,
  Dialog,
  Cascader,
  Steps
} from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Checkbox);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(menuItem);
Vue.use(MenuItemGroup);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Upload);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Cascader);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
