
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
}





let bst = new tree;



let arr = [50, 30, 70, 20, 40, 60, 80];

console.log(bst.build(arr));