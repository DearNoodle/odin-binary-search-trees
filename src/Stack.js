import Node from "./Node";

class Stack {
  // next means lower for the nodes in the Stack.
  constructor() {
    this.top = null;
    this.bottom = null;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.top) {
      this.bottom = newNode;
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
  }

  pop() {
    if (!this.top) {
      return null;
    }
    const removedNode = this.top;
    this.top = this.top.next;
    if (!this.top) {
      this.bottom = null;
    }
    return removedNode.value;
  }
}

export default Stack;
