const Bike = require("../Models/BikeModel");
const domain = "http://localhost:4000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new bike (Admin Only)
const createBike = async (req, res) => {
  try {
    const {
      name,
      bikeType,
      brand,
      description,
      registrationYear,
      bikeCylinder,
      bikeSpeed,
      pricePerDay,
      
    } = req.body;
    
    let bikeData = {
      name,
      bikeType,
      brand,
      description,
      registrationYear,
      bikeCylinder,
      bikeSpeed,
      pricePerDay,
     
    };

    if (req.file) {
      const bikeImage = `${domain}/uploads/bikes/${req.file.filename}`;
      bikeData.bikeImage = bikeImage;
    }

    const bike = new Bike(bikeData);
    await bike.save();

    res.status(201).json({
      msg: "Bike created successfully",
      bike: bike,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a bike (Admin Only)
const updateBike = async (req, res) => {
  const { name, bikeType, brand, description, registrationYear, bikeCylinder, bikeSpeed, pricePerDay } = req.body;

  // Check if all required fields are present
  if (!name || !bikeType || !brand || !description || !registrationYear || !bikeCylinder || !bikeSpeed || !pricePerDay) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Find and update the bike by ID
    const updateData = {
      name,
      bikeType,
      brand,
      description,
      registrationYear,
      bikeCylinder,
      bikeSpeed,
      pricePerDay,
    };

    // Handle image upload if applicable
    if (req.file) {
      const newImagePath = `${domain}/uploads/bikes/${req.file.filename}`;
      updateData.bikeImage = newImagePath;
    }

    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }  // Return the updated document
    );

    // If bike is not found, return a 404 status
    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }

    // Return the updated bike with a success message
    return res.status(200).json({ msg: "Bike updated successfully", bike });
  } catch (error) {
    // Return a 500 status if there's an error
    return res.status(500).json({ msg: error.message });
  }
};



// Update bike availability (Admin Only)
const updateBikeAvailability = async (req, res) => {
  try {
    const { available } = req.body; // Expecting a boolean value

    // Find and update the bike's availability
    const bike = await Bike.findByIdAndUpdate(req.params.id, { available }, { new: true });

    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }

    res.status(200).json({
      msg: "Bike availability updated successfully",
      bike,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};


// Get all bikes (Public)
const getBikes = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let bikes = await Bike.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    bikes = bikes.sort((a, b) => (a.pricePerDay - b.pricePerDay) * sortOrder);
  }

  res.json(bikes);
};

// Get a single bike by ID (Public)
const getBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }

    res.status(200).json(bike);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a bike (Admin Only)
const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);

    if (!bike) {
      return res.status(404).json({ msg: "Bike not found" });
    }
    return res.status(200).json({ msg: "Bike deleted successfully", success: true });

  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Filter bikes by attributes like brand, type, etc.
const bikeFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.bikeType = { $in: checked };
    if (radio.length) args.pricePerDay = { $gte: radio[0], $lte: radio[1] };

    const bikes = await Bike.find(args);
    res.status(200).send({
      success: true,
      bikes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while Filtering Bikes',
      error,
    });
  }
};

// Search
const searchBikeController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await Bike.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { bikeType: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
      ]
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error In Search Bike API',
      error,
    });
  }
};

module.exports = {
  createBike,
  updateBikeAvailability,
  updateBike,
  getBikes,
  getBike,
  deleteBike,
  bikeFiltersController,
  searchBikeController,
};
