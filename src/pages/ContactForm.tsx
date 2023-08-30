import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addContact, updateContact, Contact } from '../mockData';
import './style.css'
import { Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

function ContactForm({ contactToUpdate }: { contactToUpdate?: Contact }) {
    const queryClient = useQueryClient();
    const [firstName, setName] = useState(contactToUpdate?.firstName || '');
    const [lastName, setEmail] = useState(contactToUpdate?.lastName || '');
    const [isActive, setIsActive] = useState(contactToUpdate?.isActive || false);

    const mutationFn = contactToUpdate ? updateContact : addContact;

    const mutation = useMutation(mutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contact: any = {
            id: contactToUpdate?.id || Date.now(),
            firstName,
            lastName,
            isActive,
        };
        mutation.mutate(contact);
        setName('');
        setEmail('');
        setIsActive(false);
    };

    return (
        <form onSubmit={handleSubmit} className='contact-form flex flex-col items-center min-h-screen justify-center'>
            <p className='text-xl'>Add new contact</p>
            <input placeholder='first name' className='w-96 mt-2 border border-black rounded-md p-2' type="text" value={firstName} onChange={(e) => setName(e.target.value)} />
            <input placeholder='last name' type="text" className='w-96 my-2 border border-black rounded-md p-2' value={lastName} onChange={(e) => setEmail(e.target.value)} />
            <label>
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                Active
            </label>
            <Button className='my-4' type="submit">submit</Button>
        </form>
    );
}

export default ContactForm;
