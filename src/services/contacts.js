import Contacts from "../db/contacts.js"

export const getAllContacts = async () => {
    const contacts = await Contacts.find();
    return contacts;
}

export const getContactById = async () => {
    const contact = await Contacts.findById(contactId);
    return contact;
}