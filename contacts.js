const { v4: uuid } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
        throw new Error('Contact not found');
    }
    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
        throw new Error('Contact not found');
    }

    const result = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const contact = {
        name,
        email,
        phone,
        id: uuid(),
    };

    contacts.push(contact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};
