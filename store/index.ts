import { defineStore } from "pinia";

export const useRootStore = defineStore("gameRoot", {
  state: () => {
    return {
      rootFolder: "",
      cellName: "U215",
      chipType: "T0",
      chamberHeight: 105,
      isFlu: false,
    };
  },
  getters: {
    folderSelected: (state) => !!state.rootFolder,
  },
});
