const game = {
    height: 500,
    width: 500,
    running: false,
    init() {
        leftPlayer.resetPosition()
        rightPlayer.resetPosition()
        document.addEventListener("keydown", (event) => {
            if(event.key ==="s") {
                leftPlayer.moveDown()
            }
            if(event.key ==="w") {
                leftPlayer.moveUp()
            }
            if(event.key ==="ArrowDown") {
                rightPlayer.moveDown()
            }
            if(event.key ==="ArrowUp") {
                rightPlayer.moveUp()
            }
        })

        this.running = true
        this.animate()
    },
    animate() {
        this.frame++
        this.render()
        window.requestAnimationFrame(() => this.animate())
    },
    render() {
        leftPlayer.render()
        rightPlayer.render()
    },
}

const leftPlayer = {
    element: document.getElementById("leftPaddle"),
    height: 50,
    width: 10,
    speed: 10,
    position: {
        x: 0,
        y: 0,   
    },
    score: 0,
    resetPosition() {
        this.position.x = 0
        this.position.y = game.height/2 - this.height/2
    },
    render() {
        this.element.style.left = this.position.x + "px"
        this.element.style.top = this.position.y + "px"
    },
    moveUp() {
        if(!game.running) return
        if(this.position.y <= 0) return
        this.position.y -= this.speed
    },
    moveDown() {
        if(!game.running) return
        if(this.position.y <= 0) return
        this.position.y += this.speed
    },
}

const rightPlayer = {
    element: document.getElementById("rightPaddle"),
    height: 50,
    width: 10,
    speed: 10,
    position: {
        x: 0,
        y: 0,   
    },
    score: 0,
    resetPosition() {
        this.position.x = 490
        this.position.y = game.height/2 - this.height/2
      
    },
    render() {
        this.element.style.left = this.position.x + "px"
        this.element.style.top = this.position.y + "px"
    },
    moveUp() {
        if(!game.running) return
        if(this.position.y <= 0) return
        this.position.y -= this.speed
    },
    moveDown() {
        if(!game.running) return
        if(this.position.y <= 0) return
        this.position.y += this.speed
    }, 
}


game.init()
