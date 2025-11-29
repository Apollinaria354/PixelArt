var IS_CLICKED = false
var CURRENT_COLOR =getComputedStyle(document.documentElement).getPropertyValue('--current-color');
var CURRENT_COLORCODE ='1'
var DEFAULT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--default-color');
var FILL_MODE = false
var COLORS = ['rgb(62, 62, 62)','rgb(255, 102, 46)','rgb(26, 218, 84)','rgb(83, 15,255)','rgb(255, 236, 26)','rgb(142, 229, 255)','rgb(218, 83, 207)','rgb(246, 243, 246)','rgb(205, 114, 10','rgb(117, 6, 145)']

document.addEventListener('mouseup',function(){
    IS_CLICKED = false;
})

document.addEventListener('mousedown',function(){
    IS_CLICKED = true;
})

let field = document.querySelector('.field')

for (let i=0; i<450; i+=1) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id','${i}')
    cell.dataset.color = '0'
    cell.style.backgroundColor = COLORS[0]
    field.appendChild(cell)
}

let cells = document.querySelectorAll('.cell')
cells.forEach(cell => {
    cell.addEventListener('mouseover',function(){
        if (IS_CLICKED){
            anime ({
                targets:cell,
                background:CURRENT_COLOR,
                duration:200,
                easing:'linear'

            })
            cell.dataset.color = CURRENT_COLORCODE
        }
    })
    cell.addEventListener('mousedown', function(){
        if(FILL_MODE){
            let cell_id = parseInt(cell.getAttribute('id'))
            FILL_MODE = !FILL_MODE
            anime({
                targets:'.cell',
                background:CURRENT_COLOR,
                duration:500,
                easing:'easeInOutQuad',
                delay: anime.stagger(50, {grid: [30,15], from: cell_id}),
            })
            for(let i=0;i<cells.length; i+=1){
                cells[i].dataset.color = CURRENT_COLORCODE
            }
        } else {
            anime({
                targets:cell,
                background:CURRENT_COLOR,
                duration:500,
                easing:'easeInOutQuad'
        })
        cell.dataset.color = CURRENT_COLORCODE
}
})
})

document.querySelector('.eraser').addEventListener('click', function() {
    CURRENT_COLOR = DEFAULT_COLOR
    CURRENT_COLORCODE = "0"
    document.documentElement.style.cssText = `--current-color: ${CURRENT_COLOR}`
    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})

document.querySelector('.fill-tool').addEventListener('click', function() {
    FILL_MODE = !FILL_MODE
    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})
let color_cells= document.querySelectorAll('.color-cell') 
color_cells.forEach(color_cell => {
 color_cell.addEventListener('click',function(){
    FILL_MODE = false
     CURRENT_COLOR = getComputedStyle(color_cell).backgroundColor;
     CURRENT_COLORCODE = color_cell.dataset.colorcode
     document.documentElement.style.cssText = `--current-color: ${CURRENT_COLOR}`
     document.querySelector('.selected').classList.remove('selected')
    color_cell.classList.add('selected')//добавление класса для объекта выделения
 })
})
document.querySelector('.save-tool').addEventListener('click',function(){
    domtoimage.toJpeg(field, {quality: 2})
    .then(function (dataUrl){
        var img = new Image();
        img.src = dataUrl;
        let link = document.createElement('a');
        link.download = 'pexel.jpg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function(error){
        console.error('oops,somrthing went wrong!', error);
    });
})
