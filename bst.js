function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

function Tree() {
  this.root = buildTree();
  return {
    buildTree(array) {
      let tree = [];
      for (let i = 0; i < array.length; i++) {
        tree.push(new Node(array[i]));
      }
    },
  };
}
