<template>
  <div class="file-container">
    <div
      :class="{ 'custom-file-input': true, active: selected }"
      id="file"
      ref="file"
      @click="loadFolder"
    />
    <span>{{ fileName }}</span>
    <label for="file">Upload your target fold here</label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { ipcRenderer } from "electron";
import { useRootStore } from "../../store";

export default defineComponent({
  name: "FileSelector",

  setup() {
    const root = useRootStore();
    const fileName = computed(() => {
      const tmp = root.rootFolder as string;
      if (!tmp) {
        return "";
      }
      const tmp_array = tmp.split(/\\|\//g);
      return ".../".concat(tmp_array.slice(-3).join("/"));
    });
    const selected = computed(() => root.folderSelected);

    async function loadFolder() {
      // prints "pong"
      root.rootFolder = ipcRenderer.sendSync(
        "open-folder-dialog",
        "ping"
      )[0] as string;
    }

    onUnmounted(() => {
      root.$reset();
    });

    return {
      fileName,
      selected,
      loadFolder,
    };
  },
});
</script>

<style scoped>
.file-container {
  position: relative;
  height: 70%;
  width: 80%;
  background-color: rgba(239, 239, 239, 0.36);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.file-container label {
  display: inline-block;
  /*bottom: 0;*/
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
}

.file-container span {
  position: absolute;
  /*bottom: 30%;*/
  font-size: 0.8rem;
  color: #084298;
  font-weight: 600;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}

.custom-file-input::before {
  content: "";
  background-image: url("../assets/file-unselected.svg");
  display: inline-block;
  border: 2px dashed #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 10pt;
  visibility: initial;
  color: bisque;
  height: 25vh;
  width: 40vw;
  background-size: 12%;
  background-repeat: no-repeat;
  background-position: 50% 23%;
}

.custom-file-input.active::before {
  background-image: url("../assets/file-selected.svg");
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
