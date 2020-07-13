<template>
  <el-dialog :title="title" :visible.sync="visible" @close="close" v-bind="{...props}">
    <JcBaseForm ref="jcFormDialog" :items="items" :object="object">
      <el-button  type="primary" :loading="loading" v-if="submit" @click="submitForm">{{submitText}}</el-button>
      <el-button :loading="loading" v-if="reset" @click="resetForm">{{resetText}}</el-button>
      <el-button :loading="loading" v-if="cancel" @click="cancelForm">{{cancelText}}</el-button>
    </JcBaseForm>
  </el-dialog>
</template>
<script>
import Vue from "vue";
import { Dialog } from "element-ui";
import JcBaseForm from "../../JcBaseForm/src";

Vue.use(Dialog);

export default {
  name: "JcFormDialog",
  components: {
    JcBaseForm
  },
  props: [
    "visible",
    "title",
    "submitText",
    "resetText",
    "cancelText",
    "submit",
    "reset",
    "cancel",
    "items",
    "object",
    "loading",
    "props",
  ],
  methods: {
    submitForm() {
      const [form] = this.$refs.jcFormDialog.$children; 
      form.validate(valid => {
        if (valid) {
          this.submit(this.object);
        } else {
          console.log("error submit!!");
          this.submit(false);
        }
      });
    },
    close () {
      const [form] = this.$refs.jcFormDialog.$children; 
      form.resetFields()
    },
    resetForm () {
      form.resetFields()
      this.reset()
    },
    cancelForm () {
      form.resetFields()
      this.cancel()
    },
  },
};
</script>