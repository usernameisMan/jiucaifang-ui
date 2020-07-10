import Vue from 'vue'
import JcFormDialog from './JcFormDialog.vue'

const JcFormDialogBox = Vue.extend(JcFormDialog)

let instance = new JcFormDialogBox({}).$mount()
document.body.appendChild(instance.$el)

JcFormDialog.show = function (data) {

  Vue.nextTick(() => {
    const { title = '', submitText = '确定', resetText = '重置', cancelText = '取消', submit = null, reset = null, cancel = null, items = [], object = {} } = data
    instance.visible = true
    instance.title = title
    instance.submitText = submitText
    instance.resetText = resetText
    instance.cancelText = cancelText
    instance.submit = submit
    instance.reset = reset
    instance.cancel = cancel
    instance.items = items
    instance.object = object
    instance.loading = false
  })
}

JcFormDialog.hidden = function () {
  Vue.nextTick(() => {
    instance.items = [{}]
    instance.object = {}
    instance.visible = false
    instance.loading = false
  })
}

JcFormDialog.loading = function () {
  Vue.nextTick(() => {
    instance.loading = true
  })
}

JcFormDialog.unloading = function () {
  Vue.nextTick(() => {
    instance.loading = false
  })
}

export default JcFormDialog