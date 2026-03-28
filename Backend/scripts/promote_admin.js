const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/user.model');

const email = process.argv[2];

if (!email) {
    console.log("Please provide an email: node scripts/promote_admin.js user@example.com");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
        if (user) {
            console.log(`Success! ${user.email} is now an ADMIN.`);
        } else {
            console.log("User not found.");
        }
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
