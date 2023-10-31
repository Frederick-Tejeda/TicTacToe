var turn = false, isPlayingPc = false;
var board = [], playedX = [], playedO = [], cannot = [];
var counterX = 0, counter0 = 0, wonner = 0, wonnered = 0;
var newArray, check

const values = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};
var valuesNew = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const Play = (id) => {
    let block = document.getElementById(`${id}d`);
    cannot = [...cannot, values[id]]
    valuesNew = valuesNew.filter(vn => vn != values[id])
    if(board.find(pl => pl == block) != undefined){
        return
    }else{
        if(!turn) playedX = [...playedX, values[block.parentElement.id]]
        if(turn) playedO = [...playedO, values[block.parentElement.id]]
        board = [...board, block]
        block.style.width = '96%'
        block.style.height = '96%'
        block.src = (turn) ? 'circle.png' : 'cross.png' 
        turn = !turn
        if(board.length >= 4) Verify(turn)
        if(isPlayingPc) setTimeout(() => Select(), 500)
    }
}

const Reset = () => {
    board.map(pld => {pld.style.width = '0'; pld.style.height = '0'; pld.src = ''})
    board = [], playedX = [], playedO = [], cannot = []
    newPosition = 0
}

const FullReset = () => {
    board.map(pld => {pld.style.width = '0'; pld.style.height = '0'; pld.src = ''})
    board = [], playedX = [], playedO = [], cannot = []
    newPosition = 0, counter0 = 0, counterX = 0;
    document.getElementById('countX').textContent = '_'
    document.getElementById('count0').textContent = '_'
}

const NewArray = (a, b, c) => check.filter(z => z == a || z == b || z == c)

const Hide = (nA) => {
    for(let m = 0; m < 3; m++){
        for(let n = 0; n < board.length; n++){
            if(values[board[n].parentElement.id] == nA[m]){
                let element = document.getElementById(board[n].id)
                element.style.width = '0'; 
                element.style.height = '0'; 
                element.src = ''
            }
    }
}
}

const Appear = (nA) => {
    turn = !turn
    for(let m = 0; m < 3; m++){
        for(let n = 0; n < board.length; n++){
            if(values[board[n].parentElement.id] == nA[m]){
                let element = document.getElementById(board[n].id)
                element.style.width = '96%'; element.style.height = '96%'; 
                element.src = (!turn) ? 'circle.png' : 'cross.png'
            }
    }
    setTimeout(() => Reset(), 500);
}
}

const WonEffect = nA => {
    setTimeout(() => Hide(nA), 500)
    setTimeout(() => Appear(nA), 1000)
}

const Won = t => {
    (t) ? counterX++ : counter0++
    document.getElementById((t) ? 'countX': 'count0').innerText = (t) ? counterX: counter0;
    wonner++;
    turn = (isPlayingPc) ? turn = false: turn
    return WonEffect(newArray)
}

const Select = () => {
    if(wonner == wonnered){
    if(board.length >= 9) Reset() 
        isPlayingPc = true;
        let newPosition = (Math.floor(Math.random() * 8)) + 1
        while(cannot.find(bf => bf == newPosition) !== undefined)
            newPosition = (Math.floor(Math.random() * 8)) + 1
        let newPlayed = document.getElementById(`${valuesNew[newPosition - 1]}d`)
        cannot = [...cannot, newPosition]
        board = [...board, newPlayed]
        newPlayed.style.width = '96%'
        newPlayed.style.height = '96%'
        newPlayed.src = (turn) ? 'circle.png' : 'cross.png' 
        if(!turn) playedX = [...playedX, values[newPlayed.parentElement.id]]
        if(turn) playedO = [...playedO, values[newPlayed.parentElement.id]]
        turn = !turn
        if(board.length >= 4) Verify(turn)
    }else{
       wonner = wonnered
       turn = false
       if(board.length == 1) Select()
    }
}

const Verify = (t)  => {
    check = []
    check = (t) ? playedX : playedO
    if(check.length >= 3){

        newArray = NewArray(1, 2, 3)   
        if(newArray.length == 3) return Won(t)

        newArray = NewArray(4, 5, 6)
        if(newArray.length == 3) return Won(t)

        newArray = NewArray(7, 8, 9)
        if(newArray.length == 3) return Won(t)
             
        newArray = NewArray(1, 4, 7)
        if(newArray.length == 3) return Won(t)
            
        newArray = NewArray(2, 5, 8)
        if(newArray.length == 3) return Won(t)
            
        newArray = NewArray(1, 5, 9)
        if(newArray.length == 3) return Won(t)
            
        newArray = NewArray(3, 6, 9)
        if(newArray.length == 3) return Won(t)
            
        newArray = NewArray(3, 5, 7)
        if(newArray.length == 3) return Won(t)

    }
    if(board.length >= 9) Reset()
}

const one = document.getElementById('one')
const two = document.getElementById('two')
const three = document.getElementById('three')
const four = document.getElementById('four')
const five = document.getElementById('five')
const six = document.getElementById('six')
const seven = document.getElementById('seven')
const eight = document.getElementById('eight')
const nine = document.getElementById('nine')
const cross = document.getElementById('cross')
const reset = document.getElementById('reset')
const circle = document.getElementById('circle')
const select = document.getElementById('select')

one.addEventListener('click', () => Play('one'))
two.addEventListener('click', () => Play('two'))
three.addEventListener('click', () => Play('three'))
four.addEventListener('click', () => Play('four'))
five.addEventListener('click', () => Play('five'))
six.addEventListener('click', () => Play('six'))
seven.addEventListener('click', () => Play('seven'))
eight.addEventListener('click', () => Play('eight'))
nine.addEventListener('click', () => Play('nine'))
cross.addEventListener('click', () => {if(!isPlayingPc){turn = (board.length == 0) ? false: turn}})
reset.addEventListener('click', () => Reset())
circle.addEventListener('click', () => {if(!isPlayingPc){turn = (board.length == 0) ? true: turn}})
select.addEventListener('change', (a) => {FullReset(); isPlayingPc = !isPlayingPc; if(a.target.value == 'true') setTimeout(() => Select(), 600)})