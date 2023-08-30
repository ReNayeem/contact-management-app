import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchContacts, updateContact, Contact } from '../mockData';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

function ContactDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data: contacts } = useQuery('contacts', fetchContacts);
    const [contactInfo, setContactInfo] = useState<Contact | null>(null);
    const queryClient = useQueryClient();

    const contact = contacts?.find((contact) => contact.id === Number(id));

    const updateMutation = useMutation(updateContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
    });

    const handleStatusChange = () => {
        if (contactInfo) {
            const updatedContact: Contact = { ...contactInfo, isActive: !contactInfo.isActive };
            updateMutation.mutate(updatedContact);
            setContactInfo(updatedContact);
        }
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (contactInfo) {
            setContactInfo({ ...contactInfo, firstName: e.target.value });
        }
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (contactInfo) {
            setContactInfo({ ...contactInfo, lastName: e.target.value });
        }
    };

    if (!contact) {
        return <div>Contact not found</div>;
    }

    if (!contactInfo) {
        setContactInfo(contact);
    }

    const handleSubmit = () => {
        if (contactInfo) {
            updateMutation.mutate(contactInfo);
        }
    };

    return (
        <div className='contact-details flex flex-col items-center min-h-screen justify-center'>

            <h2 className='text-xl mb-2 underline underline-offset-1'>Contact Details</h2>
            <p>
                <strong>First Name:</strong> <input className='w-96 mt-2 border border-black rounded-md p-2' type="text" value={contactInfo?.firstName} onChange={handleFirstNameChange} />
            </p>
            <p>
                <strong>Last Name:</strong> <input className='w-96 my-2 border border-black rounded-md p-2' type="text" value={contactInfo?.lastName} onChange={handleLastNameChange} />
            </p>
            <p>
                <strong>Status:</strong> {contactInfo?.isActive ? 'Active' : 'Inactive'}{' '}
                <Button className='my-2' onClick={handleStatusChange}>
                    {contactInfo?.isActive ? 'Mark as Inactive' : 'Mark as Active'}
                </Button>
            </p>
            <Button onClick={handleSubmit}>Submit</Button>
            {/* Additional details */}
            <p className='text-red-600'>Sometimes it is needed to click twice for change the status! Don't know why though.</p>
        </div>
    );
}

export default ContactDetailsPage;
