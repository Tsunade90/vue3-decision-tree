<template>
  <div id="app">
    <!-- options -->
    <TreeOptions
      v-model:h-spacing="hSpacing"
      v-model:v-spacing="vSpacing"
      v-model:direction="direction"
      v-model:line-color="lineColor"
    ></TreeOptions>

    <!-- <decision-tree
      :data="mockData"
      :h-spacing="hSpacing * 1"
      :v-spacing="vSpacing * 1"
      :line-color="lineColor"
      :direction="direction"
      :props="{
        children: 'child'
      }"
    >
    </decision-tree> -->

    <DecisionTree
      :dataItems="mockData"
      :h-spacing="hSpacing"
      :v-spacing="vSpacing"
      :line-color="lineColor"
      :direction="direction"
      :props="{
        children: 'child',
      }"
    >
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
      </template>
    </DecisionTree>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeOptions from "./TreeOptions.vue";
import MockData from "./data/mockData";
import DecisionTree from "./components/DecisionTree/DecisionTree.vue";

@Options({ components: { TreeOptions, DecisionTree } })
export default class App extends Vue {
  mockData = null;
  hSpacing = 46;
  vSpacing = 12;
  direction = "ltr";
  lineColor = "#000";

  created(): void {
    this.mockData = MockData;
  }
}
</script>

<style lang="scss">
#app {
  padding: 80px 0 0 0;
}

.custom-node {
  border: 1px solid blue;
  padding: 10px;
}
</style>
