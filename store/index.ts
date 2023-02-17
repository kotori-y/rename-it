import { defineStore } from "pinia";

export const useRootStore = defineStore("gameRoot", {
  state: () => {
    return {
      rootFolder: "",
      cellName: "MCF-7",
      chipType: "T0",
      chamberHeight: 105,
      isFlu: false,
    };
  },
  getters: {
    folderSelected: (state) => !!state.rootFolder,
  },
});
