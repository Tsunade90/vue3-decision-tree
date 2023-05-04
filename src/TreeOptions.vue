<template>
  <div class="ops">
    <div class="item">
      <span class="label">hSpacing:</span>
      <span class="input">
        <input type="range" min="0" max="100" v-model="_hSpacing" />
      </span>
    </div>
    <div class="item">
      <span class="label">vSpacing:</span>
      <span class="input">
        <input type="range" min="0" max="100" v-model="_vSpacing" />
      </span>
    </div>
    <div class="item">
      <span class="label">direction:</span>
      <span class="input">
        <span class="radio-item" v-for="pos in directions" :key="pos">
          <input
            type="radio"
            :id="pos"
            name="pos"
            v-model="_direction"
            :value="pos"
          />
          <label :for="pos">{{ pos }}</label>
        </span>
      </span>
    </div>
    <div class="item">
      <span class="label">color:</span>
      <span class="input">
        <span class="radio-item" v-for="color in colors" :key="color">
          <input
            type="radio"
            :id="color"
            name="color"
            v-model="_lineColor"
            :value="color"
          />
          <label :for="color">{{ color }}</label>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class TreeOptions extends Vue {
  @Prop({ default: "ltr" }) direction: string;
  @Prop({ default: 16 }) hSpacing: number;
  @Prop({ default: 40 }) vSpacing: number;
  @Prop({ default: "#000" }) lineColor: string;

  directions = ["ltr", "rtl", "ttb", "btt"];
  colors = ["#000", "#00f", "#0f0", "#f00"];

  get _hSpacing(): number {
    return this.hSpacing;
  }
  set _hSpacing(v) {
    this.$emit("update:hSpacing", v * 1);
  }

  get _vSpacing(): number {
    return this.vSpacing;
  }
  set _vSpacing(v) {
    this.$emit("update:vSpacing", v * 1);
  }

  get _direction(): string {
    return this.direction;
  }
  set _direction(v) {
    this.$emit("update:direction", v);
  }

  get _lineColor(): string {
    return this.lineColor;
  }
  set _lineColor(v) {
    this.$emit("update:lineColor", v);
  }
}
</script>

<style lang="scss" scoped>
.ops {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  padding: 12px 20px;
  box-sizing: border-box;
  background: #000;

  .item {
    padding: 2px 0;

    .label {
      display: inline-block;
      width: 90px;
      color: #ddd;
      font-size: 13px;
    }

    .radio-item {
      margin-right: 8px;
      font-size: 13px;
      color: #fff;
      input {
        margin-right: 8px;
      }
    }
  }
}
</style>
