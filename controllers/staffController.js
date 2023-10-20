const { deleteImage } = require('../helper/deleteImage');
const { StaffData } = require('../models/staffSchema');

const createStaff = async (req, res, next) => {
  try {
    // const image = req.file.filename;
    const { name, email, phone, password, category, index, subject } = req.body;
    let image = 'default.webp';

    if (req.file !== undefined) {
      image = req.file.filename;
    }

    const staff = await StaffData.create({
      name,
      email,
      phone,
      password,
      category,
      index,
      subject,
      image,
    });
    res.status(201).send({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const getStaff = async (req, res, next) => {
  try {
    const staff = await StaffData.find();
    res.status(200).send({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    const staff = await StaffData.findById({ _id: id });

    if (staff.image !== 'default.webp') {
      const imagePath = 'public/image/' + staff.image;
      await deleteImage(imagePath);
    }

    await StaffData.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const updateStaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, phone, password, category, index, subject } = req.body;

    const oldStaff = await StaffData.findById({ _id: id });
    let image = oldStaff.image;
    if (password === '') {
      password === oldStaff.password;
    }

    if (req.file !== undefined) {
      image = req.file.filename;
      // old image path to delete
      const imagePath = 'public/image/' + oldStaff.image;
      await deleteImage(imagePath);
    }

    const updateOptions = { new: true, context: 'query' };

    let update = {
      name,
      email,
      phone,
      password,
      category,
      index,
      subject,
      image,
    };
    await StaffData.findByIdAndUpdate({ _id: id }, update, updateOptions);
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
// const login = async (req, res, next) => {
//   try {
//     const adminExist = await StaffData.findOne({ email: req.body.email });

//     if (!adminExist) {
//       throw Error('Invalid credential');
//     }
//     const pwdCompare = await bcrypt.compare(
//       req.body.password,
//       adminExist.password
//     );
//     if (!pwdCompare) {
//       throw Error('Invalid credential');
//     }
//     const data = {
//       admin: {
//         id: adminExist._id,
//       },
//     };
//     const adminAuth = jwt.sign(data, secretKey);

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       userAuth: adminAuth,
//       userEmail: req.body.email,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ success: false });
//   }
// };

module.exports = {
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff,
};
