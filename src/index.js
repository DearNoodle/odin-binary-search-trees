import BinarySearchTree from "./BinarySearchTree";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let list = [];
const listPush = (a) => {
  list.push(a.value);
};

let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100) + 1);
}

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new BinarySearchTree(arr);
prettyPrint(tree.root);
console.log(tree.isBalanced());

list = [];
tree.levelOrder(listPush);
console.log(list);
list = [];
tree.inOrder(listPush);
console.log(list);
list = [];
tree.preOrder(listPush);
console.log(list);
list = [];
tree.postOrder(listPush);
console.log(list);

tree.insert(101);
tree.insert(123);
tree.insert(169);
prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);

console.log(tree.isBalanced());

list = [];
tree.levelOrder(listPush);
console.log(list);
list = [];
tree.inOrder(listPush);
console.log(list);
list = [];
tree.preOrder(listPush);
console.log(list);
list = [];
tree.postOrder(listPush);
console.log(list);

// prettyPrint(tree.find(67));
// tree.deleteItem(67);
// prettyPrint(tree.root);
// tree.find(67);
// console.log(tree.height(tree.find(67)));
// console.log(tree.depth(tree.find(4)));
