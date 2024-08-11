import Contacts from '../db/contacts.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contacts.find();

  const [contacts, count] = await Promise.all([
    contactQuery.skip(skip).limit(limit).exec(),
    Contacts.countDocuments(contactQuery),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, option = {}) => {
  const result = await Contacts.findByIdAndUpdate({ _id: contactId }, payload);

  if (!result) return null;

  return result;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contacts.findByIdAndDelete(contactId);
  return deletedContact;
};
