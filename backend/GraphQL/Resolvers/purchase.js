const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../middleware/auth');
const Purchase = require('../../models/Purchase');

module.exports ={
    Query: {
        async getPurchase() {
            try {
              const purchase = await Purchase.find();
              return purchase;
            } catch (err) {
              console.log(err.message)
            }
        }
 },
Mutation :{
async createPurchase(_, {PickUPAddress,idnum}){
    const newPurchase = new Purchase({
        idnum,
        PickUPAddress,
        //createdAt: new Date().toISOString()
        //username:user.username
    });
    const purchase = await newPurchase.save();
    return purchase;
},
async deletePurchase(_, { purchaseId }) {
    const purchase = await Purchase.findOneAndDelete({purchaseId});
      await purchase.delete();

      return 'Post deleted successfully';
}
}
};