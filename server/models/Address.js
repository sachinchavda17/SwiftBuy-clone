import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  phone: {
    type: Number,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const Address = mongoose.model("Address", AddressSchema);
export default Address;
