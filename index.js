const canvas = document.querySelector("canvas")

canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 200
canvas.style.marginTop = 100+ "px"

let c = canvas.getContext("2d")
let circlePos1Y = window.innerHeight/3 - 22
let circlePos1X = 100
let circlePos2Y = (window.innerHeight/3 + window.innerHeight/3) - 22
let circlePos2X = circlePos1X


// c.lineTo(0,window.innerHeight/3+(window.innerHeight/3)*2)
// c.lineTo(window.innerWidth,window.innerHeight/3+(window.innerHeight/3)*2)
// c.stroke()
class Player {
    constructor() {
        this.y1 = window.innerHeight/3 - 22
        this.x1 = 100
        this.y2 = (window.innerHeight/3 + window.innerHeight/3) - 22
        this.x2 = this.x1
        this.r = 20
        this.fallingVelocity = 8
        this.jumpingVelocity = 15
        this.y = this.y1
        this.x = this.x1
        this.bulletVelocity = 20
        this.bullet1y = (this.y+this.r - 30)
        this.BASEbullet1x = this.x1 + 30
        this.bullet1x = this.BASEbullet1x
        // c.beginPath()
        // c.lineTo(0,window.innerHeight/3)
        // c.lineTo(window.innerWidth, window.innerHeight/3)
        // c.stroke()
        // c.beginPath()
        // c.lineTo(0,window.innerHeight/3 + (window.innerHeight/3))
        // c.lineTo(window.innerWidth,window.innerHeight/3 + (window.innerHeight / 3))
        // c.stroke()
        this.drawPlayer()
    }
    drawPlayer() {
        c.clearRect(0,0,window.innerWidth,window.innerHeight)
        c.beginPath()
        c.arc(this.x,this.y,this.r,0,Math.PI * 2)
        c.stroke()
        c.beginPath()
        c.lineTo(0,window.innerHeight/3)
        c.lineTo(window.innerWidth, window.innerHeight/3)
        c.lineTo(window.innerWidth-100, window.innerHeight/3)
        c.lineTo(window.innerWidth-100,(window.innerHeight/3 )- 100)
        c.lineTo(window.innerWidth-150,(window.innerHeight/3 )- 100)
        c.lineTo(window.innerWidth-150,(window.innerHeight/3 ))
        c.stroke()
        c.beginPath()
        c.lineTo(0,window.innerHeight/3 + (window.innerHeight/3))
        c.lineTo(window.innerWidth,window.innerHeight/3 + (window.innerHeight / 3))
        c.stroke()
        
        console.log("current Y pos : ",this.y)
    }
    
    jump() {
        this.y -= this.jumpingVelocity
        this.drawPlayer()
        if (this.y === this.y2) {
            endedForJump = false
            doJump()
        }
        if (this.y > this.y1 && this.y < this.y1 + 10) {
            endedForJump = true
            this.y = this.y1
        }
        if (this.y+this.r < -50) {
            // this.y = window.innerHeight
            this.y = ((window.innerHeight - this.y2) * 2)
        }
        if (this.y > this.y2 && this.y < this.y2 + 10) {
            this.y = this.y2
            endedForJump = true
        }
        console.log('from jump')
    }
    drawBullet() {
        c.clearRect(this.bullet1x-20,this.bullet1y,10,this.y-200)
        c.beginPath()
        c.rect(this.bullet1x,this.bullet1y,8,4)
        c.fill()
        this.eliminate()
        console.log(this.bullet1x)
    }
    shoot() {
        this.bullet1x += this.bulletVelocity
        this.drawBullet()
    }
    eliminate() {
        if (this.bullet1x > window.innerWidth-140) {
            if (this.bullet1x > window.innerWidth + 100) {
                this.bullet1x = this.BASEbullet1x
                endedForBullet = true
                this.bullet1x = this.BASEbullet1x + 20
                c.fillStyle = "red"
                // endedForBullet = false
            }
        }
    }
    // newBullet() {
    //     endedForBullet = false
    //     doShoot()
    // }
}
let playerFloor = 2
let endedForBullet = false
function doShoot() {
    circle.shoot()
    if (endedForBullet === false) {
        requestAnimationFrame(doShoot)
    } else {
        circle.drawBullet()
    }
}
let endedForJump = false
function doJump() {
    circle.jump()
    if (endedForJump === false) {
        requestAnimationFrame(doJump)
        
    } else {
        circle.drawPlayer()
    }
    console.log(playerFloor)
}
window.addEventListener("click", () => {
    doShoot()
    endedForBullet = false
    c.fillStyle = "black"
})
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        if (playerFloor === 2){ 
            playerFloor = 1
        } else if (playerFloor === 1) {
            playerFloor++
        }
        endedForJump = false
        doJump()
    }
  }
let circle = new Player