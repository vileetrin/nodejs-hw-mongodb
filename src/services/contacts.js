import Contacts from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationdata.js';
import { SORT_ORDER } from '../constants/sortOrder.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contacts.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavorite !== undefined) {
    contactQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contacts.find().merge(contactQuery).countDocuments(),

    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
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
