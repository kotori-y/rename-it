import { readdir, readFile, rename, writeFile } from "fs/promises";
import { useRootStore } from "../../store";

export async function loopFolder(
  dirPath: string
): Promise<Array<string> | undefined> {
  try {
    const files = await readdir(dirPath, { withFileTypes: true });
    return files.map((file) => `${dirPath}/${file.name}`);
  } catch (err) {
    console.error(err);
  }
}

async function loadFile(fileName: string): Promise<string | undefined> {
  try {
    const controller = new AbortController();
    const { signal } = controller;
    const promise = readFile(fileName, { encoding: "utf-8", signal });

    return await promise;
  } catch (err) {
    console.error(err);
  }
}

type CheckResult = [boolean, Array<string>];

async function checkFile(file: string): Promise<CheckResult> {
  if (file.match(/site\.txt/)) {
    const content = await loadFile(file);
    if (content) {
      const contentArray = content.trim().split(/\s+/);
      const flag = contentArray.filter(
        (char, index) =>
          index % 2 === 1 &&
          (char === "1-7" || char === "1-12" || char === "6-12")
      );
      return [flag.length === contentArray.length / 2, flag];
    }
  }
  return [false, []];
}

export async function processBatch(dirPath: string) {
  const filesTmp = (await loopFolder(dirPath)) as Array<string>;
  const files = filesTmp.filter((file) =>
    file.match(/site\.txt|图像_\d+\.jpg/)
  );

  if (!files) {
    return;
  }

  const rootStore = useRootStore();
  const timeStamp = dirPath.match(/\d+d|\d+h/g);
  const pathSplit = dirPath.split(/\\|\//);

  if (!timeStamp || !pathSplit) {
    return;
  }

  const groupID = pathSplit[pathSplit.length - 2];
  const rootDir = pathSplit.slice(0, pathSplit.length - 1).join("/");

  const prefix = `${rootStore.cellName}-${rootStore.chipType}-${
    rootStore.chamberHeight
  }-${groupID}-${timeStamp.join("-")}`;

  const suffix = rootStore.isFlu ? "-a" : "";

  const [isOK, flag] = await checkFile(files[0]);
  const newNames4Times = [];
  const newNames10Times = [];

  if (isOK) {
    let chamberID = 1;

    for (let i = 0; i < flag.length; i++) {
      const [_downer, _upper] = flag[i].split("-");

      const downer = parseInt(_downer);
      const upper = parseInt(_upper);
      if (
        isNaN(downer) ||
        isNaN(upper) ||
        (downer !== 1 && downer !== 6) ||
        (upper !== 7 && upper !== 12) ||
        (downer === 6 && upper === 7)
      ) {
        return;
      }

      const m = upper === 12 ? 2 : 1;
      const x4Start = downer === 1 ? 0 : 1;
      const x10Start = downer === 1 ? 0 : 5;

      for (let n = x4Start; n < m; n++) {
        newNames4Times.push(
          `${prefix}-chamber${chamberID}-4x-${n + 1}${suffix}.jpg`
        );
      }
      for (let n = x10Start; n < upper; n++) {
        newNames10Times.push(
          `${prefix}-chamber${chamberID}-10x-${n + 1}${suffix}.jpg`
        );
      }

      chamberID++;
    }
  }

  const newNames = [...newNames4Times, ...newNames10Times];
  let logContent = "";
  if (newNames.length === files.length - 1) {
    for (let i = 0; i < newNames.length; i++) {
      // await rename(files[i], newNames[i]);
      const tmp = files[i + 1].split(/\\|\//);
      const newName = files[i + 1].replace(tmp[tmp.length - 1], newNames[i]);
      await rename(files[i + 1], newName);
      const logTmp = `change ${files[i + 1]} to ${newName}\n`;
      logContent = logContent.concat(logTmp);
    }
  }
  await writeFile(`${rootDir}/rename.log`, logContent, { flag: "a" });
}
