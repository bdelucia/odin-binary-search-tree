import { printTree } from "./print.js";
import { Tree } from "./bst.js";

const tree = new Tree();
tree.buildTree([5, 3, 8, 2, 4, 7, 9]);
printTree(tree);
tree.insert(6);
printTree(tree);
