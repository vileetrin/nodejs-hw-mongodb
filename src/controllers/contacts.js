import createHttpError from 'http-errors';

import * as ContactService from '../services/contacts.js';

const getContacts = async (req, res) => {
  const contacts = await ContactService.getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await ContactService.getContactById(contactId);
  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id {contactId}!`,
    data: contact,
  });
};

const createContact = async (req, res, next) => {

  const createdContact = await ContactService.createContact(req.body);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactService.updateContact(contactId, req.body);
  
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await ContactService.deleteContact(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(204).send();
};

export {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
