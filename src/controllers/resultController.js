const { deleteImage } = require('../helper/deleteImage');
const { ResultData } = require('../models/resultSchema');

const createResult = async (req, res, next) => {
  try {
    const image = req.file.filename;
    const { studentName, className, rollNumber } = req.body;

    const result = await ResultData.create({
      studentName,
      className,
      rollNumber,
      image,
    });

    res.status(201).send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const getResult = async (req, res, next) => {
  try {
    const result = await ResultData.find();
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const deleteResult = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await ResultData.findById({ _id: id });
    const imagePath = 'public/image/' + result.image;
    await deleteImage(imagePath);
    await ResultData.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const updateResult = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { studentName, className, rollNumber } = req.body;
    const oldResult = await ResultData.findById({ _id: id });
    let image = oldResult.image;

    if (req.file !== undefined) {
      image = req.file.filename;
      // old image path to delete
      const imagePath = 'public/image/' + oldResult.image;
      await deleteImage(imagePath);
    }

    const updateOptions = { new: true, context: 'query' };

    let update = {
      studentName,
      className,
      rollNumber,
      image,
    };
    await ResultData.findByIdAndUpdate({ _id: id }, update, updateOptions);
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const deleteAllResult = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await ResultData.findById({ _id: id });
    const imagePath = 'public/image/' + result.image;
    await deleteImage(imagePath);
    await ResultData.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
module.exports = {
  createResult,
  getResult,
  deleteResult,
  updateResult,
  deleteAllResult,
};
