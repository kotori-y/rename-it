<template>
  <div class="container">
    <FileSelector />
    <RunButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileSelector from "@/components/FileSelector.vue";
import RunButton from "@/components/RunButton.vue";

export default defineComponent({
  name: "App",
  components: { RunButton, FileSelector },
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
</style>
