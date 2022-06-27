class GeneralUtil {
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createElement = (data) => {
        const element = document.createElement('div');
        element.classList.add(this.structure)
        element.style.backgroundColor = data?.color
        element.innerHTML = `<p style="color: white; font-size: xx-large">${data?.value}</p>`
        element.classList.add('circlerow')
        return element
    }

    getRandomColor = () => {
        var trans = '0.3';
        var color = 'rgba(';
        for (var i = 0; i < 3; i++) {
            color += Math.floor(Math.random() * 255) + ',';
        }
        color += trans + ')';
        return color;
    }

}

class QueueUtil {
    wrapFR = (value, isfront) => {
        if(isfront) {
            return `<p class="text-center">Front is ${value}</p>`
        }
        return `<p class="text-center">Rear is ${value}</p>`
    }
}

let genralUtils = new GeneralUtil();
let queueUtils = new QueueUtil();