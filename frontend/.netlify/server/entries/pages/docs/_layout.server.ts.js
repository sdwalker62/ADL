import dirTree from "directory-tree";
import { D as DOCS_PATH } from "../../../chunks/private.js";
import path from "path";
const load = async () => {
  {
    const repo_path = path.resolve("..");
    console.log(repo_path);
    const fileNames = dirTree(repo_path + DOCS_PATH, { exclude: /.git/ });
    return {
      tree: JSON.stringify(fileNames, null, 2)
    };
  }
};
export {
  load
};
