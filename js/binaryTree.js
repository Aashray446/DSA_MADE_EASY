var treeContainer = document.getElementById('tree');

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
    //search in binary tree
   async search(value) {
        if(value == parseInt(this.value.firstChild.innerText)) {
            this.value.firstChild.classList.add('found');
            await sleep(2000);
            this.value.firstChild.classList.remove('found');
            return true;
        }
        else if(value < parseInt(this.value.firstChild.innerText)) {
            if(this.left == null) {
                this.left.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.left.value.firstChild.classList.remove('pointer');
                return null;
            }
            else {
                this.left.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.left.value.firstChild.classList.remove('pointer');
                return this.left.search(value);
            }
        }
        else {
            if(this.right == null) {
               
                this.right.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.right.value.firstChild.classList.remove('pointer');
                return null;
            }
            else {
                this.right.value.firstChild.classList.add('pointer');
                await sleep(1000)
                this.right.value.firstChild.classList.remove('pointer');
                return this.right.search(value);
            }
        }



    }

    reset() {
        treeContainer.innerHTML = '';
    }
        

}



var bst;

setBst = function(value) {
    bst = new binarySearchTree(value, true);
}


//get Delay Value
function getDelay() {
    return document.getElementById('delay').value
}

// Util functions
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
    
  }

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

generateRandomBst = function() {
    if(bst != null) {
        bst.reset();
    }
    bst = new binarySearchTree(getRandomInt(0, 100), true);
    for(i = 0; i < 10; i++){
        bst.insert(getRandomInt(0, 100));
    }
}
