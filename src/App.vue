<template>
  <div class="container">
    <div class="interface">
      <FileSelector />
      <HyperParams />
    </div>
    <RunButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileSelector from "@/components/FileSelector.vue";
import RunButton from "@/components/RunButton.vue";
import HyperParams from "@/components/HypereParams.vue";

export default defineComponent({
  name: "App",
  components: { HyperParams, RunButton, FileSelector },
});
</script>

<style>
body {
  background-image: url("./assets/background.png");
  background-size: cover;
}

.container {
  display: flex;
  flex-direction: column;
}

.interface {
  position: absolute;
  width: 90%;
  height: 70%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
