const Product = require("../Models/ProductModel");
const domain = "http://localhost:4000";
const orderModel= require("../Models/orderModel")
const braintree = require("braintree");


//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new product (Admin Only)
const createProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      productType,
      price,
      description,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      // brand,
      rating,
      numReviews,
      countInStock,
    } = req.body;
    let productData = {
      category,
      name,
      productType,
      price,
      description,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      // brand,
      rating,
      numReviews,
      countInStock,
    };

    if (req.file) {
      const productImage = `${domain}/uploads/products/${req.file.filename}`;
      productData.productImage = productImage;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      msg: "Product created successfully",
      product: product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a product (Admin Only)
const updateProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      productType,
      price,
      description,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      // brand,
      rating,
      numReviews,
      countInStock,
    } = req.body;
    let updateData = {
      category,
      name,
      productType,
      price,
      description,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      // brand,
      rating,
      numReviews,
      countInStock,
    };

    if (req.file) {
      const productImage = `${domain}/uploads/products/${req.file.filename}`;
      updateData.productImage = productImage;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({
      msg: "Product updated successfully",
      product: product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all products (Public)
const getProducts = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let products = await Product.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1; //ternary operator means if we send value from sort query then 1 else -1(assending or descending)
    products = products.sort((a, b) => (a.price - b.price) * sortOrder); //multiplie with * sortOrder
    //products.sort((a,b) => a.price - b.price) means
    // if a.price is greater then b.price then a will come first else b will come first
    // if a.price is less then b.price then a will come last else b will come last
    //product.1=price=5000
    //product.2=price=4000
    //product.3=price=6000
    
    //
  }

  res.json(products);
};

// Get all products (Public) and filter by category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.status(200).json(products);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get a single product by ID (Public)
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a product (Admin Only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res
      .status(200)
      .json({ msg: "Product deleted successfully", success: true });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = { $in: checked };
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while Filtering Products',
      error,
    });
  }
};

// Search
const searchProductController = async (req, res) =>{
  try {
    const {keywoard} = req.params
    const result= await Product.find({
      $or:[
        {name:{$regex :keywoard, $options:"i"}}, // i- wiil be case insensitive
        {productType:{$regex :keywoard, $options:"i"}}
        
      ]
    }).select("-photo") //productImage
    res.json(result)
  }catch(error){
    console.log(error)
    res.status(400).send({
      success:false,
      message: 'Error In Search Product API',
      error
    });
  }
};

//payment gateway api
//token
 const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
 const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((product) => {
      total += product.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user.id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  createProduct,
  updateProduct,
  getProductsByCategory,
  getProducts,
  getProduct,
  deleteProduct,
  productFiltersController,
  searchProductController,
  braintreeTokenController,
  brainTreePaymentController,

};  