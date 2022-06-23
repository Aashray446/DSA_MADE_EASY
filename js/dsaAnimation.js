//Container Variable Definition 
const container = document.getElementById('animation-container')
const structure = 'stack'

const createElement = function(value) {
    const element = document.createElement('div');
    element.classList.add(structure)
    if(value==null) {
        element.innerHTML = '-'
    }   
    else {
        element.innerHTML = value
    }
    container.prepend(element)        
}

const getHead = function() {
    
    const list = document.getElementsByClassName(structure)
    return list[0]

}




// ------------------ Implementation of stack with animation  -------------------------
// Stack Implementation with array
class Stack {
   
    dataArray = new Array();

    push(value) {

        if(this.dataArray.length > 12) {
            window.alert("Stack out of range")
        }
        else {

        document.getElementById('pushingData').innerHTML = value
        createElement(value)
        this.dataArray.push(value)
        return
        }
    }

    pop() {
        const list = document.getElementsByClassName(structure)
        list[0].remove()
        document.getElementById('popingData').innerHTML = this.dataArray.pop()
    }

    reset = function() {
        container.innerHTML = ''    
    }

    
}

// Function that will be used by the browser
let stack = new Stack()





