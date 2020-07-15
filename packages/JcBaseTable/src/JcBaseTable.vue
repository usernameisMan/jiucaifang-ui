<template>
  <el-table
    :data="dataSource"
    v-bind="{...props}"
    @selection-change="(val)=> $emit('selection-change', val)"
  >
    <el-table-column v-if="$listeners['selection-change']" type="selection" width="55" />
    <el-table-column
      v-for="({dataIndex = '', label = '', props = {}, custom = false, render = ''}, i) in columns"
      :key="i"
      :prop="dataIndex"
      :label="label"
      v-bind="{...props}"
    >
      <template slot-scope="scope">
        <slot v-if="$scopedSlots[dataIndex]" v-bind:scope="scope" :name="dataIndex"></slot>
        <span v-else>{{ render ? render(scope.row) : scope.row[dataIndex]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);

export default {
  name: "JcBaseTable",
  props: {
    columns: {
      default: () => []
    },
    dataSource: {
      default: () => []
    },
    props: {
      default: () => {
        style: "width: 100%";
      }
    },
  },
  methods: {}
};
</script>
