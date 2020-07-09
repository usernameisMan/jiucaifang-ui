# jiucaifang(韭菜坊)
开发这个库的目的是缩短工作时间，把更多的时间留给生活、学习而不是工作。   
对 element-ui 的二次封装，减少原 element-ui 使用时候代码量(约50%)，使项目具备较好的维护性。
# 入门文档

## 安装

```bash
npm install element-ui -s
npm i jiucaifang -s
```

在 main.js 中写入以下内容：

```js
import jiucaifang from "jiucaifang";
import "jiucaifang/lib/index.css";

Vue.use(jiucaifang);
```

# 组件文档

## JcBaseTable

```vue
<template>
  <JcBaseTable :dataSource="dataSource" :columns="columns">
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
          address: "成都"
        },
        {
          date: "1996",
          name: "lenlee",
          address: "成都"
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
          label: "地址",
          dataIndex: "address"
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
    }
  }
};
</script>

```

### JcBaseTable参数
| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| columns | 信息 | `array[columns]` | `必选`      | `[]` |
| dataSource | 信息 | `array[dataSource]` | `必选` | `[]` |

columns
| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| label | 显示的标题 | `string` |       | |
| dataIndex | 对应列内容的字段名 | `string` |  | |
| props | [Table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes) | `object` |  | |

  



## JcBaseFrom
这个写法虽然看上去长，但事实上比原实现方式减少约 350 个字符
```vue
<template>
  <JcBaseFrom ref="baseForm" :items="items" :object="object">
    <el-button @click="submitForm">立即创建</el-button>
    <el-button @click="resetForm">重置</el-button>
  </JcBaseFrom>
</template>

<script>
import JcBaseFrom from "../src/JcBaseFrom";

export default {
  name: "JcBaseFromDemo",
  components: {
    JcBaseFrom
  },
  data() {
    return {
      object: {
        activeName: "电器特惠活动",
        activeArea: "2",
        activeDate: "",
        timelyDelivery: false,
        natureActivities: ["1"], //如果不是数组类型会出问题
        specialResources: "1"
      },
      items: [
        {
          type: "input",
          label: "活动名称",
          dataIndex: "activeName",
          rules: [{ required: true, message: "请输入活动名称" }]
        },
        {
          type: "select",
          label: "活动区域",
          dataIndex: "activeArea",
          props: {
            style: "width: 100%"
          },
          options: [
            {
              label: "区域一",
              value: "1"
            },
            {
              label: "区域二",
              value: "2"
            }
          ]
        },
        {
          type: "switch",
          label: "即时配送",
          dataIndex: "timelyDelivery"
        },
        {
          type: "checkbox",
          label: "活动性质",
          dataIndex: "natureActivities",
          options: [
            {
              label: "美食/餐厅线上活动",
              value: "1"
            },
            {
              label: "地推活动",
              value: "2"
            },
            {
              label: "线下主题活动",
              value: "3"
            },
            {
              label: "单纯品牌曝光",
              value: "4"
            }
          ]
        },
        {
          type: "radio",
          label: "特殊资源",
          dataIndex: "specialResources",
          options: [
            {
              label: "线上品牌商赞助",
              value: "1"
            },
            {
              label: "线下场地免费",
              value: "2"
            }
          ]
        }
      ],
    };
  },
  methods: {
    submitForm() {
      const [from] = this.$refs.baseForm.$children;
      from.validate(valid => {
        if (valid) {
          console.log("submit!", this.object);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      const [from] = this.$refs.baseForm.$children;
    }
  }
};
</script>
```

### JcBaseFrom参数
| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| items | 信息 | `array[item]` |   | `[]` |
| object | 信息 | `object` |  | `[]` |

item (参见demo)
| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| type | 显示的标题 | `string` |       | |
| label | 中文 | `string` |  | |
| dataIndex | 对象字段名 | `string` |  | |
| options | 用于 `select` `radio`  `checkbox`| `string` |  | |
| props | [From components Attributes](https://element.eleme.cn/#/zh-CN/component/) | `object` |  | |
