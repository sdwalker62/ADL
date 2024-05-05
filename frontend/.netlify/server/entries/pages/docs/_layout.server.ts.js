import "directory-tree";
import path from "path";
const load = async () => {
  {
    const repo_path = path.resolve("..");
    return {
      path: repo_path
    };
  }
};
export {
  load
};
