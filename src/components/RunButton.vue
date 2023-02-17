<template>
  <button
    :class="{ button: true, active: isActive }"
    role="button"
    @click="run"
  >
    Start
  </button>
</template>

<script lang="ts">
import { useRootStore } from "../../store";
import { computed } from "vue";
import { loopFolder, processBatch } from "@/components/rename";
import { ipcRenderer } from "electron";

export default {
  name: "RunButton",
  setup() {
    const root = useRootStore();
    const isActive = computed(() => root.folderSelected);
    const rootFolder = computed(() => root.rootFolder);

    async function run() {
      const foldersTmp = (await loopFolder(rootFolder.value)) as Array<string>;
      const folders = foldersTmp.filter((folder) => folder.match(/\d+d\d+h/));
      folders.forEach(processBatch);
      ipcRenderer.send("finished");
    }

    return {
      isActive,
      run,
    };
  },
};
</script>

<style scoped>
.button {
  align-self: center;
  background-color: #9b92929e;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: not-allowed;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 20px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  position: absolute;
  bottom: 5%;
}

.button.active {
  cursor: pointer;
  background-color: #fff;
}

.button.active:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button.active:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}
</style>
