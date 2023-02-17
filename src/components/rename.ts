import { readdir, readFile, rename } from "fs/promises";
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
      const contentArray = content.split(/\s+/);
      const flag = contentArray.filter(
        (char, index) => index % 2 === 1 && (char === "1-7" || char === "1-12")
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

  const root = useRootStore();
  const timeStamp = dirPath.match(/\d+d|\d+h/g);
  const group = dirPath.split(/\\|\//);

  if (!timeStamp || !group) {
    return;
  }

  const groupID = group[group.length - 2];

  const prefix = `${root.cellName}-${root.chipType}-${
    root.chamberHeight
  }-${groupID}-${timeStamp.join("-")}`;

  const suffix = root.isFlu ? "-a" : "";

  const [isOK, flag] = await checkFile(files[0]);
  const newNames4Times = [];
  const newNames10Times = [];

  if (isOK) {
    let chamberID = 1;

    for (let i = 0; i < flag.length; i++) {
      const upper = parseInt(flag[i].split("-")[1]);
      if (isNaN(upper) || (upper !== 7 && upper !== 12)) {
        return;
      }

      const m = upper === 12 ? 2 : 1;
      for (let n = 0; n < m; n++) {
        newNames4Times.push(
          `${prefix}-chamber${chamberID}-4x-${n + 1}${suffix}.jpg`
        );
      }
      for (let n = 0; n < upper; n++) {
        newNames10Times.push(
          `${prefix}-chamber${chamberID}-10x-${n + 1}${suffix}.jpg`
        );
      }

      chamberID++;
    }
  }

  const newNames = [...newNames4Times, ...newNames10Times];
  if (newNames.length === files.length - 1) {
    for (let i = 0; i < newNames.length; i++) {
      // await rename(files[i], newNames[i]);
      const tmp = files[i + 1].split(/\\|\//);
      const newName = files[i + 1].replace(tmp[tmp.length - 1], newNames[i]);
      await rename(files[i + 1], newName);
      console.log(`Change ${files[i + 1]} to ${newName}`);
    }
  }
}