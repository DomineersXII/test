const game = {
    height: 500,
    width: 500,
    running: false,
    init() {
        leftPlayer.resetPosition()
        rightPlayer.resetPosition()
        ball.resetPosition()
        document.addEventListener("keydown", (event) => {
            if(event.key ==="s") {
                leftPlayer.isDown = true
            }
            if(event.key ==="w") {
                leftPlayer.isUp = true
            }
            if(event.key ==="ArrowDown") {
                rightPlayer.isDown = true
            }
            if(event.key ==="ArrowUp") {
                rightPlayer.isUp = true
            }
        })

        document.addEventListener("keyup", (event) => {
            if(event.key ==="s") {
                leftPlayer.isDown = false
                leftPlayer.moveDown()
            }
            if(event.key ==="w") {
                leftPlayer.isUp = false
            }
            if(event.key ==="ArrowDown") {
                rightPlayer.isDown = false
            }
            if(event.key ==="ArrowUp") {
                rightPlayer.isUp = false
            }
        })

        this.running = false
        leftPlayer.update()
        rightPlayer.update()
        ball.update()
        menu.init()
    },
    animate() {
      //  this.frame++
        this.update()
        window.requestAnimationFrame(() => this.animate())
    },
    update() {
        if(this.running) {
            leftPlayer.update()
            rightPlayer.update()
            ball.update()
        }
       
    },
}

const leftPlayer = {
    element: document.getElementById("leftPaddle"),
    height: 50,
    width: 10,
    speed: 3.5,
    position: {
        x: 0,
        y: 0,   
    },
    score: 0,
    isUp: false,
    isDown: false,
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
        if(this.position.y >= game.height - this.height) return
        this.position.y += this.speed
    },
    update() {
        if(this.isUp) {
            this.moveUp()

        }
        if(this.isDown) {
            this.moveDown()
        }
        this.render()
    },
}


const rightPlayer = {
    element: document.getElementById("rightPaddle"),
    height: 50,
    width: 10,
    speed: 3.5,
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
        if(this.position.y >= game.height - this.height) return
        this.position.y += this.speed
    },
    update() {
        if(this.isUp) {
            this.moveUp()

        }
        if(this.isDown) {
            this.moveDown()
        }
        this.render()
    },
}

const ball = {
    element: document.getElementById("ball"),
    height: 10,
    width: 10,
    position: {
        x: game.width/2,
        y: game.height/2 - this.height /2,
    },
    speed: 1.2,
    velocity: {
        x: 0,
        y: 0,
    },
    resetPosition() {
        this.position.x = game.width /2
        this.position.y = game.height /2 - this.height/2
        
          if (Math.random() < 0.5) {
              this.velocity.x = this.speed
           } else {
              this.velocity.x = -this.speed   
           }
           
        this.velocity.y = this.speed*Math.sin(Math.floor(Math.random() * (Math.PI/3 - -Math.PI/3) ) -Math.PI/3)
        console.log(this.velocity.y)
    },
    move() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    },
    render() {
        this.element.style.left = this.position.x + "px"
        this.element.style.top = this.position.y + "px"
    },
    update() {
        this.move()
        this.checkWall()
        this.checkPlayerCollision(leftPlayer)
        this.checkPlayerCollision(rightPlayer)
        this.render()
    },
    checkWall() {
        if(this.position.y + this.height > game.height) {
            this.velocity.y = -this.speed
        }
        if(this.position.y < 0) {
            this.velocity.y = this.speed
        }
        if(this.position.x < 0) {
            rightPlayer.score++
            scoreBoard.update()
            this.resetPosition()
        }
        if(this.position.x + this.width > game.width) {
            leftPlayer.score++
            scoreBoard.update()
            this.resetPosition()
        }
    },
    checkPlayerCollision(player) {
        if(this.position.x < player.position.x + player.width 
            && this.position.x + this.width > player.position.x 
            && this.position.y > player.position.y 
            && this.position.y < player.position.y + player.height
            ) {
                 
                this.velocity.x *= -1
                this.velocity.y = this.speed * Math.sin(-Math.PI/3 *
                     ((player.position.y + player.height/2 - this.position.y)/
                     (player.height/2)))
        }
    }
}


const scoreBoard = {
    element: document.getElementById("score"),
    text: "0-0",
    update() {
        this.text = `${leftPlayer.score} - ${rightPlayer.score}`
        this.element.innerText = this.text
    },

}

const menu = {
element:document.getElementById("menu"),
button: document.getElementById("start"),
init() {
    this.button.addEventListener("click",()=> {
        console.log("clicked")
        game.running = true
        game.animate()
        this.element.style.display = "none"
    })
},
}
game.init()
