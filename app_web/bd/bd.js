// db.js
import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = 'mongodb+srv://amirahamdi:j6rS2qQQOC1Q9Q1c@clusterdata.dsbshld.mongodb.net/?appName=ClusterData';

  try {
    await mongoose.connect(connectionUrl, configOptions);
    console.log("Connexion MongoDB réussie !");
  } catch (err) {
    console.log(`Erreur de connexion MongoDB: ${err.message}`);
  }
};

export default connectToDB;
