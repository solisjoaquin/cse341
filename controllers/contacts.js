const mongodb = require("../db/connect");

const ObjectId = require("mongodb").ObjectId;

// from "contacts" collection
const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// use param to get single contact from "contacts" collection
const getSingleContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// use insertOne to add a new contact
const createContact = async (req, res) => {
  const contact = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact."
      );
  }
};

// use replaceOne to modify a contact
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

// use deleteOne to delete a contact
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId }, true);

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = {
  getContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
