// mockData.ts

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
}

let contacts: Contact[] = [
    {
        id: 1,
        firstName: 'John Doe',
        lastName: 'Doe',
        isActive: true,
    },
    // Add more contacts
];

export function fetchContacts(): Promise<Contact[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contacts);
        }, 500);
    });
}

export function addContact(newContact: Contact): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            newContact.id = contacts.length + 1;
            contacts.push(newContact);
            resolve();
        }, 300);
    });
}

export function updateContact(updatedContact: Contact): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = contacts.findIndex((contact) => contact.id === updatedContact.id);
            if (index !== -1) {
                contacts[index] = updatedContact;
            }
            resolve();
        }, 300);
    });
}

export function deleteContact(id: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            contacts = contacts.filter((contact) => contact.id !== id);
            resolve();
        }, 300);
    });
}
