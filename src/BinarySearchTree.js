import TreeNode from "./TreeNode";
import Queue from "./Queue";
import Stack from "./Stack";

class BinarySearchTree {
  constructor(arr) {
    arr = [...new Set(arr)];
    this.originalArr = arr;
    this.balanceTreeCreation = false;
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (this.balanceTreeCreation) {
      arr = arr.sort((a, b) => a - b);
    }
    if (arr.length === 0) {
      return null;
    }
    let mid = Math.floor(arr.length / 2);
    const rootNode = new TreeNode(arr[mid]);
    rootNode.left = this.buildTree(arr.slice(0, mid));
    rootNode.right = this.buildTree(arr.slice(mid + 1));

    return rootNode;
  }

  insert(value) {
    if (!Number.isInteger(value)) throw new Error("value is not integer");
    const newNode = new TreeNode(value);
    let cur = this.root;
    let parent = null;
    while (cur !== null) {
      parent = cur;
      if (value > cur.value) {
        cur = cur.right;
      } else if (value < cur.value) {
        cur = cur.left;
      } else {
        throw new Error("value already exist in the BST");
      }
    }
    if (value > parent.value) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
  }

  deleteItem(value) {
    if (!Number.isInteger(value)) throw new Error("value is not integer");
    let cur = this.root;
    let parent = null;
    let isLeftChild = true;

    while (cur !== null) {
      if (value === cur.value) break;
      parent = cur;
      isLeftChild = value < cur.value;
      if (isLeftChild) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }

    if (!cur) throw new Error("value do not exist in the BST");

    // case 1: no child
    if (!cur.right && !cur.left) {
      if (!parent) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // case 2: one child
    else if (!cur.right) {
      if (!parent) {
        this.root = cur.left;
      } else if (isLeftChild) {
        parent.left = cur.left;
      } else {
        parent.right = cur.left;
      }
    } else if (!cur.left) {
      if (!parent) {
        this.root = cur.right;
      } else if (isLeftChild) {
        parent.left = cur.right;
      } else {
        parent.right = cur.right;
      }
    }
    // case 3: two childs
    else {
      let newValue = this.findMin(cur.right).value;
      this.deleteItem(newValue);
      if (!parent) {
        this.root.value = newValue;
      } else if (isLeftChild) {
        parent.left.value = newValue;
      } else {
        parent.right.value = newValue;
      }
    }
  }

  findMin(node = this.root) {
    let cur = node;
    while (cur.left) {
      cur = cur.left;
    }
    return cur;
  }

  find(value) {
    if (!Number.isInteger(value)) throw new Error("value is not integer");
    let cur = this.root;
    let isLeftChild = true;
    while (cur !== null) {
      if (value === cur.value) return cur;
      isLeftChild = value < cur.value;
      if (isLeftChild) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    throw new Error("value do not exist in the BST");
  }

  levelOrder(callback) {
    const queue = new Queue();
    queue.enqueue(this.root);

    while (queue.head) {
      let cur = queue.dequeue();
      callback(cur);
      if (cur.left) {
        queue.enqueue(cur.left);
      }
      if (cur.right) {
        queue.enqueue(cur.right);
      }
    }
  }

  inOrder(callback) {
    const stack = new Stack();
    let cur = this.root;

    while (cur || stack.top) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      callback(cur);
      cur = cur.right;
    }
  }

  preOrder(callback) {
    const stack = new Stack();
    let cur = this.root;

    while (cur) {
      if (cur) {
        callback(cur);
        if (cur.right) {
          stack.push(cur.right);
        }
        if (cur.left) {
          stack.push(cur.left);
        }
      }
      cur = stack.pop();
    }
  }

  postOrder(callback) {
    const stack1 = new Stack();
    const stack2 = new Stack();
    stack1.push(this.root);
    while (stack1.top) {
      let node = stack1.pop();
      stack2.push(node);
      if (node.left) {
        stack1.push(node.left);
      }
      if (node.right) {
        stack1.push(node.right);
      }
    }
    while (stack2.top) {
      let node = stack2.pop();
      callback(node);
    }
  }

  height(node = this.root) {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    return this.height() - this.height(node);
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    }
    if (node.left || node.right) {
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
    return true;
  }

  rebalance() {
    this.balanceTreeCreation = true;
    this.buildTree(this.originalArr);
  }
}

export default BinarySearchTree;
