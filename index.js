
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


      height(value){
           let node =  this.find(value);

           if(node == null)return undefined;


            function calculate(node){  
                if(node == null)return -1;

                return 1 + Math.max(calculate(node.left), calculate(node.right));
            }

            return calculate(node);
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
}

//testttttttttttttttttttttttttttttttttttttttttttttttttttt

const bst = new tree();

[50, 30, 70, 20, 40, 60, 80].forEach(value => bst.insert(value));


console.log(bst.depth(20));