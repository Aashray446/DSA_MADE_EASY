const container = document.getElementById('animation-container')
const container2 = document.getElementById('animation-container2')
const structure = 'arrayBox'
const errorBox = document.getElementById("error");


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
    reverseArray = new Array();
    inde = 0;
    length = -1;

   
    
    setLength(value){
        this.length = value;
        this.reset();
        if(value == ''){
            errorBox.style.display = "block";
            errorBox.innerHTML = "Please enter length";
            return;
        }
        errorBox.style.display = "block";
        errorBox.innerText = "An Array of length  " + value  + " is created";
    }

    insert(value){
        errorBox.style.display = "none";
        if(this.length == -1){
            errorBox.style.display = "block";
            errorBox.innerHTML = "Please enter length";
            return;
        }
        if(this.isFull()){
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Full";
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
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Full";
            return;
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
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else{
            const list = document.getElementsByClassName(structure)
            this.dataArray.pop();
            list[list.length-1].remove()
            this.inde--;


        }
    }  
    deleteAtIndex(index){
        if(index == '' ){
            this.delete(value);
            return;
        }
        if(index >= this.dataArray.length){
            errorBox.style.display = "block";
            errorBox.innerText = "Index is out of range";
        
        }
        else if(this.isEmpty()){
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
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

    search(value){
        if(this.isEmpty()){
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else{
            for(let i = 0; i<this.dataArray.length; i++){
                if(this.dataArray[i] == value){
                    errorBox.style.display = "block";
                    errorBox.innerText = "Value is found at index " + i;
                    return i;
                }
            }
            errorBox.style.display = "block";
            errorBox.innerText = "Value not found";
        }
    }

    reverse(){
        if(this.isEmpty()){
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else{
            this.reverseArray = this.dataArray;
            this.reverseArray.reverse();
            console.log(this.reverseArray)
            console.log(this.dataArray)
            for(let i = 0; i<this.reverse.length; i++){
                container2.append(createElement(this.reverseArray[i], i));
            }
        }
    }





}

const array = new ArrayImp();