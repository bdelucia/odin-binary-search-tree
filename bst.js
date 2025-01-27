function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

export function Tree() {
  this.root = null;

  // adds a node to the tree with the given value
  this.addNode = function (value) {
    const newNode = new Node(value);

    // if the tree is empty, the new node becomes the root
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    // keep traversing the tree until we find the right spot for the new node
    while (true) {
      // if the value is already in the tree, do nothing (no duplicates for this implementation)
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

  // deletes the node with the given value
  this.deleteItem = function (value) {
    this.root = deleteRec(this.root, value);

    function deleteRec(root, value) {
      // base case
      if (root === null) {
        return root;
      }

      if (value < root.data) {
        root.left = deleteRec(root.left, value); // traverse left if value is less than the root
      } else if (value > root.data) {
        root.right = deleteRec(root.right, value); // traverse right if value is greater than the root
      } else {
        // node to delete is found!
        // Case 1: node with no left child
        if (root.left === null) {
          return root.right; // replace the node with its right child
        }
        // Case 2: node with no right child
        else if (root.right === null) {
          return root.left; // replace the node with its left child
        }

        // Case 3: node with two children
        root.data = minValue(root.right); // find smallest value in the right subtree
        root.right = deleteRec(root.right, root.data); // recursively delete the smallest value from the right subtree
      }

      return root;
    }

    // keeps traversing left to find the smallest value
    function minValue(node) {
      let minv = node.data;
      while (node.left !== null) {
        minv = node.left.data;
        node = node.left;
      }
      return minv;
    }
  };

  // returns the node with the given value, returns null if a node with value is not found
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

  // applies a given callback function to each node in level order
  this.levelOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    let queue = []; // simulate a queue using an array
    queue.push(this.root);
    while (queue.length > 0) {
      let current = queue.shift(); // dequeue/pop the first element
      callback(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  };

  // applies a given callback function to each node in in-order (left, root, right)
  this.inOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    inOrderRec(this.root, callback);

    function inOrderRec(node, callback) {
      if (node !== null) {
        inOrderRec(node.left, callback); // left
        callback(node); // root
        inOrderRec(node.right, callback); // right
      }
    }
  };

  // applies a given callback function to each node in pre-order (root, left, right)
  this.preOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    preOrderRec(this.root, callback);

    function preOrderRec(node, callback) {
      if (node !== null) {
        callback(node); // root
        preOrderRec(node.left, callback); // left
        preOrderRec(node.right, callback); // right
      }
    }
  };

  // applies a given callback function to each node in post-order (left, right, root)
  this.postOrder = function (callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    postOrderRec(this.root, callback);

    function postOrderRec(node, callback) {
      if (node !== null) {
        postOrderRec(node.left, callback); // left
        postOrderRec(node.right, callback); // right
        callback(node); // root
      }
    }
  };

  // returns the number of edges between the root and the farthest leaf node
  this.height = function (node = this.root) {
    // base case
    if (node === null) {
      return -1;
    }

    // recursion case, as we go down the tree, we add 1 to the height.
    // if the left subtree is taller than the right subtree, we return the height of the left subtree + 1
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  };

  // returns the number of edges between the root and the node, returns -1 if the node is not found
  this.depth = function (node) {
    let depth = 0;
    let current = this.root;

    while (current !== null) {
      if (node.data === current.data) {
        return depth;
      } else if (node.data < current.data) {
        current = current.left; // go left to try and find the node with the value passed in as an argument
      } else {
        current = current.right;
      }
      depth++; // increment the depth as we traverse the tree
    }

    return -1;
  };

  // returns -1 if the tree is unbalanced, 0 if balanced
  this.isBalanced = function () {
    function checkHeight(node) {
      // base case
      if (node === null) {
        return 0;
      }

      // recursive cases
      let leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      let rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      // if the total height of the left subtrees and right subtrees differ by more than 1, the tree is unbalanced
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1; // get the tallest subtree and plus 1 to include the root
    }

    return checkHeight(this.root) !== -1;
  };

  // rebalances the tree
  this.rebalance = function () {
    // populate an array with the nodes in in-order traversal (sorted)
    function inOrderTraversal(node, nodes) {
      if (node === null) {
        return;
      }
      inOrderTraversal(node.left, nodes);
      nodes.push(node.data);
      inOrderTraversal(node.right, nodes);
    }

    function buildBalancedTree(nodes, start, end) {
      // base case
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2); // root
      const node = new Node(nodes[mid]); // makes new node from (sorted) nodes array
      node.left = buildBalancedTree(nodes, start, mid - 1); // builds the left subtree by using the left 'side' of the nodes array
      node.right = buildBalancedTree(nodes, mid + 1, end); // builds the right subtree by using the right 'side' of the nodes array
      return node;
    }

    const nodes = [];
    inOrderTraversal(this.root, nodes); // fills the nodes array
    this.root = buildBalancedTree(nodes, 0, nodes.length - 1);
  };
}
