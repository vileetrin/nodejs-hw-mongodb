import Contacts from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationdata.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contacts.find({userId});

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactQuery.where('userId').equals(userId);

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

export const getContactById = async (contactId, userId) => {
  const contact = await Contacts.findOne({_id: contactId, userId});
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};

export const updateContact = async (contactId, userId, payload, option = {}) => {
  const result = await Contacts.findOneAndUpdate({ _id: contactId, userId}, payload, {new: true}, );

  if (!result) return null;

  return {
    contact: result,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  }
};

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await Contacts.findOneAndDelete({_id: contactId, userId});
  return deletedContact;
};
