import { defineStore } from "pinia";

export const useRootStore = defineStore("gameRoot", {
  state: () => {
    return {
      folderSelected: false,
      rootFolder: "",
    };
  },
});
