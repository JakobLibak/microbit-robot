input.onButtonPressed(Button.AB, function () {
    y_akse = input.acceleration(Math.abs(Dimension.Y))
    led.plotBarGraph(
        y_akse,
        1024
    )
    if(program == 0) {
        radio.sendValue("motor", program)
        }
    else {radio.sendValue("motor", y_akse)}
    radio.sendValue("motor", y_akse)
    basic.pause(10)
    radio.sendValue("lys", program)
    basic.pause(10)
    radio.sendValue("musik", program)
    basic.pause(1000)
    basic.showNumber(program)
})
input.onButtonPressed(Button.A, function () {
    if (program > 0) {
        program -= 1
        basic.showNumber(program)
    }
})

input.onButtonPressed(Button.B, function () {
    if (program < 9) {
        program += 1
        basic.showNumber(program)
    }
})

let y_akse: number
let program: number
y_akse = 0 // Nulstil y_akse-værdi ved opstart
program = 1 // Indstil programmet til at være 1 ved opstart
radio.setGroup(1) // Indstil micro:bit til at sende på kanal 1
basic.showNumber(program) // Ved opstart vis programnummer