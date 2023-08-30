import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchContacts, updateContact, Contact } from '../mockData';
import './style.css'
import { Button } from "@material-tailwind/react";

function ContactDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data: contacts } = useQuery('contacts', fetchContacts);
    const [isActive, setIsActive] = useState(false);

    const contact = contacts?.find((contact) => contact.id === Number(id));

    const queryClient = useQueryClient();

    const updateMutation = useMutation(updateContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
    });

    const handleStatusChange = () => {
        if (contact) {
            const updatedContact: Contact = { ...contact, isActive: !isActive };
            updateMutation.mutate(updatedContact);
            setIsActive(!isActive);
        }
    };

    if (!contact) {
        return <div>Contact not found</div>;
    }

    return (
        <div className='contact-details flex flex-col items-center min-h-screen justify-center'>
            <h2>Contact Details</h2>
            <p>Name: {contact.firstName} {contact.lastName}</p>
            <p>Status: {contact.isActive ? 'Active' : 'Inactive'}</p>
            <Button className='my-2' onClick={handleStatusChange}>
                {isActive ? 'Mark as Inactive' : 'Mark as Active'}
            </Button>
            {/* Additional details */}
            <p className='text-red-600'>Sometimes it is needed to click twice for change the status! Don't know why though.</p>
        </div>
    );
}

export default ContactDetailsPage;
