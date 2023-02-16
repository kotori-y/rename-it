<template>
  <div class="container">
    <FileSelector />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileSelector from "@/components/FileSelector.vue";

export default defineComponent({
  name: "App",
  components: { FileSelector },
});
</script>

<style>
body {
  background-image: url("./assets/background.png");
  background-size: cover;
}

/*.container {*/
/*  position: absolute;*/
/*  width: 80vw;*/
/*  height: 80vh;*/
/*  left: 50%;*/
/*  transform: translateX(-50%);*/
/*  !*background-color: rgba(255, 255, 255, 0.5);*!*/
/*}*/
</style>
