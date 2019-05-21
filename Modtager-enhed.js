let _: neopixel.Strip = null
let _h_arm: neopixel.Strip = null
let _til_arm: neopixel.Strip = null
let _arm: neopixel.Strip = null
let V_arm: neopixel.Strip = null
let _H: neopixel.Strip = null
let trekant: neopixel.Strip = null
let Mund: neopixel.Strip = null
let h_arm: neopixel.Strip = null
let Næse: neopixel.Strip = null
let mave_top: neopixel.Strip = null
let strip: neopixel.Strip = null
let Øjne: neopixel.Strip = null

strip = neopixel.create(DigitalPin.P2, 50, NeoPixelMode.RGB_RGB)
Øjne = strip.range(0, 2)
Næse = strip.range(2, 1)
Mund = strip.range(3, 4)
_H = strip.range(7, 3)
V_arm = strip.range(10, 5)
_arm = strip.range(15, 4)
mave_top = strip.range(19, 3)
_til_arm = strip.range(22, 1)
h_arm = strip.range(23, 5)
_h_arm = strip.range(28, 7)
trekant = strip.range(35, 13)
_ = strip.range(48, 1)

radio.setGroup(1)

function AktiverLys(LysProgram : number) {
    if(LysProgram == 0) {
        strip.clear() // Sluk alle lys
        strip.show()
        Øjne.showColor(neopixel.colors(NeoPixelColors.Red)) // Lys rødt i øjne
        strip.show()
        basic.pause(500)
        Øjne.clear()
        strip.show()
    }
    if(LysProgram == 1) {
        Øjne.showColor(neopixel.colors(NeoPixelColors.Red))
        mave_top.showColor(neopixel.colors(NeoPixelColors.Orange))
        h_arm.showColor(neopixel.colors(NeoPixelColors.Green))
        trekant.showColor(neopixel.colors(NeoPixelColors.Blue))
        Mund.showColor(neopixel.colors(NeoPixelColors.Violet))
        V_arm.showColor(neopixel.colors(NeoPixelColors.Green))
        Næse.showColor(neopixel.colors(NeoPixelColors.Yellow))
        strip.show()
    }
    if(LysProgram == 2) {
        Øjne.clear()
        basic.pause(200)
        Øjne.show()
        basic.pause(200)
        Øjne.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        Mund.setPixelColor(1, neopixel.colors(NeoPixelColors.Blue))
        Mund.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        Mund.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        strip.show()
    }
    if(LysProgram == 3) {
        strip.showRainbow(1, 360)
        for (let i = 0; i < strip.length(); i++) {
            strip.shift(1)
            strip.show()
            basic.pause(100)
        }
    }
}    

function SpilMusik(musiknummer : number) {
    if (musiknummer == 0) {
        // Spil test-toner - starten af Mester Jakob
        music.playTone(262, music.beat(BeatFraction.Whole))
        music.playTone(294, music.beat(BeatFraction.Whole))
        music.playTone(330, music.beat(BeatFraction.Whole))
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
    if (musiknummer == 1) {
            // Spil "Mester Jakob"
        for (let i = 0; i < 2; i++) {
            music.playTone(262, music.beat(BeatFraction.Whole))
            music.playTone(294, music.beat(BeatFraction.Whole))
            music.playTone(330, music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
        for (let i = 0; i < 2; i++) {
            music.playTone(330, music.beat(BeatFraction.Whole))
            music.playTone(349, music.beat(BeatFraction.Whole))
            music.playTone(392, music.beat(BeatFraction.Double))
        }
        music.rest(music.beat(BeatFraction.Half))
        for (let i = 0; i < 2; i++) {
            music.playTone(392, music.beat(BeatFraction.Half))
            music.playTone(440, music.beat(BeatFraction.Half))
            music.playTone(392, music.beat(BeatFraction.Half))
            music.playTone(349, music.beat(BeatFraction.Half))
            music.playTone(330, music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
        for (let i = 0; i < 2; i++) {
            music.playTone(262, music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Double))
        }
        music.rest(music.beat(BeatFraction.Sixteenth))
    }
    else if (musiknummer == 2) {
        //Spil et andet nummer
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
}

function StartMotor(hastighed : number) {
    pins.analogWritePin(AnalogPin.P1, hastighed)
}

radio.onReceivedValue(function (robotfunktion, værdi) {
    if (robotfunktion == "musik") {
        control.inBackground(function () {SpilMusik(værdi)})
    }
    else if (robotfunktion == "lys") {
        control.inBackground(function () {AktiverLys(værdi)})
    }
    else if (robotfunktion == "motor") {
        control.inBackground(function () {StartMotor(værdi)})
    }
}
)


input.onButtonPressed(Button.A, function () {
    control.inBackground(function () {SpilMusik(0)})
    control.inBackground(function () {AktiverLys(0)})
    control.inBackground(function () {StartMotor(1000)})
    basic.pause(1000)
    control.inBackground(function () {StartMotor(0)})
})
