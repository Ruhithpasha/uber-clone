import captainModel  from "../models/captain.models.js";

export const createCaptain = async ({ email, password, firstName,lastName,vehicle}) => {
  if (!email || !password || !firstName ||!lastName || !vehicle.colour || !vehicle.capacity || !vehicle.plate || !vehicle.vehicleType) {
    throw new Error("Please provide all the required fields");
  }
  const captain = captainModel.create({
   fullName:{
    firstName:firstName,
    lastName:lastName
   },
   email,
   password,
    vehicle:{
     colour:vehicle.colour,
     capacity:vehicle.capacity,
     plate:vehicle.plate,
     vehicleType:vehicle.vehicleType
    }
  });
  return captain;
}