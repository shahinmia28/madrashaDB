const { NoticeData } = require('../models/noticeSchema');

const createNotice = async (req, res, next) => {
  try {
    const { noticeTitle, noticeDescription } = req.body;

    const notice = await NoticeData.create({
      noticeTitle,
      noticeDescription,
    });
    res.status(201).send({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const getNotice = async (req, res, next) => {
  try {
    const notice = await NoticeData.find();
    res.status(200).send({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const deleteNotice = async (req, res, next) => {
  try {
    const id = req.params.id;
    await NoticeData.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const updateNotice = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateOptions = { new: true, context: 'query' };

    let update = {
      noticeTitle: req.body.noticeTitle,
      noticeDescription: req.body.noticeDescription,
    };
    const notice = await NoticeData.findByIdAndUpdate(
      { _id: id },
      update,
      updateOptions
    );
    res.status(201).send({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
module.exports = {
  createNotice,
  getNotice,
  deleteNotice,
  updateNotice,
};
