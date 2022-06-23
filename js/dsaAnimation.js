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
    container.appendChild(element)        
}

const initDisplay = function(size) {

    //Resetting if already initialized
    if( container.childElementCount > 1) {
        container.innerHTML = ""
    }

    createElement()
    
  
    //Related Animations 
    anime({
        targets: '.' + structure,
        scale: [
          {value: .1, easing: 'easeOutSine', duration: 500},
          {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
      });
}

const pushStack = function(value){
    
    createElement();

}


// Stack Implementation with array
class Stack {
   
    dataArray = new Array();

    constructor(value) {
        this.dataArray.push(value)
    }

    push(value) {
        this.dataArray.push(value)
        return
    }

    pop() {
        const list = document.getElementsByClassName('box')
        list[list.length-1].remove()
        return this.dataArray.pop()
    }


    
}
