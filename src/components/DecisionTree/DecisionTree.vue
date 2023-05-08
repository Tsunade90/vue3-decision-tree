<template>
  <div v-if="root" class="decision-tree" ref="tree">
    <TransitionGroup name="fade">
      <DecisionNode
        v-for="child in root.childNodes"
        :node="child"
        :props="props"
        :key="child.key"
        :direction="direction"
        :h-spacing="hSpacing"
        :v-spacing="vSpacing"
        :line-color="lineColor"
        :render-content="renderContent"
      >
      </DecisionNode>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { TransitionGroup } from "vue";
import DecisionNode from "./DecisionNode.vue";
import { Prop, Watch } from "vue-property-decorator";
import { TreeItem } from "../../models/tree-item";
import { NodeProps } from "../../models/node-props";
import NodeModel from "../../models/node-model";

@Options({
  components: {
    TransitionGroup,
    DecisionNode,
  },
})
export default class DecisionTree extends Vue {
  @Prop({ default: () => [] }) dataItems: TreeItem[];
  @Prop() renderContent: (...args: any) => any;
  @Prop({
    default: "ltr",
    validator: function (value) {
      return ["ltr", "rtl", "ttb", "btt"].includes(value);
    },
  })
  direction: string;
  @Prop({ default: 16 }) hSpacing: number;
  @Prop({ default: 48 }) vSpacing: number;
  @Prop({ default: "#000" }) lineColor: string;
  @Prop({
    default() {
      return {
        children: "children",
        label: "label",
      };
    },
  })
  props: NodeProps;

  root: NodeModel = null;
  isRoot = null;

  mounted() {
    this.isRoot = true;
    this.createTreeNodes();
  }

  @Watch("dataItems", { deep: true, immediate: false })
  dataItemsChanged(): void {
    this.createTreeNodes();
  }

  createTreeNodes(): void {
    this.root = new NodeModel({
      data: this.dataItems,
      props: this.props,
    });
  }
}
</script>

<style lang="scss">
// Fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// List
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
