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

  this.deleteItem = function (value) {
    this.root = deleteRec(this.root, value);

    function deleteRec(root, value) {
      if (root === null) {
        return root;
      }

      if (value < root.data) {
        root.left = deleteRec(root.left, value);
      } else if (value > root.data) {
        root.right = deleteRec(root.right, value);
      } else {
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }

        root.data = minValue(root.right);
        root.right = deleteRec(root.right, root.data);
      }

      return root;
    }

    function minValue(node) {
      let minv = node.data;
      while (node.left !== null) {
        minv = node.left.data;
        node = node.left;
      }
      return minv;
    }
  };
  this.find = function (value) {
    let current = this.root;
    while (current) {
      if (value === current.data) {
        return current;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  };
  this.levelOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  };
  this.inOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    inOrderRec(this.root, callback);

    function inOrderRec(node, callback) {
      if (node !== null) {
        inOrderRec(node.left, callback);
        callback(node);
        inOrderRec(node.right, callback);
      }
    }
  };
  this.preOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    preOrderRec(this.root, callback);

    function preOrderRec(node, callback) {
      if (node !== null) {
        callback(node);
        preOrderRec(node.left, callback);
        preOrderRec(node.right, callback);
      }
    }
  };
  this.postOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    postOrderRec(this.root, callback);

    function postOrderRec(node, callback) {
      if (node !== null) {
        postOrderRec(node.left, callback);
        postOrderRec(node.right, callback);
        callback(node);
      }
    }
  };
  this.height = function (node = this.root) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  };
}
