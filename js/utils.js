//  ACCORDION 
export default (() => {
    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        panel.style.maxHeight ?  panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + "px";
        for (i = 0; i < acc.length; i++) {
            if (acc[i] != this && acc[i].classList.contains("active")) {
                acc[i].classList.toggle("active");
                acc[i].nextElementSibling.style.maxHeight = null;
            }
        }
    });
    }
})()

const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

const createElement = (data) => {
        const element = document.createElement('div');
        element.classList.add(this.structure)
        element.style.backgroundColor = data?.color
        element.innerHTML = `<p style="color: white; font-size: xx-large">${data?.value}</p>`
        element.classList.add('circlerow')
        return element
    }

const getRandomColor = () => {
        var trans = '0.3';
        var color = 'rgba(';
        for (var i = 0; i < 3; i++) {
            color += Math.floor(Math.random() * 255) + ',';
        }
        color += trans + ')';
        return color;
    }

const wrapFR = (value, isfront) => {
            if(isfront) return `<p class="text-center">Front is ${value}</p>`
            return `<p class="text-center">Rear is ${value}</p>`
        }



function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }


export {getRandomInt, createElement, getRandomColor, wrapFR, sleep}