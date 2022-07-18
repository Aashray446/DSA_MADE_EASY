const container = document.getElementById('animation-container')
const structure = 'arrayBox'


const createElement = (value, ind) => {
    const element = document.createElement('div');
    element.classList.add('arrayBox')


    // Current Value
    var data  = document.createElement('div');
    data.classList.add('data');
    data.innerHTML = value;

    //Next Address
    var index = document.createElement('div');
    index.classList.add('index');
        index.innerHTML = ind;
    
    
    element.appendChild(data)
    element.appendChild(index)
  //  container.append(element)

    return element;
      
}

class ArrayImp{


    dataArray = new Array();
    inde = 0;
    length;
    
    setLength(value){
        this.length = value;
        this.reset();
    }

    insert(value){
        if(this.isFull()){
            window.alert("Array out of range")
        }
        else{
            console.log(this.inde)
        container.append(createElement(value,this.inde));
        this.dataArray.push(value);
        this.inde++;
        }
        
    }

    insertAtIndex(value, index){
        if(this.isFull()){
            window.alert("Array is Full")
            return
        }
        if(index == '' ){
            this.insert(value);
            return;
        }
        else{
            if(index == 0 && this.dataArray.length == 0){
                this.insert(value);
                return
            }

            console.log(container.children[index])
            container.children[index].insertAdjacentElement("beforeBegin", createElement(value, index));
            this.dataArray.splice(index,0, value)
            this.inde++;
            this.replaceIndex(index);

        }
       
    }

    replaceIndex(index){
        for(let i = parseInt(index); i<this.dataArray.length-1; i++){
            container.children[i+1].children[1].innerHTML = i+1;
           
            
     }
}


    delete(){
        if(this.isEmpty()){
            window.alert("Empty Array")
        }
        else{
            const list = document.getElementsByClassName(structure)
            this.dataArray.pop();
            list[list.length-1].remove()
            this.inde--;
            console.log(this.inde)

        }
    }  
    deleteAtIndex(index){
        if(index == '' ){
            this.delete(value);
            return;
        }
        if(index >= this.dataArray.length){
            window.alert("Index out of range")
        
        }
        else if(this.isEmpty()){
            window.alert("Empty Array")
        }
        else{
            container.children[index].remove();
            this.replaceIndex(index-1)
            this.dataArray.splice(index,1)
        }
    }

    isFull(){
        console.log(this.dataArray.length)
        if(this.dataArray.length == this.length){
            return true;
        }
        return false;
    }

    isEmpty(){
        if(this.dataArray.length == 0){
            return true;
        }
        return false;
    }

    reset = function() {
        container.innerHTML = ''    
        this.dataArray = new Array();
        this.inde = 0;
    }





}

const array = new ArrayImp();