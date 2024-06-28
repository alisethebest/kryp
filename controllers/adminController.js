const userModal = require("../model/user");

const members = async (req, res) => {

    const result = await userModal.find({role: "user"}).exec()
    res.status(201).json({ success: true, users: result, status: 200 });
};

const deleteMembers = async (req, res) => {

    const { _id } = req.body;
    const result = await userModal.deleteOne({_id: _id})
    res.status(201).json({ success: true, users: result, status: 200 });
};

const memberCounts = async (req, res) => {
    const result = await userModal.find({role: "user"}).count()
    res.status(201).json({ success: true, counts: result, status: 200 });
};

const makeLoggedIn = async (req, res) => {
    const { _id, is_logged_in } = req.body;
    const result = await userModal.updateOne({_id: _id},{is_logged_in: is_logged_in});
    res.status(201).json({ success: true, counts: result, status: 200 });
};

const loggedInCount = async (req, res) => {
    const result = await userModal.find({is_logged_in: true}).count()
    res.status(201).json({ success: true, counts: result, status: 200 });
};

module.exports =  { members, deleteMembers, memberCounts, makeLoggedIn, loggedInCount };