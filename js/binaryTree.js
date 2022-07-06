//binary tree
class binaryTree {


    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    insertLeft(value) {
        this.left = new binaryTree(value);
        return this.left;
    }
    insertRight(value) {
        this.right = new binaryTree(value);
        return this.right;
    }

    
}

