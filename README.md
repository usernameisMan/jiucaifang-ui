# jiucaifang
对 element-ui 的二次封装，减少原 element-ui 使用时候代码量(约50%)，使项目具备较好的维护性。     


>  0.2.1   
>   1.修复无法禁用 clearable 的问题，修复选择器提示问题
>   2.加入 form.type 'container' 支持一个 el-form-item 里面使用多个 el 组件和 html      
>   3.加入 form.span    


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

## JcFormDialog

### 代码实例
```vue
<template>
  <el-button @click="show">显示JcFormDialog</el-button>
</template>

<script>

export default {
  name: "JcFormDialogDemo",
  methods: {
    show() {
      this.$JcFormDialog.show({
        title: "测试弹框",
        object: {
          activeName: "促销活动",
          activeDescription: ""
        },
        submitText: '清理活动',
        items: testFormItems,
        submit: value => {
          if (value) {
            console.log("value", value);
            this.$JcFormDialog.loading()

            setTimeout(()=> {
              this.$JcFormDialog.hidden()
              this.$JcFormDialog.unloading()
            }, 2000)

          } else {
            console.log("value", value);
          }
        }
      });
    }
  }
};

const testFormItems = [
  {
    type: "input",
    label: "活动名称",
    dataIndex: "activeName",
    rules: [{ required: true, message: "请输入活动名称" }]
  },
  {
    type: "textarea",
    label: "活动描述",
    on: {
      change: (e)=> { console.log(e) }
    }
    dataIndex: "activeDescription",
    rules: [{ required: true, message: "请输入活动描述" }]
  }
];
</script>
```
$JcFormDialog.show({ 以下参数 }) 
| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| title | 弹框标题 | `string` |   | `` |
| submitText | 提交按钮显示内容 | `string` |  | `确定` |
| resetText | 重置按钮显示内容 | `string` |   | `重置` |
| cancelText | 取消按钮显示内容 | `string` |   | `取消` |
| submit | 提交回调 如果传入就会显示按钮 | `(value = {} | false) =>` |   | `` |
| reset | 重置回调 如果传入就会显示按钮 | `() = >` |   | `` |
| cancel | 取消回调 如果传入就会显示按钮 | `() = >` |   | `` |
| items | baseForm 的 items | `array[item]` |   | `` |
| object | baseForm 的 object  | `{}` |   | `` |


$JcFormDialog.hidden()    隐藏弹框     
$JcFormDialog.loading()   弹框按钮加载状态    
$JcFormDialog.unloading() 取消弹框按钮加载状态    


## JcBaseTable

```vue
<template>
  <JcBaseTable ref="baseTable" :dataSource="dataSource" :columns="columns" @selection-change="handleSelectionChange">
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
    },
    getBaseTableRef (item){
      // 暂时通过这种方式获取
      const [baseTable] = this.$refs.baseTable.$children;
      // 调用 element-ui table 的勾选
      baseTable.toggleRowSelection(item, true);
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

## JcBaseForm
这个写法虽然看上去长，但事实上比原实现方式减少约 350 个字符

搜索模式，编辑模式
```vue
<template>
  <div>
    <JcBaseForm ref="baseForm" :items="items" :object="object">
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </JcBaseForm>

    <JcBaseForm ref="baseForm" :props="{inline:true, 'label-width': '80px'}" :items="searchItems" :object="searchObject" >
      <el-button type="primary" @click="submitForm">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
    </JcBaseForm>
  </div>
</template>

<script>
import JcBaseForm from "../src/JcBaseForm";

export default {
  name: "JcBaseFormDemo",
  components: {
    JcBaseForm
  },
  data() {
    return {
      inline: false,
      searchObject: {
        activeName: "电器特惠活动",
        activeArea: "2",
        container: "",
        percentage: "",
      },
      searchItems: [
        {
          type: "input",
          label: "活动名称",
          dataIndex: "activeName",
          rules: [{ required: true, message: "请输入活动名称" }],
          disabled: true,
        },
        {
          type: "container",
          label: "完整率",
          dataIndex: "percentage", //指定检测内部某个 dataIndex
          rules: [{ required: true, message: "请输入完整率" }],
          container: [
            {
              type: "select",
              label: "",
              dataIndex: "symbol",
              span: 3,
              props: {
                clearable: false,
              },
              options: [
                {
                  label: "=",
                  value: "=",
                },
                {
                  label: ">",
                  value: ">",
                },
                {
                  label: "<",
                  value: "<",
                },
                {
                  label: "≠",
                  value: "≠",
                },
              ],
            },
            {
              type: "html",
              span: 2,
              render: "<div style='text-align:center'>-</div>",
            },
            {
              type: "input",
              label: "",
              dataIndex: "percentage",
              span: 11,
            },
          ],
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
        }
      ],
      object: {
        activeName: "电器特惠活动",
        activeArea: "2",
        timelyDelivery: false,
        natureActivities: ["1"],
        specialResources: "1"
      },
      items: [
        {
          type: "input",
          label: "活动名称",
          dataIndex: "activeName",
          rules: [{ required: true, message: "请输入活动名称" }],
          operation: {
            label: '复制',
            event: this.copy
          },
          props: {
            style: "width: 200px"
          }
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
    copy (value) {
      console.log(value.activeName)
    },
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
    },
    line() {
      this.inline = !this.inline
    }
  }
};
</script>
```

### JcBaseForm参数
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
| operation | 配置行的按钮操作 | `{label, event(object)}` |  | |
