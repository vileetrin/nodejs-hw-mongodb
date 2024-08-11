import express from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contacts.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { contactSchema, updateContactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
    
    
const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContacts));

router.get('/contacts/:contactId', isValidID, ctrlWrapper(getContactById));

router.post('/contacts', jsonParser, validateBody(contactSchema), ctrlWrapper(createContact));

router.patch('/contacts/:contactId', jsonParser, isValidID, validateBody(updateContactSchema), ctrlWrapper(updateContact));

router.delete('/contacts/:contactId', isValidID, ctrlWrapper(deleteContact));

export default router;