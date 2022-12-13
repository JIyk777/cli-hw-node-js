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

// invokeAction({
//     action: 'get',
//     id: '5',
// });
// invokeAction({
//     action: 'add',
//     name: 'test1',
//     email: 'test@mail.com',
//     phone: '044 325 65 77',
// });
// invokeAction({
//     action: 'remove',
//     id: '3d710aec-0362-43f2-a706-87994cf6b5b0',
// });
