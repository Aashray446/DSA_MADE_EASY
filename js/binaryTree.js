var treeContainer = document.getElementById('tree');
// var parentNode = document.createElement('ul');
// var dataNode = document.createElement('li');
// var data = document.createElement('a');

// const createParentNode = (value) => {
//     const parentNode = document.createElement('ul');
//     const dataNode = document.createElement('li');
//     const data = document.createElement('a');
//     data.innerText = value;
//     dataNode.appendChild(data);
//     parentNode.appendChild(dataNode);
//     treeContainer.appendChild(parentNode);
//     return parentNode;
// }

// const createChildNode = (value, parentNode, direction) => {

//     const dataNode = document.createElement('li');
//     const data = document.createElement('a');
//     data.innerText = value;
//     dataNode.appendChild(data);
//     if(direction == right) {
//         dataNode.appendChild(data);
//         return dataNode;
//     }
//     parentNode.prepend(dataNode);
//     return dataNode;
// }

createValue = (value) => {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.innerText = value;
	li.appendChild(a);
	return li;
}

class binarySearchTree {
    constructor(value, firstTime) {
        this.value = createValue(value);

        if(firstTime == true) {
            const roota = document.getElementById('tree');
            const ul = document.createElement('ul');
            ul.appendChild(this.value);
            roota.appendChild(ul);
        }

        this.left = null;
        this.right = null;

    }

insert(value) {
    if(value < parseInt(this.value.firstChild.innerText)) {

        if(this.left == null) {
            this.left = new binarySearchTree(value);
            if(this.right == null) {
                this.left.value.classList.add('left');
                const ul = document.createElement('ul')
                ul.appendChild(this.left.value);
                this.value.appendChild(ul);
            }
            else {
                this.value.lastChild.prepend(this.left.value);
            }

        } else {
            this.left.insert(value);
        }
    } else {
        if(this.right == null  ) {
            this.right = new binarySearchTree(value);
            if(this.left == null) {
                this.right.value.classList.add('right');
                const ul = document.createElement('ul')
                ul.appendChild(this.right.value);
                this.value.appendChild(ul);
            }
            else {
                this.value.lastChild.appendChild(this.right.value);
            }
        } else {
            this.right.insert(value);
        }
    }
}

    reset() {
        treeContainer.innerHTML = '';
    }
        

}

// class Node {
// 	constructor(data) {
// 		this.data = createValue(data);
// 		this.left = null;
// 		this.right = null;
// 	}
// }

// class binarySearchTree {
// 	constructor() {
// 		// root of a binary search tree
// 		this.root = null;
        
// 	}

// 	// insert(data)
// 	insert(data) {

// 		var newNode = new Node(data);
// 		if (this.root === null) {
// 			this.root = newNode;
//         }
// 		else {
// 			this.insertNode(this.root, newNode);
//         }
// 	}

// 	insertNode(node, newNode) {
	
// 		if (newNode.data < node.data) {
// 			// if left is null insert node here
// 			if (node.left === null)
// 				node.left = newNode;
// 			else
// 				// if left is not null recur until
// 				// null is found
// 				this.insertNode(node.left, newNode);
// 		}

// 		// if the data is more than the node
// 		// data move right of the tree
// 		else {
// 			// if right is null insert node here
// 			if (node.right === null)
// 				node.right = newNode;
// 			else

// 				// if right is not null recur until
// 				// null is found
// 				this.insertNode(node.right, newNode);
// 		}
// 	}


// 	// remove(data)
// }

var bst;

setBst = function(value) {
    bst = new binarySearchTree(value, true);
}
