import DecisionTree from "./DecisionTree.vue";

const plugin = {
  install(Vue) {
    Vue.component("DecisionTree", DecisionTree);
  },
};

export default plugin;
