const Contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

console.log(Contacts);

async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
            case 'list': {
                const contacts = await Contacts.listContacts();
                console.log(contacts);
                break;
            }

            case 'get': {
                const contact = await Contacts.getContactById(id);
                console.log(contact);
                break;
            }

            case 'add': {
                const contact = await Contacts.addContact(name, email, phone);
                console.log(contact);
                break;
            }

            case 'remove': {
                const contact = await Contacts.removeContact(id);
                console.log(contact);
                break;
            }

            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
        console.log('Error:' + error.message);
    }
}
invokeAction(argv);
