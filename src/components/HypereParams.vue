<template>
  <div id="params">
    <form class="hyper-params">
      <div class="input-group" v-for="(data, index) in formData" :key="index">
        <label>{{ data.label }}</label>
        <input type="text" spellcheck="false" v-model="root[data.model]" />
      </div>
      <div class="input-group">
        <label>荧光</label>
        <select v-model="root.isFlu">
          <option value="true">是</option>
          <option value="false">否</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useRootStore } from "../../store";

export default {
  name: "HyperParams",
  setup() {
    const root = useRootStore();

    const formData = [
      { label: "细胞", model: "cellName" },
      { label: "芯片", model: "chipType" },
      { label: "高度", model: "chamberHeight" },
    ];

    return {
      root,
      formData,
    };
  },
};
</script>

<style scoped>
#params {
  position: relative;
  /*background-color: white;*/
  background-color: rgba(239, 239, 239, 0.36);
  border-radius: 10px;
  width: 90%;
  height: 20%;
  display: flex;
}

.hyper-params {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.input-group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: bolder;
  /*text-align: justify;*/
  /*text-align-last: justify;*/
  /*display: block;*/
  /*word-break: break-all;*/
  /*text-justify: distribute;*/
  /*position: relative;*/
  /*padding-right: 8px;*/
}

.input-group input,
.input-group select {
  height: 10%;
  width: 30%;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
}

.input-group select {
  width: 50%;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
}
</style>
