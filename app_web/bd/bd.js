// db.js
import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URI;

  try {
    await mongoose.connect(connectionUrl, configOptions);
    console.log("Connexion MongoDB réussie !");
  } catch (err) {
    console.log(`Erreur de connexion MongoDB: ${err.message}`);
  }
};

export default connectToDB;
