import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchContacts, deleteContact } from '../mockData';
import { Link } from 'react-router-dom';
import './style.css'
import { Button } from "@material-tailwind/react";

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
        <div className='contact-list flex flex-col items-center min-h-screen justify-center'>
            {contacts?.map((contact) => (
                <div key={contact.id} className='border border-black rounded-md p-2 mt-4'>
                    <h3 className='mt-2'>Name: <span>{contact.firstName} {contact.lastName}</span></h3>

                    <h3>Status: <span>{contact.isActive ? 'Active' : 'Inactive'}</span></h3>
                    <Link to={`/contact/${contact.id}`}><Button className='m-2'>Edit</Button></Link>
                    <Button className='bg-red-800 m-2' onClick={() => handleDelete(contact.id)}>Delete</Button>
                </div>
            ))}
            <Link to='/new-contact'><Button className='bg-green-900 mt-4'>add new contact</Button></Link>
        </div>
    );
}

export default ContactList;
