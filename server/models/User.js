const mongoose = require ('mongoose');
//const Schema = mongoose.Schema; // line 2 and 3 are same
const { Schema } = mongoose;

const userSchema = new Schema ({
    googleId: String
});

mongoose.model('users', userSchema);