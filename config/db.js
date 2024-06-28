const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
    }).then(() => console.log(`MongoDB is Connected`))
    .catch(err => {
        console.log('mongoose error: ',err)
        console.error(err.message);
        process.exit(1);
    });
};

module.exports = connectDB;