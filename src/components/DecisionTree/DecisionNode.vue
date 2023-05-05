<template>
  <div
    class="vue-decision-tree-node"
    ref="node"
    :class="[
      direction,
      {
        leaf: node.isLeaf,
        root: node.level === 1,
        alone: node.noSiblings,
      },
    ]"
    :style="nodeStyle"
  >
    <!-- conn-line -->
    <div class="vue-decision-tree-node-line" :style="lineStyle"></div>

    <div class="vue-decision-tree-node-content" :style="contentStyle">
      <div class="vue-decision-tree-node-sub-line" :style="lineStyle"></div>
      <node-content :node="node"></node-content>
    </div>

    <div class="vue-decision-tree-node-children">
      <DecisionNode
        :render-content="renderContent"
        v-for="child in node.childNodes"
        :key="child.key"
        :node="child"
        :props="props"
        :direction="direction"
        :h-spacing="hSpacing"
        :v-spacing="vSpacing"
        :line-color="lineColor"
      >
      </DecisionNode>
    </div>
  </div>
</template>

<script lang="ts">
import { LineStyle } from "../../models/styles";
import NodeModel from "../../models/node-model";
import { NodeStyle } from "../../models/styles";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import NodeContent from "./NodeContent.vue";
import { NodeProps } from "../../models/node-props";

@Options({
  name: "DecisionNode",
  components: { "node-content": NodeContent },
})
export default class DecisionNode extends Vue {
  @Prop({ default: () => ({}) }) node: NodeModel;
  @Prop() renderContent: (...args: any) => any;
  @Prop({ default: "ltr" }) direction: string;
  @Prop({ default: 16 }) hSpacing: number;
  @Prop({ default: 48 }) vSpacing: number;
  @Prop({ default: "#000" }) lineColor: string;
  @Prop({
    default() {
      return {};
    },
  })
  props: NodeProps;

  tree = null;

  get hspace(): number {
    return this.hSpacing / 2;
  }

  get vspace(): number {
    return this.vSpacing / 2;
  }

  get vertical(): boolean {
    return ["ttb", "btt"].includes(this.direction);
  }

  get horizontal(): boolean {
    return ["ltr", "rtl"].includes(this.direction);
  }

  get lineStyle(): LineStyle {
    let style = new LineStyle();
    style.color = this.lineColor;

    if (this.horizontal) {
      style.width = `${this.hspace}px`;
    } else {
      style.height = `${this.vspace}px`;
    }

    return style;
  }

  get nodeStyle(): NodeStyle {
    let style = new NodeStyle();

    if (this.horizontal) {
      style.paddingTop = `${this.vspace}px`;
      style.paddingBottom = `${this.vspace}px`;
    } else {
      style.paddingLeft = `${this.hspace}px`;
      style.paddingRight = `${this.hspace}px`;
    }

    return style;
  }

  get contentStyle(): NodeStyle {
    let style = new NodeStyle();

    if (this.horizontal) {
      style.paddingLeft = `${this.hspace}px`;
      style.paddingRight = `${this.hspace}px`;
    } else {
      style.paddingTop = `${this.vspace}px`;
      style.paddingBottom = `${this.vspace}px`;
    }

    return style;
  }

  created() {
    const parent = this.$parent as any;

    if (parent.isRoot) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
  }
}
</script>

<style lang="scss">
@import "./node.scss";
</style>
