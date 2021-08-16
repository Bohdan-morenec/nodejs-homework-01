const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateFile = async (value) => {
  const contactsStringify = JSON.stringify(value);

  await fs.writeFile(contactsPath, contactsStringify);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParse = JSON.parse(data);

    return dataParse;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contactSearch = contacts.find((item) => item.id === contactId);

    if (!contactSearch) {
      throw new Error(`contacts with id= ${contactId} not found`);
    }

    return contactSearch;
  } catch (error) {
    throw error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      throw new Error(`contacts with id=${contactId} not found`);
    }

    const sortContacts = contacts.filter((item) => item.id !== contactId);

    updateFile(sortContacts);

    return contacts[idx];
  } catch (error) {
    throw error.message;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newConta = { name, email, phone, id: uuidv4() };

    contacts.push(newConta);

    updateFile(contacts);

    return newConta;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
