const mongoose=require('mongoose');
const {Schema}=mongoose;    

const productSchema=new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },

    name:{
        type:String,
        required:true
    },

    productType:{
        type:String,
        required:true 
    },
    
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },

    detail1:{
        type:String,
        required:true
    },

     detail2:{
        type:String,
        required:true
    },

     detail3:{
        type:String,
        required:true
    },
     detail4:{
        type:String,
        required:true
    },
     detail5:{
        type:String,
        required:true
    },
     detail6:{
        type:String,
        required:true
    },
    

    // brand:{
    //     type:String,
       
    // },
    rating:{
        type:Number,
        
    },
    numReviews:{
        type:Number,
    },
    countInStock:{
        type:Number,
    }
});

const Product=mongoose.model('Product',productSchema);
module.exports=Product;