const mongoose = require('mongoose');
const authSchema = require('../models/auth.model');

authSchema.statics = {
    create: async function (data) {
        try {
            const user = new this(data);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    },
    login: async function (query) {
        try {
            const users = await this.find(query).exec();
            return users;
        } catch (error) {
            throw error;
        }
    }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;