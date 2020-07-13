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