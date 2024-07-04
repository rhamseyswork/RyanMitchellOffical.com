import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import tourDates from "./data/tourDates.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import TourDates from "./models/tourDatesModel.js";
import Links from "./models/linksModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await TourDates.deleteMany();
        await Links.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;
        
        const sampleLinks = links.map((link) => {
            return { ...link, user: adminUser};
        });

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        const sampleTourDates = tourDates.map((tourDate) => {
            return { ...tourDate, user: adminUser };
        });

        await Links.insertMany(sampleLinks);

        await Product.insertMany(sampleProducts);

        await TourDates.insertMany(sampleTourDates);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await TourDates.deleteMany();
        await Links.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

//console.log(process.argv[1]);
if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}