import express from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contacts.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { contactSchema, updateContactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
    
    
const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getContacts));

router.get('/:contactId', isValidID, ctrlWrapper(getContactById));

router.post('/', jsonParser, upload.single('photo'), validateBody(contactSchema), ctrlWrapper(createContact));

router.post('/register', validateBody(contactSchema), ctrlWrapper(createContact));

router.patch('/:contactId', jsonParser, upload.single('photo'), isValidID, validateBody(updateContactSchema), ctrlWrapper(updateContact));

router.delete('/:contactId', isValidID, ctrlWrapper(deleteContact));

export default router;