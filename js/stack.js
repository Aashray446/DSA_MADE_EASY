class Stack {
   
    dataArray = new Array();


    // Functions to manipulate the UI
    #createElement(value){
        const element = document.createElement('div');
        element.classList.add('box')
        element.innerHTML = value

        document.getElementById('playgrnd').appendChild(element)        
    }

    constructor(value) {
        this.dataArray.push(value)
        this.#createElement(value)
    }

   

    push(value) {

        this.dataArray.push(value)
        this.#createElement(value)
        return

    }

    pop() {
        
        const list = document.getElementsByClassName('box')
        list[list.length-1].remove()

        return this.dataArray.pop()
    }


    
}