<template>
  <el-form :model="object" :rules="getRules" v-bind="{...props}">
    <el-form-item
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :prop="item.dataIndex"
    >
      <jc-form-item v-if="item.type !== 'container'" :object="object" :item="item" />
      <jc-form-item
        v-else
        v-for="(content, containerIndex) in item.container"
        :key="containerIndex"
        :object="object"
        :item="content"
      />
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from "vue";
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Option,
  RadioGroup,
  Radio,
  Switch,
  DatePicker,
  TimeSelect,
  TimePicker,
  Checkbox,
  CheckboxGroup,
} from "element-ui";
import JcFormItem from "./component/JcFormItem";

Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(RadioGroup);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);

export default {
  name: "JcBaseForm",
  components: {
    JcFormItem,
  },
  props: {
    props: {
      default: () => {
        return {
          labelWidth: "100px",
        };
      },
    },
    object: {
      default: {},
    },
    items: {
      default: () => [{}],
    },
  },
  computed: {
    getRules() {
      const rules = this.items.reduce((accumulator, currentValue) => {
        const { rules = "", dataIndex = "" } = currentValue;
        if (rules) {
          accumulator[dataIndex] = rules;
          return accumulator;
        }
        return accumulator;
      }, {});

      return rules;
    },
  },
  methods: {},
};
</script>

<style>
</style>