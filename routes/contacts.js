const express = require("express");

const contactsController = require("../controllers/contacts");

const router = express.Router();

// GET all contacts with "/contacts" URI
router.get("/", contactsController.getContacts);
// GET single contact with "/contacts/:id" URI
router.get("/:id", contactsController.getSingleContact);
// POST
router.post("/", contactsController.createContact);
// PUT
router.put("/:id", contactsController.updateContact);
// DELETE
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
