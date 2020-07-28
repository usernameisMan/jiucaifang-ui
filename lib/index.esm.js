import Vue from 'vue';
import { Table, TableColumn, Checkbox, Switch, Form, FormItem, Input, InputNumber, Select, Option, RadioGroup, CheckboxGroup, Radio, DatePicker, TimeSelect, TimePicker, Dialog } from 'element-ui';

var helloworld = {
  hello: "你好"
};

var defaultLang = {
  vgc: {
    helloworld: helloworld
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);

    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function (e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination;
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination;
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument);
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument);
    } else {
        return mergeObject(target, source, optionsArgument);
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements');
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function (prev, next) {
        return deepmerge(prev, next, optionsArgument);
    });
};

var deepmerge_1 = deepmerge;

var deepmerge_2 = deepmerge_1;

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
function Format () {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof$1(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = Object.prototype.hasOwnProperty.call(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
}

var format = Format();
var lang = defaultLang;
var merged = false;
var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === "function" && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(Vue.config.lang, deepmerge_2(lang, Vue.locale(Vue.config.lang) || {}, {
        clone: true
      }));
    }
    return vuei18n.apply(this, arguments);
  }
};

var t = function t(path, options) {
  var value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  var array = path.split(".");
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return "";
    current = value;
  }
  return "";
};

var use = function use(l) {
  lang = l || lang;
};

var i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

var locale = { use: use, t: t, i18n: i18n };

var Locale = {
  methods: {
    t: function t$1() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return t.apply(this, args);
    }
  }
};

//
var script = {
  name: "HelloWorld",
  mixins: [Locale],
  props: {
    message: {
      type: String,
      default: "world"
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook = void 0;
    if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
            // 2.3 injection
            context = context || // cached call
            this.$vnode && this.$vnode.ssrContext || // stateful
            this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    } else if (style) {
        hook = shadowMode ? function (context) {
            style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
            style.call(this, createInjector(context));
        };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        } else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_c("p", { staticClass: "demo-box" }, [_vm._v("\n    This is " + _vm._s(_vm.t("vgc.helloworld.hello")) + " " + _vm._s(_vm.message) + "\n  ")])]);
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = "data-v-5134fc1e";
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

//

Vue.use(Table);
Vue.use(TableColumn);

var script$1 = {
  name: "JcBaseTable",
  props: {
    columns: {
      default: function _default() {
        return [];
      }
    },
    dataSource: {
      default: function _default() {
        return [];
      }
    },
    props: {
      default: function _default() {
      }
    }
  },
  methods: {}
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-table", _vm._b({
    attrs: { data: _vm.dataSource },
    on: {
      "selection-change": function selectionChange(val) {
        return _vm.$emit("selection-change", val);
      }
    }
  }, "el-table", Object.assign({}, _vm.props), false), [_vm.$listeners["selection-change"] ? _c("el-table-column", { attrs: { type: "selection", width: "55" } }) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (ref, i) {
    var dataIndex = ref.dataIndex;
    if (dataIndex === void 0) dataIndex = "";
    var label = ref.label;
    if (label === void 0) label = "";
    var props = ref.props;
    if (props === void 0) props = { "show-overflow-tooltip": true };
    var custom = ref.custom;
    if (custom === void 0) custom = false;
    var render = ref.render;
    if (render === void 0) render = "";
    return _c("el-table-column", _vm._b({
      key: i,
      attrs: { prop: dataIndex, label: label },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(scope) {
          return [_vm.$scopedSlots[dataIndex] ? _vm._t(dataIndex, null, { scope: scope }) : _c("span", {
            domProps: {
              innerHTML: _vm._s(render ? render(scope.row) : scope.row[dataIndex])
            }
          })];
        }
      }], null, true)
    }, "el-table-column", Object.assign({}, props), false));
  })], 2);
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

__vue_component__$1.install = function (Vue) {
  Vue.component(__vue_component__$1.name, __vue_component__$1);
};

//

Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(RadioGroup);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);

