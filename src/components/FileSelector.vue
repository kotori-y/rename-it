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
  background-image: url(data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJmaWxlLWNvZGUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1maWxlLWNvZGUgZmEtdy0xMiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xNDkuOSAzNDkuMWwtLjItLjItMzIuOC0yOC45IDMyLjgtMjguOWMzLjYtMy4yIDQtOC44LjgtMTIuNGwtLjItLjItMTcuNC0xOC42Yy0zLjQtMy42LTktMy43LTEyLjQtLjRsLTU3LjcgNTQuMWMtMy43IDMuNS0zLjcgOS40IDAgMTIuOGw1Ny43IDU0LjFjMS42IDEuNSAzLjggMi40IDYgMi40IDIuNCAwIDQuOC0xIDYuNC0yLjhsMTcuNC0xOC42YzMuMy0zLjUgMy4xLTkuMS0uNC0xMi40em0yMjAtMjUxLjJMMjg2IDE0QzI3NyA1IDI2NC44LS4xIDI1Mi4xLS4xSDQ4QzIxLjUgMCAwIDIxLjUgMCA0OHY0MTZjMCAyNi41IDIxLjUgNDggNDggNDhoMjg4YzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjEzMS45YzAtMTIuNy01LjEtMjUtMTQuMS0zNHpNMjU2IDUxLjlsNzYuMSA3Ni4xSDI1NnpNMzM2IDQ2NEg0OFY0OGgxNjB2MTA0YzAgMTMuMyAxMC43IDI0IDI0IDI0aDEwNHpNMjA5LjYgMjE0Yy00LjctMS40LTkuNSAxLjMtMTAuOSA2TDE0NCA0MDguMWMtMS40IDQuNyAxLjMgOS42IDYgMTAuOWwyNC40IDcuMWM0LjcgMS40IDkuNi0xLjQgMTAuOS02TDI0MCAyMzEuOWMxLjQtNC43LTEuMy05LjYtNi0xMC45em0yNC41IDc2LjlsLjIuMiAzMi44IDI4LjktMzIuOCAyOC45Yy0zLjYgMy4yLTQgOC44LS44IDEyLjRsLjIuMiAxNy40IDE4LjZjMy4zIDMuNSA4LjkgMy43IDEyLjQuNGw1Ny43LTU0LjFjMy43LTMuNSAzLjctOS40IDAtMTIuOGwtNTcuNy01NC4xYy0zLjUtMy4zLTkuMS0zLjItMTIuNC40bC0xNy40IDE4LjZjLTMuMyAzLjUtMy4xIDkuMS40IDEyLjR6Ij48L3BhdGg+PC9zdmc+);
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
  background-image: url(data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNvZGUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1maWxlLWNvZGUgZmEtdy0xMiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0zODQgMTIxLjk0MVYxMjhIMjU2VjBoNi4wNTljNi4zNjUgMCAxMi40NyAyLjUyOSAxNi45NzEgNy4wMjlsOTcuOTQxIDk3Ljk0MUEyNC4wMDUgMjQuMDA1IDAgMCAxIDM4NCAxMjEuOTQxek0yNDggMTYwYy0xMy4yIDAtMjQtMTAuOC0yNC0yNFYwSDI0QzEwLjc0NSAwIDAgMTAuNzQ1IDAgMjR2NDY0YzAgMTMuMjU1IDEwLjc0NSAyNCAyNCAyNGgzMzZjMTMuMjU1IDAgMjQtMTAuNzQ1IDI0LTI0VjE2MEgyNDh6TTEyMy4yMDYgNDAwLjUwNWE1LjQgNS40IDAgMCAxLTcuNjMzLjI0NmwtNjQuODY2LTYwLjgxMmE1LjQgNS40IDAgMCAxIDAtNy44NzlsNjQuODY2LTYwLjgxMmE1LjQgNS40IDAgMCAxIDcuNjMzLjI0NmwxOS41NzkgMjAuODg1YTUuNCA1LjQgMCAwIDEtLjM3MiA3Ljc0N0wxMDEuNjUgMzM2bDQwLjc2MyAzNS44NzRhNS40IDUuNCAwIDAgMSAuMzcyIDcuNzQ3bC0xOS41NzkgMjAuODg0em01MS4yOTUgNTAuNDc5bC0yNy40NTMtNy45N2E1LjQwMiA1LjQwMiAwIDAgMS0zLjY4MS02LjY5Mmw2MS40NC0yMTEuNjI2YTUuNDAyIDUuNDAyIDAgMCAxIDYuNjkyLTMuNjgxbDI3LjQ1MiA3Ljk3YTUuNCA1LjQgMCAwIDEgMy42OCA2LjY5MmwtNjEuNDQgMjExLjYyNmE1LjM5NyA1LjM5NyAwIDAgMS02LjY5IDMuNjgxem0xNjAuNzkyLTExMS4wNDVsLTY0Ljg2NiA2MC44MTJhNS40IDUuNCAwIDAgMS03LjYzMy0uMjQ2bC0xOS41OC0yMC44ODVhNS40IDUuNCAwIDAgMSAuMzcyLTcuNzQ3TDI4NC4zNSAzMzZsLTQwLjc2My0zNS44NzRhNS40IDUuNCAwIDAgMS0uMzcyLTcuNzQ3bDE5LjU4LTIwLjg4NWE1LjQgNS40IDAgMCAxIDcuNjMzLS4yNDZsNjQuODY2IDYwLjgxMmE1LjQgNS40IDAgMCAxLS4wMDEgNy44Nzl6Ij48L3BhdGg+PC9zdmc+);
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
