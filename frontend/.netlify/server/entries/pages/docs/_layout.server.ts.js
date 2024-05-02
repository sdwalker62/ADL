import dirTree from "directory-tree";
import dotenv from "dotenv";
const load = async () => {
  dotenv.config();
  if (process.env.DOCS_PATH) {
    console.log(process.env.DOCS_PATH);
    const docsPath = process.env.DOCS_PATH;
    const fileNames = dirTree(docsPath, { exclude: /.git/ });
    return {
      tree: JSON.stringify(fileNames, null, 2)
    };
  } else {
    throw new Error("No docs path found!");
  }
};
export {
  load
};