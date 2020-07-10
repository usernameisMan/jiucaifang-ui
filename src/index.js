import locale from './utils/locale';

// import HelloWorld from "../packages/HelloWorld/src";
// import JcBaseTable from "../packages/JcBaseTable/src";
// import JcBaseForm from "../packages/JcBaseForm/src";
// import JcFormDialog from "../packages/JcFormDialog/src"

// const components = [HelloWorld, JcBaseTable, JcBaseForm];

import HelloWorld from "../packages/HelloWorld/src";
import JcBaseTable from "../packages/JcBaseTable/demo";
import JcBaseForm from "../packages/JcBaseForm/demo";
import JcFormDialogDemo from "../packages/JcFormDialog/demo"
import JcFormDialog from "../packages/JcFormDialog/src"


const components = [HelloWorld, JcBaseTable, JcBaseForm, JcFormDialogDemo];

const version = "0.0.1";

const install = function (Vue, opts = {}) {
  // 判断是否安装
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$JcFormDialog = JcFormDialog;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { version, install, HelloWorld, JcBaseTable, JcBaseForm };
