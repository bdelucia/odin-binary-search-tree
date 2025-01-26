import { printTree, printData } from "./print.js";
import { Tree } from "./bst.js";

const tree = new Tree();
tree.buildTree([5, 3, 8, 2, 4, 7, 9]);
printTree(tree);
tree.insert(6);
printTree(tree);
tree.deleteItem(8);
printTree(tree);

console.log("Level Order: ");
tree.levelOrder(printData);
console.log("In-order: ");
tree.inOrder(printData);
console.log("Pre-order: ");
tree.preOrder(printData);
console.log("Post-order: ");
tree.postOrder(printData);

console.log("Tree height: ", tree.height());
console.log("Tree height at node 3: ", tree.height(tree.root.left));
console.log("Tree height at node 9: ", tree.height(tree.root.right));

console.log("Tree depth: ", tree.depth());
console.log("Tree depth at node 3: ", tree.depth(tree.root.left));
console.log("Tree depth at node 9: ", tree.depth(tree.root.right));
console.log("Tree depth at node 6: ", tree.depth(tree.root.right.left.left));
