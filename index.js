const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// addContact({ name: "denia", email: "loh", phone: 213123123123 });
// const c = require("./contacts.json");

// listContacts();

// getContactById(10);

// removeContact(7);
// const d = async () => {
//   console.log(1);
//   try {
//     const a = await removeContact(7);
//     console.log(a);
//   } catch (error) {
//     console.log(2);
//     console.log(error.message);
//   }
// };

// d();

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.table(await getContactById(id));
      break;

    case "add":
      console.table(await addContact({ name, email, phone }));
      break;

    case "remove":
      console.table(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
