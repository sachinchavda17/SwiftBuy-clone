import Address from "../models/Address.js";
import User from "../models/User.js";

const addressController = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      pincode,
    } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found!" });

    // Create and save the new address
    const newAddress = new Address({
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      pincode,
    });
    const savedAddress = await newAddress.save();

    // Add the address ID to the user's addresses array
    user.addresses.push(savedAddress._id);
    await user.save();

    res.status(201).json({ user, address: savedAddress });
  } catch (err) {
    console.log("Error in adding address: ", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default addressController;
