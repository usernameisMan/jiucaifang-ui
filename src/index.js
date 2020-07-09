import locale from './utils/locale';

import HelloWorld from "../packages/HelloWorld/src";
import JcBaseTable from "../packages/JcBaseTable/src";
import JcBaseFrom from "../packages/JcBaseFrom/src";

// import HelloWorld from "../packages/HelloWorld/src";
// import JcBaseTable from "../packages/JcBaseTable/demo";
// import JcBaseFrom from "../packages/JcBaseFrom/demo";

const components = [HelloWorld, JcBaseTable , JcBaseFrom];

const version = "0.0.1";

const install = function(Vue, opts = {}) {
  // 判断是否安装
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { version, install, HelloWorld, JcBaseTable, JcBaseFrom};
