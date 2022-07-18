const container = document.getElementById('animation-container')
const container2 = document.getElementById('animation-container2')
const structure = 'arrayBox'
const errorBox = document.getElementById("error");
const reverse = document.getElementById("reverse");


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
    arrayIndex = 0;
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
            if(value == '' || value == undefined || value >=99 || value <= -99){
                value = this.getRandomInt(0, 99);
            }
        container.append(createElement(value,this.arrayIndex));
        this.dataArray.push(value);
        this.arrayIndex++;
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
            this.arrayIndex++;
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
            
            this.dataArray.pop();
            container.children[this.dataArray.length].remove();
            this.arrayIndex--;


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
        errorBox.style.display = "none";
        reverse.style.display = "none";
        container.innerHTML = '' 
        container2.innerHTML = ''   
        this.dataArray = new Array();
        this.arrayIndex = 0;
    }

   async search(value){
        if(this.isEmpty()){
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else{
            for(let i = 0; i<this.dataArray.length; i++){
                container.children[i].children[0].classList.add('active');
                if(this.dataArray[i] == value){
                    await sleep(1000);
                    errorBox.style.display = "block";
                    errorBox.innerText = "Value is found at index " + i;
                    container.children[i].children[0].classList.remove('active');
                    return i;

                }
                await sleep(1000);
                container.children[i].children[0].classList.remove('active');
            }
            errorBox.style.display = "block";
            errorBox.innerText = "Value not found";
        }
    }

    async reverse(){
        container2.innerHTML = ' ';
        if(this.isEmpty()){
            errorBox.style.display = "block";
            errorBox.innerText = "Array is Empty";
        }
        else{
            errorBox.style.display = "block";
            errorBox.innerText = "Original Array";;
            for(let i = this.dataArray.length-1; i>=0; i--){
                this.reverseArray.push(this.dataArray[i]);
            }
            reverse.style.display = "block";
            reverse.innerHTML = "Reversed Array";
            for(let i = 0; i<this.reverseArray.length; i++){
                console.log('hello')
                container2.append(createElement(this.reverseArray[i], i));
               
            }
            this.reverseArray = new Array();
            await sleep(10000);
            container2.innerHTML = '';
            reverse.style.display = "none";
            
        }
    }
 getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomArray(){
        this.length = 10;
        this.dataArray = new Array();
            errorBox.style.display = "block";
            errorBox.innerText = "Random Array";
            container.innerHTML =' ';
            for(let i = 0; i<10; i++){
                let a = getRandomInt(0,99);
                this.dataArray.push(a);
                container.append(createElement(a, i));
        }
    }





}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

const array = new ArrayImp();