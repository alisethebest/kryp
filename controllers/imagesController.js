const imageModal = require("../model/Image");

const findImages = async (req, res) => {
    const { search } = req.body
    const result = await imageModal.find({title: { $regex: new RegExp(search, 'i') }}).exec()

    res.status(201).json({ success: true, nfts: result, status: 200 });
};

module.exports = {
    findImages
}