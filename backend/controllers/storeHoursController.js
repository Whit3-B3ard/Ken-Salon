// controllers/storeHoursController.js


import StoreHours from '../models/StoreHours.js';

// CREATE STORE HOURS *********************************
export const createStoreHours = async (req, res) => {
  const { store, day } = req.body;

  try {
    // Check if hours already exist for this store on the specified day
    const existingHours = await StoreHours.findOne({
      store,
      day
    });

    if (existingHours) {
      return res.status(409).json({ message: 'Store hours for this day already exist for the given store.' });
    }

    // If no existing hours are found, proceed to create a new entry
    const storeHours = new StoreHours(req.body);
    await storeHours.save();
    res.status(201).json(storeHours);
  } catch (error) {
    console.error('Error creating store hours:', error);
    res.status(400).json({ message: error.message });
  }
};




// Get store hours by specific store ID, return error if 'store' query parameter is not provided ******************
export const getAllStoreHours = async (req, res) => {
  try {
    if (!req.query.store) {
      return res.status(400).json({ message: "Store ID is required as a query parameter." });
    }
    // At this point, req.query.store must be present
    const storeHours = await StoreHours.find({ store: req.query.store });
    if (storeHours.length === 0) {
      return res.status(200).json([]);
    }
    res.json(storeHours);
  } catch (error) {
    console.error(error); // Logging the error to the console
    res.status(500).json({ message: error.message });
  }
};

  
// Get store hours by ID
export const getStoreHoursById = async (req, res) => {
    try {
      const storeHours = await StoreHours.findById(req.params.id);
      if (!storeHours) {
        return res.status(404).json({ message: 'Store hours not found' });
      }
      res.json(storeHours);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  // Update store hours
export const updateStoreHours = async (req, res) => {
    try {
      const storeHours = await StoreHours.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!storeHours) {
        return res.status(404).json({ message: 'Store hours not found' });
      }
      res.json(storeHours);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  // Delete store hours ********************************
export const deleteStoreHours = async (req, res) => {
    try {
      const storeHours = await StoreHours.findByIdAndDelete(req.params.id);
      if (!storeHours) {
        return res.status(404).json({ message: 'Store hours not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  