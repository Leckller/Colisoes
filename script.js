const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const gravidade = 0.5

// x, y, cor, raio, sentido

function geradorDeBola(x, y, color, raio, sentido = true) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, raio, 0, Math.PI * 2, sentido)
    ctx.closePath()
    ctx.fill()
}

const bolasCriadas = []

function geradorAutomatico(quantidade, sentido = true) {
    for (let i = 0; i < quantidade; i += 1) {
        const raio = Math.round(Math.random() * 90 + 10)
        let x = Math.floor(Math.random() * cnv.width)
        let y = Math.floor(Math.random() * cnv.height)
        x = x - raio < 0 ? x =+ raio : x
        y = y - raio < 0 ? y =+ raio : y
        x = x + raio > cnv.width ? x -= raio : x
        y = y + raio > cnv.width ? y -= raio : y
        const cor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
        bolasCriadas.push({x, y, raio, cor, vtX: 0, vtY: 0})
        geradorDeBola(x, y, cor, raio, sentido)
    }
}

console.log(bolasCriadas)

function recreate () {
    ctx.clearRect(0,0,cnv.width,cnv.height)
    bolasCriadas.forEach(({ x, y, raio, cor }) => {
        geradorDeBola(x, y, cor, raio, true)
        
    })
}

function move () {
    for (let i = 0; i < bolasCriadas.length; i += 1) {
        const ind = bolasCriadas[i]
        ind.vtY += gravidade
        ind.y += ind.vtY
        ind.x += ind.vtX
        if ((ind.y + ind.raio) > cnv.height) ind.y = cnv.height - ind.raio, ind.vtY *= -1, ind.vtY += ind.y / 350
        // if ((ind.x + ind.raio) > cnv.width || (ind.x - ind.raio) < 0) {
        //     if ((ind.x - ind.raio) < 0) ind.x = ind.raio
        //     if ((ind.x + ind.raio) >= cnv.width) ind.x = cnv.width - ind.raio, ind.vtX += 1, ind.vtX *= -1
        // }
    }
}

geradorAutomatico(2, true)

function loop () {
    window.requestAnimationFrame(loop)
    recreate()
    move()
}

window.onload = () => {
    loop()
}