var script$2 = {
  name: "JcBaseForm",
  props: {
    props: {
      default: function _default() {
        return {
          labelWidth: "100px"
        };
      }
    },
    object: {
      default: {}
    },
    items: {
      default: function _default() {
        return [{}];
      }
    }
  },
  computed: {
    getRules: function getRules() {
      var rules = this.items.reduce(function (accumulator, currentValue) {
        var _currentValue$rules = currentValue.rules,
            rules = _currentValue$rules === undefined ? "" : _currentValue$rules,
            _currentValue$dataInd = currentValue.dataIndex,
            dataIndex = _currentValue$dataInd === undefined ? "" : _currentValue$dataInd;

        if (rules) {
          accumulator[dataIndex] = rules;
          return accumulator;
        }
        return accumulator;
      }, {});

      return rules;
    }
  },
  methods: {}
};

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-form", _vm._b({ attrs: { model: _vm.object, rules: _vm.getRules } }, "el-form", Object.assign({}, _vm.props), false), [_vm._l(_vm.items, function (item, index) {
    return _c("el-form-item", { key: index, attrs: { label: item.label, prop: item.dataIndex } }, [item.type == "input" ? _c("el-input", _vm._b({
      attrs: {
        placeholder: "请输入" + item.label,
        disabled: item.disabled,
        clearable: ""
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-input", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "textarea" ? _c("el-input", _vm._b({
      attrs: {
        placeholder: "请输入" + item.label,
        type: "textarea",
        disabled: item.disabled,
        clearable: ""
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-input", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "inputNumber" ? _c("el-input-number", _vm._b({
      attrs: {
        "controls-position": "right",
        placeholder: "请输入" + item.label,
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-input-number", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "select" ? _c("el-select", _vm._b({
      attrs: {
        placeholder: "请输入" + item.label,
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-select", Object.assign({}, item.props), false), _vm._l(item.options, function (option) {
      return _c("el-option", {
        key: option.value,
        attrs: { label: option.label, value: option.value }
      });
    }), 1) : _vm._e(), _vm._v(" "), item.type == "switch" ? _c("el-switch", _vm._b({
      attrs: {
        "inactive-color": "#ff4949",
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-switch", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "radio" ? _c("el-radio-group", _vm._b({
      attrs: { disabled: item.disabled },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-radio-group", Object.assign({}, item.props), false), _vm._l(item.options, function (option) {
      return _c("el-radio", { key: option.value, attrs: { label: option.value } }, [_vm._v(_vm._s(option.label))]);
    }), 1) : _vm._e(), _vm._v(" "), item.type == "checkbox" ? _c("el-checkbox-group", _vm._b({
      attrs: { disabled: item.disabled },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-checkbox-group", Object.assign({}, item.props), false), _vm._l(item.options, function (option) {
      return _c("el-checkbox", {
        key: option.value,
        attrs: { label: option.value, name: item.dataIndex }
      }, [_vm._v(_vm._s(option.label))]);
    }), 1) : _vm._e(), _vm._v(" "), item.type == "time" ? _c("el-time-select", _vm._b({
      attrs: {
        placeholder: "选择时间",
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-time-select", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "timePicker" ? _c("el-time-picker", _vm._b({
      attrs: {
        "is-range": "",
        "range-separator": "至",
        "start-placeholder": "开始时间",
        "end-placeholder": "结束时间",
        placeholder: "选择时间范围",
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-time-picker", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "date" ? _c("el-date-picker", _vm._b({
      attrs: {
        type: "date",
        placeholder: "选择日期",
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-date-picker", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "daterange" ? _c("el-date-picker", _vm._b({
      attrs: {
        "range-separator": "至",
        "start-placeholder": "开始月份",
        "end-placeholder": "结束月份",
        type: "daterange",
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-date-picker", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "datetime" ? _c("el-date-picker", _vm._b({
      attrs: {
        type: "datetime",
        placeholder: "选择日期时间",
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-date-picker", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), item.type == "datetimerange" ? _c("el-date-picker", _vm._b({
      attrs: {
        type: "datetimerange",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        "default-time": ["12:00:00"],
        disabled: item.disabled
      },
      model: {
        value: _vm.object[item.dataIndex],
        callback: function callback($$v) {
          _vm.$set(_vm.object, item.dataIndex, $$v);
        },
        expression: "object[item.dataIndex]"
      }
    }, "el-date-picker", Object.assign({}, item.props), false)) : _vm._e(), _vm._v(" "), _typeof$2(item.operation) == "object" ? _c("el-button", {
      on: {
        click: function click($event) {
          return item.operation.event(_vm.object);
        }
      }
    }, [_vm._v(_vm._s(item.operation.label))]) : _vm._e()], 1);
  }), _vm._v(" "), _c("el-form-item", [_vm._t("default")], 2)], 2);
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

__vue_component__$2.install = function (Vue) {
  Vue.component(__vue_component__$2.name, __vue_component__$2);
};

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Vue.use(Dialog);

var script$3 = {
  name: "JcFormDialog",
  components: {
    JcBaseForm: __vue_component__$2
  },
  props: ["visible", "title", "submitText", "resetText", "cancelText", "submit", "reset", "cancel", "items", "object", "loading", "props"],
  methods: {
    submitForm: function submitForm() {
      var _this = this;

      var _$refs$jcFormDialog$$ = _slicedToArray(this.$refs.jcFormDialog.$children, 1),
          form = _$refs$jcFormDialog$$[0];

      form.validate(function (valid) {
        if (valid) {
          _this.submit(_this.object);
        } else {
          console.log("error submit!!");
          _this.submit(false);
        }
      });
    },
    close: function close() {
      var _$refs$jcFormDialog$$2 = _slicedToArray(this.$refs.jcFormDialog.$children, 1),
          form = _$refs$jcFormDialog$$2[0];

      form.resetFields();
    },
    resetForm: function resetForm() {
      form.resetFields();
      this.reset();
    },
    cancelForm: function cancelForm() {
      form.resetFields();
      this.cancel();
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-dialog", _vm._b({
    attrs: { title: _vm.title, visible: _vm.visible },
    on: {
      "update:visible": function updateVisible($event) {
        _vm.visible = $event;
      },
      close: _vm.close
    }
  }, "el-dialog", Object.assign({}, _vm.props), false), [_c("JcBaseForm", {
    ref: "jcFormDialog",
    attrs: { items: _vm.items, object: _vm.object }
  }, [_vm.submit ? _c("el-button", {
    attrs: { type: "primary", loading: _vm.loading },
    on: { click: _vm.submitForm }
  }, [_vm._v(_vm._s(_vm.submitText))]) : _vm._e(), _vm._v(" "), _vm.reset ? _c("el-button", {
    attrs: { loading: _vm.loading },
    on: { click: _vm.resetForm }
  }, [_vm._v(_vm._s(_vm.resetText))]) : _vm._e(), _vm._v(" "), _vm.cancel ? _c("el-button", {
    attrs: { loading: _vm.loading },
    on: { click: _vm.cancelForm }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e()], 1)], 1);
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = undefined;
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var JcFormDialogBox = Vue.extend(__vue_component__$3);

var instance = new JcFormDialogBox({}).$mount();
document.body.appendChild(instance.$el);

__vue_component__$3.show = function (data) {

  Vue.nextTick(function () {
    var _data$title = data.title,
        title = _data$title === undefined ? '' : _data$title,
        _data$submitText = data.submitText,
        submitText = _data$submitText === undefined ? '确定' : _data$submitText,
        _data$resetText = data.resetText,
        resetText = _data$resetText === undefined ? '重置' : _data$resetText,
        _data$cancelText = data.cancelText,
        cancelText = _data$cancelText === undefined ? '取消' : _data$cancelText,
        _data$submit = data.submit,
        submit = _data$submit === undefined ? null : _data$submit,
        _data$reset = data.reset,
        reset = _data$reset === undefined ? null : _data$reset,
        _data$cancel = data.cancel,
        cancel = _data$cancel === undefined ? null : _data$cancel,
        _data$items = data.items,
        items = _data$items === undefined ? [] : _data$items,
        _data$object = data.object,
        object = _data$object === undefined ? {} : _data$object,
        _data$props = data.props,
        props = _data$props === undefined ? {} : _data$props;

    instance.visible = true;
    instance.title = title;
    instance.submitText = submitText;
    instance.resetText = resetText;
    instance.cancelText = cancelText;
    instance.submit = submit;
    instance.reset = reset;
    instance.cancel = cancel;
    instance.items = items;
    instance.object = object;
    instance.loading = false;
    instance.props = props;
  });
};

__vue_component__$3.hidden = function () {
  Vue.nextTick(function () {
    instance.items = [{}];
    instance.object = {};
    instance.visible = false;
    instance.loading = false;
  });
};

__vue_component__$3.loading = function () {
  Vue.nextTick(function () {
    instance.loading = true;
  });
};

__vue_component__$3.unloading = function () {
  Vue.nextTick(function () {
    instance.loading = false;
  });
};

var components = [__vue_component__, __vue_component__$1, __vue_component__$2];

// import HelloWorld from "../packages/HelloWorld/src";
// import JcBaseTable from "../packages/JcBaseTable/demo";
// import JcBaseForm from "../packages/JcBaseForm/demo";
// import JcFormDialogDemo from "../packages/JcFormDialog/demo"
// import JcFormDialog from "../packages/JcFormDialog/src"


// const components = [HelloWorld, JcBaseTable, JcBaseForm, JcFormDialogDemo];

var version = "0.1.6";

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // 判断是否安装
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(function (component) {
    Vue.component(component.name, component);
  });

  Vue.prototype.$JcFormDialog = __vue_component__$3;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

var index = { version: version, install: install, HelloWorld: __vue_component__, JcBaseTable: __vue_component__$1, JcBaseForm: __vue_component__$2 };

export default index;
