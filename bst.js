function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

export function Tree() {
  this.root = null;

  this.addNode = function (value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.data) {
        // Value already exists in the tree, do not add it
        return;
      }
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  };

  this.buildTree = function (array) {
    array.forEach((value) => this.addNode(value));
  };

  this.insert = function (value) {
    this.addNode(value);
  };
}
