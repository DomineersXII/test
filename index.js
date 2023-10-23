class GameObject {
    constructor(
        game,
        height, 
        width, 
        id, 
        speed, 
        defaultX, 
        defaultY,
      
    ) {
        this.game = game
        this.height = height
        this.width = width
        this.element = document.getElementById(id)
        this.speed = speed
        this.defaultX = defaultX ?? game.width /2 - width/2
        this.defaultY = this.defaultY ?? game.height /2 - height/2
        this.position = {
            x:0,
            y:0,
        }
        this.velocity = {
            x:0,
            y:0,
        }
    }
    resetPosition() {
        this.position.x = this.defaultX
        this.position.y = this.defaultY
    }
    render() {
        this.element.style.left = this.position.x + "px"
        this.element.style.top = this.position.y + "px"

    }
    move() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Player extends GameObject {
constructor(
    game,
    height, 
    width, 
    id, 
    speed, 
    defaultX, 
    defaultY,
  
) {
    super(game, height,width,id,speed,defaultX,defaultY)
    this.isUp = false
    this.isDown = false
    this.score = 0
}
moveUp() {
    if(!this.game.running) return
    if(this.position.y <= 0) return
    this.position.y -= this.speed
}
moveDown() {
    if(!this.game.running) return
    if(this.position.y >= this.game.height - this.height) return
    this.position.y += this.speed
}
update() {
    if(this.isUp) {
        this.moveUp()

    }
    if(this.isDown) {
        this.moveDown()
    }
    this.render()
}
}

class Ball extends GameObject {
    constructor(game, height,width,id,speed,defaultX,defaultY) {
        super(game, height,width,id,speed,defaultX,defaultY)
    }
         resetPosition() {
         super.resetPosition()
              if (Math.random() < 0.5) {
                  this.velocity.x = this.speed
               } else {
                  this.velocity.x = -this.speed   
               }
               
            this.velocity.y = this.speed*Math.sin(Math.floor(Math.random() * (Math.PI/3 - -Math.PI/3) ) -Math.PI/3)
            console.log(this.velocity.y)
        }

        update() {
            this.move()
            this.checkWall()
            this.checkPlayerCollision(this.game.leftPlayer)
            this.checkPlayerCollision(this.game.rightPlayer)
            this.render()
        }
        checkWall() {

            if(this.position.y + this.height > this.game.height) {
                this.velocity.y = -this.speed
            }
            if(this.position.y < 0) {
                this.velocity.y = this.speed
            }
            if(this.position.x < 0) {
              this.game.rightPlayer.score++
                scoreBoard.update()
                this.resetPosition()
            }
            if(this.position.x + this.width > this.game.width) {
                this.game.leftPlayer.score++
                scoreBoard.update()
                this.resetPosition()
            }
        }
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

const game = {
    height: 500,
    width: 500,
    running: false,
    leftPlayer: null,
    rightPlayer: null,
    ball: null,

    init() {
        this.leftPlayer = new Player (this, 50, 10, "leftPaddle", 3.5, 0, null)
        this.rightPlayer = new Player (this, 50, 10, "rightPaddle", 3.5, 490, null)
        this.ball = new Ball(this,10,10, "ball",1.2,null,null)
     
        this.leftPlayer.resetPosition()
        this.rightPlayer.resetPosition()
        this.ball.resetPosition()
        document.addEventListener("keydown", (event) => {
            if(event.key ==="s") {
             this.leftPlayer.isDown = true
            }
            if(event.key ==="w") {
                this.leftPlayer.isUp = true
            }
            if(event.key ==="ArrowDown") {
                this.rightPlayer.isDown = true
            }
            if(event.key ==="ArrowUp") {
                this.rightPlayer.isUp = true
            }
        })

        document.addEventListener("keyup", (event) => {
            if(event.key ==="s") {
                this.leftPlayer.isDown = false
                this.leftPlayer.moveDown()
            }
            if(event.key ==="w") {
                this.leftPlayer.isUp = false
            }
            if(event.key ==="ArrowDown") {
                this.rightPlayer.isDown = false
            }
            if(event.key ==="ArrowUp") {
                this.rightPlayer.isUp = false
            }
        })

        this.running = false
        this.leftPlayer.update()
        this.rightPlayer.update()
        this.ball.update()
        menu.init()
    },
    animate() {
      //  this.frame++
        this.update()
        window.requestAnimationFrame(() => this.animate())
    },
    update() {
        if(this.running) {
            this.leftPlayer.update()
            this.rightPlayer.update()
            this.ball.update()
        }
       
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
        this.text = `${game.leftPlayer.score} - ${game.rightPlayer.score}`
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