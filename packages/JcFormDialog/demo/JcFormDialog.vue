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
        props: {
          width: "450px"
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
    dataIndex: "activeDescription",
    rules: [{ required: true, message: "请输入活动描述" }]
  }
];
</script>