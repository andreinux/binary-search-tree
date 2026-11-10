
//prettyprint function
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};


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
// delete method

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


//level order traversal method


      lvlorder(callback){

        if(typeof callback !== "function"){
            throw new Error("Callback must be a function");
        }

        if(this.root == null) return;


        let queue = [];
        let curr;


        queue.push(this.root);

        while(queue.length > 0){
            curr = queue[0];
            callback(curr.value);
            
            if(curr.left !== null){
                queue.push(curr.left);
            }

            if(curr.right !== null){
                queue.push(curr.right);
            }

            queue = queue.slice(1);
        }
      }

      preorderDFS(callback){
        if(typeof callback !== "function"){
            throw new Error("callback must be a function");
        }


        function traverse(node){
            
            if(node == null) return;
            callback(node.value);

             traverse(node.left);
             traverse(node.right);
        }

        traverse(this.root);
      }

      inorderDFS(callback){
        if(typeof callback !== "function"){
            throw new Error("Callback must be a function");
        }

        function traverse(node){
            if(node == null) return;

            traverse(node.left);
            callback(node.value);
            traverse(node.right);

        }

        traverse(this.root);
      }


      postorderDFS(callback){
        if(typeof callback != "function"){
            throw new Error("Callback must be a function");
        }


        function traverse(node){
            if(node == null) return;

            traverse(node.left);
            traverse(node.right);

            callback(node.value);
        }
        traverse(this.root);
      }

height(node){
    if(node === null) return -1;

    return 1 + Math.max(
        this.height(node.left),
        this.height(node.right)
    );
}

      depth(value){
        let curr = this.root;
        let depth = 0;

        while(curr != null){
            if(curr.value === value){
                return depth;
            }

            if(value > curr.value){
                curr = curr.right;
            }else{
                curr = curr.left
            }

            depth++;
        }

        return undefined;
      }

      isBalanced(node = this.root){
        if(node === null)return true;

        let right = this.height(node.right);
        let left = this.height(node.left);

        if(Math.abs(right - left) > 1){
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);

      }

      rebalance(){
        let arr = [];

        this.inorderDFS(value => arr.push(value));



        function buildTree(arr){
            if(arr.length == 0){
                return null;
            }
        let middle = Math.floor(arr.length / 2);
        let newNode = new Node(arr[middle]);
        newNode.left = buildTree(arr.slice(0, middle));
        newNode.right = buildTree(arr.slice(middle + 1));

        return newNode

        }

        this.root = buildTree(arr);

    
      }
}

//testttttttttttttttttttttttttttttttttttttttttttttttttttt

// Generate an array of random numbers
function generateRandomNumbers() {
    let arr = [];

    for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    return arr;
}

// Create BST
const bst = new tree();
const randomNumbers = generateRandomNumbers();

console.log("INITIAL ARRAY:", randomNumbers);

bst.build(randomNumbers);

// 1. Confirm that the tree is balanced
console.log("\nIS BALANCED?", bst.isBalanced());

// 2. Print the original tree
console.log("\nINITIAL TREE:");
prettyPrint(bst.root);

// 3. Print all traversal orders
console.log("\nLEVEL ORDER:");
bst.lvlorder(value => console.log(value));

console.log("\nPREORDER:");
bst.preorderDFS(value => console.log(value));

console.log("\nPOSTORDER:");
bst.postorderDFS(value => console.log(value));

console.log("\nINORDER:");
bst.inorderDFS(value => console.log(value));


// 4. Unbalance the tree
[110, 120, 130, 140, 150].forEach(value => bst.insert(value));

console.log("\nTREE AFTER ADDING VALUES ABOVE 100:");
prettyPrint(bst.root);

// 5. Confirm that the tree is unbalanced
console.log("\nIS BALANCED?", bst.isBalanced());


// 6. Rebalance the tree
bst.rebalance();

console.log("\nTREE AFTER REBALANCING:");
prettyPrint(bst.root);

// 7. Confirm that the tree is balanced
console.log("\nIS BALANCED?", bst.isBalanced());

// 8. Print all traversal orders again
console.log("\nLEVEL ORDER:");
bst.lvlorder(value => console.log(value));

console.log("\nPREORDER:");
bst.preorderDFS(value => console.log(value));

console.log("\nPOSTORDER:");
bst.postorderDFS(value => console.log(value));

console.log("\nINORDER:");
bst.inorderDFS(value => console.log(value));