import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchContacts, deleteContact } from '../mockData';
import { Link } from 'react-router-dom';

function ContactList() {
    const queryClient = useQueryClient();
    const { data: contacts } = useQuery('contacts', fetchContacts);
    const deleteMutation = useMutation(deleteContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    return (
        <div>
            {contacts?.map((contact) => (
                <div key={contact.id}>
                    <span>{contact.firstName} {contact.lastName}</span>
                    <span>{contact.isActive ? 'Active' : 'Inactive'}</span>
                    <Link to={`/contact/${contact.id}`}>Details</Link>
                    <button onClick={() => handleDelete(contact.id)}>Delete</button>
                    <Link to='/a'>add new</Link>
                </div>
            ))}
        </div>
    );
}

export default ContactList;
