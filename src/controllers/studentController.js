const { deleteImage } = require('../helper/deleteImage');
const { StudentData } = require('../models/studentSchema');

const createStudent = async (req, res, next) => {
  try {
    let image = 'default.webp';
    if (req.file !== undefined) {
      image = req.file.filename;
    }

    const {
      studentName,
      fatherName,
      motherName,
      className,
      rollNumber,
      dateOfBirth,
      gender,
    } = req.body;

    const student = await StudentData.create({
      studentName,
      fatherName,
      motherName,
      className,
      rollNumber,
      dateOfBirth,
      gender,
      image,
    });
    res.status(201).send({
      success: true,
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const getStudent = async (req, res, next) => {
  try {
    const student = await StudentData.find();
    res.status(200).send({
      success: true,
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await StudentData.findById({ _id: id });

    if (student.image !== 'default.webp') {
      const imagePath = 'public/image/' + student.image;
      await deleteImage(imagePath);
    }

    await StudentData.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      studentName,
      fatherName,
      motherName,
      className,
      rollNumber,
      dateOfBirth,
      gender,
    } = req.body;

    const oldStudent = await StudentData.findById({ _id: id });
    let image = oldStudent.image;
    // if (password === '') {
    //   password === oldStudent.password;
    // }

    if (req.file !== undefined) {
      image = req.file.filename;
      // old image path to delete
      const imagePath = 'public/image/' + oldStudent.image;
      await deleteImage(imagePath);
    }

    const updateOptions = { new: true, context: 'query' };

    let update = {
      studentName,
      fatherName,
      motherName,
      className,
      rollNumber,
      dateOfBirth,
      gender,
      image,
    };
    await StudentData.findByIdAndUpdate({ _id: id }, update, updateOptions);
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
module.exports = {
  createStudent,
  getStudent,
  deleteStudent,
  updateStudent,
};
