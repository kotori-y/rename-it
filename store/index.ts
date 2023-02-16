import { defineStore } from "pinia";

export const useRootStore = defineStore("gameRoot", {
  state: () => {
    return {
      rootFolder: "",
    };
  },
  getters: {
    folderSelected: (state) => !!state.rootFolder,
  },
});
