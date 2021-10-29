import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    name: {type: String, required: true},
    phases: {type: [String], default: []},
    participants: {type: [String], default: []},

})

module.exports = mongoose.model('Tournament', TournamentSchema);
export default TournamentSchema;