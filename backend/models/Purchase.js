const { model, Schema } = require('mongoose');
const purchaseSchema = new Schema({
PickUPAddress:String,
 username:String,
 idnum: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Purchase', purchaseSchema);