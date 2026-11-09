
class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

   
}


class tree {
    constructor(){
        this.root = null;
    }


     insert(value){
        if(this.root === null){
            this.root = new Node(value);
            return;
        }

        let curr = this.root;
        let prev;

        while(curr != null){
            prev = curr;

            if(curr.value === value){
                return false;
            }

            if(value > curr.value){
                curr = curr.right;
            }else{
                curr = curr.left;
            }
        }
        
        if(value > prev.value){
            prev.right = new Node(value);
        }else{
            prev.left = new Node(value);
        }

        return true;
    }


    find(value){
        let curr = this.root;

        while(curr !== null){

            if(curr.value === value){
                return curr;
            }

            
            if(value > curr.value){
                curr = curr.right;
            }else{
                curr = curr.left;
            }
        }


        return null;
    }


    build(array){
        let arr = array.sort();

        arr.forEach(element => {
            this.insert(element);
        })

        return this.root;
    }

    includes(value){
        let curr = this.root;


        if(this.root === null){
            return false;
        }


        while(curr !== null){
            if(value === curr.value){
                return true;
            }


            if(value > curr.value){
                curr = curr.right;
            }else{
                curr = curr.left;
            }
        }

        return false;
    }

    delete(value) {
    if (this.root === null) {
        return;
    }

    let curr = this.root;
    let prev = null;

    // Search for the node
    while (curr !== null && curr.value !== value) {
        prev = curr;

        if (value > curr.value) {
            curr = curr.right;
        } else {
            curr = curr.left;
        }
    }

    // Value not found
    if (curr === null) {
        return;
    }

    // Case 1: Node has two children
    if (curr.left !== null && curr.right !== null) {
        let target = curr;
        let successorParent = curr;
        let successor = curr.right;

        // Find inorder successor
        while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
        }

        // Copy successor's value
        target.value = successor.value;

        // Remove successor from original position
        if (successorParent === target) {
            successorParent.right = successor.right;
        } else {
            successorParent.left = successor.right;
        }

        return;
    }

    // Case 2: Node has zero or one child
    let child = curr.left || curr.right;

    // Deleting the root
    if (prev === null) {
        this.root = child;
    }
    // Deleting a non-root node
    else if (prev.left === curr) {
        prev.left = child;
    } else {
        prev.right = child;
    }
}
}

//testttttttttttttttttttttttttttttttttttttttttttttttttttt

const bst = new tree();

[50, 30, 70, 20, 40, 60, 80, 65].forEach(value => bst.insert(value));

console.log(bst.includes(50)); // true

bst.delete(20); // Leaf
console.log(bst.includes(20)); // false

bst.delete(30); // Two children (40 remains)
console.log(bst.includes(30)); // false
console.log(bst.includes(40)); // true

bst.delete(60); // One right child (65)
console.log(bst.includes(60)); // false
console.log(bst.includes(65)); // true

bst.delete(50); // Root with two children
console.log(bst.includes(50)); // false
console.log(bst.includes(65)); // true
console.log(bst.includes(70)); // true
console.log(bst.includes(80)); // true