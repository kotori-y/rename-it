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
    const fileName = computed(() => root.rootFolder);
    const selected = computed(() => root.folderSelected);

    async function loadFolder() {
      // prints "pong"
      const inputFolder = ipcRenderer.sendSync(
        "open-folder-dialog",
        "ping"
      )[0] as string;
      root.rootFolder = inputFolder;
      root.folderSelected = !!inputFolder;
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
  position: absolute;
  bottom: 35vh;
  right: 30vw;
  height: 60vh;
  width: 50vw;
  background-color: rgba(239, 239, 239, 0.36);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  left: 50%;
  transform: translateX(-50%);
}

.file-container label {
  display: inline-block;
  bottom: 0;
  font-size: 5vh;
  font-weight: 600;
  user-select: none;
}

.file-container span {
  position: absolute;
  bottom: 14vh;
  font-size: 4.5vh;
  color: #084298;
  font-weight: 600;
}

.custom-file-input {
  visibility: hidden;
  top: 3vh;
  width: 44vw;
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
