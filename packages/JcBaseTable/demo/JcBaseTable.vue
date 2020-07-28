<template>
  <JcBaseTable :dataSource="dataSource" :columns="columns" @selection-change="handleSelectionChange">
    <template v-slot:operation="{scope}">
      <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
    </template>
    <template v-slot:name="{scope}">
      <el-tag size="medium">{{ scope.row.name }}</el-tag>
    </template>
  </JcBaseTable>
</template>

<script>
import Vue from "vue";
import { Button, Tag } from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
import JcBaseTable from "../src/JcBaseTable";

Vue.use(Button);
Vue.use(Tag);

export default {
  name: "JcBaseTableDemo", // 使用时候的组件名
  components: {
    JcBaseTable
  },
  data() {
    return {
      dataSource: [
        {
          date: "1996",
          name: "lenlee",
          address: "成都",
          status: 1,
          sex: 0
        },
        {
          date: "1996",
          name: "lenlee",
          address: "成都",
          status: 0,
          sex: 1
        }
      ],
      columns: [
        {
          label: "日期",
          dataIndex: "date",
          props: {
            width: "200"
          }
        },
        {
          label: "姓名",
          dataIndex: "name"
        },
        {
          label: "性别",
          dataIndex: "sex",
          render: row => row.sex ? '男' : '女'
        },
        {
          label: "状态",
          dataIndex: "status",
          render: row => row.status ? `<img src="${this.getIMG(row.status)}"/>` : `<i class="el-icon-error"/>`
        },
        {
          label: "地址",
          dataIndex: "address",
        },
        {
          label: "操作",
          dataIndex: "operation",
        }
      ]
    };
  },
  methods: {
    handleEdit(scope) {
      console.log(scope);
    },
    getIMG(val) {
      return 'https://www.easyicon.net/api/resizeApi.php?id=1170860&size=24'
    },
    handleSelectionChange (val) {
      console.log(val)
    }
  }
};
</script>