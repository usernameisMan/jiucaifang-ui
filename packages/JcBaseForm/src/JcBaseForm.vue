<template>
  <el-form :model="object" :rules="getRules" v-bind="{...props}">
    <el-form-item
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :prop="item.dataIndex"
    >
      <el-input
        :placeholder="`请输入${item.label}`"
        v-bind="{...item.props}"
        v-if="item.type == 'input'"
        v-model="object[item.dataIndex]"
        :disabled="item.disabled"
        clearable
      />
      <el-input
        :placeholder="`请输入${item.label}`"
        v-bind="{...item.props}"
        v-if="item.type == 'textarea'"
        v-model="object[item.dataIndex]"
        type="textarea"
        :disabled="item.disabled"
        clearable
      />
      <el-input-number
        controls-position="right"
        :placeholder="`请输入${item.label}`"
        v-if="item.type == 'inputNumber'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      />
      <el-select
        :placeholder="`请输入${item.label}`"
        v-if="item.type == 'select'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
        clearable
      >
        <el-option
          v-for="option in item.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
      <el-switch
        v-if="item.type == 'switch'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        inactive-color="#ff4949"
        :disabled="item.disabled"
      />
      <el-radio-group
        v-if="item.type == 'radio'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      >
        <el-radio
          v-for="option in item.options"
          :key="option.value"
          :label="option.value"
        >{{option.label}}</el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-if="item.type == 'checkbox'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      >
        <el-checkbox
          v-for="option in item.options"
          :key="option.value"
          :label="option.value"
          :name="item.dataIndex"
        >{{option.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 时间控件 -->
      <el-time-select
        placeholder="选择时间"
        v-if="item.type == 'time'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      />
      <el-time-picker
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        v-if="item.type == 'timePicker'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      />
      <el-date-picker
        v-if="item.type == 'date'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        type="date"
        placeholder="选择日期"
        :disabled="item.disabled"
      />
      <el-date-picker
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        v-if="item.type == 'daterange'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        type="daterange"
        :disabled="item.disabled"
      />
      <el-date-picker
        type="datetime"
        placeholder="选择日期时间"
        v-if="item.type == 'datetime'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      />
      <el-date-picker
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
        v-if="item.type == 'datetimerange'"
        v-model="object[item.dataIndex]"
        v-bind="{...item.props}"
        :disabled="item.disabled"
      />
      <el-button
        v-if="typeof item.operation == 'object'"
        @click="item.operation.event(object)"
      >{{item.operation.label}}</el-button>
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
  CheckboxGroup
} from "element-ui";

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
  props: {
    props: {
      default: () => {
        return {
          labelWidth: "100px"
        };
      }
    },
    object: {
      default: {}
    },
    items: {
      default: () => [{}]
    }
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
    }
  },
  methods: {}
};
</script>

<style>
</style>