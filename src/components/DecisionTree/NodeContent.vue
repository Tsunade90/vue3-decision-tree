<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import NodeModel from "../../models/node-model";
import { h } from "vue";

@Options({
  // eslint-disable-next-line no-unused-vars
  render() {
    const parent = this.$parent;
    const tree = parent.tree;
    const node = this.node;
    return tree.$slots && tree.$slots.default
      ? h("div", tree.$slots.default({ node, data: node.data }))
      : h("span", node.label || "");
  },
})
export default class NodeContent extends Vue {
  @Prop({ required: true }) node: NodeModel;
}
</script>
