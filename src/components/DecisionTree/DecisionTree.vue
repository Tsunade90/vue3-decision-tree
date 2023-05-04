<template>
  <div v-if="root" class="decision-tree" ref="tree">
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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DecisionNode from "./DecisionNode.vue";
import { Prop } from "vue-property-decorator";
import { TreeItem } from "@/models/tree-item";
import { NodeProps } from "@/models/node-props";
import NodeModel from "@/models/node-model";

@Options({
  components: {
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
    this.root = new NodeModel({
      data: this.dataItems,
      props: this.props,
    });
  }
}
</script>
