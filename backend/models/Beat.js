import mongoose from "mongoose"

const BeatSchema = new mongoose.Schema({
    padsData: {type: Array},
    soundChoices: {type: Object},
    name: {type: String}
})

export const Beat = mongoose.model('Beat', BeatSchema)