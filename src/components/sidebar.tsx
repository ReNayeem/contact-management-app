import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';


export function DefaultSidebar() {
    return (
        <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sidebar">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Sidebar
                </Typography>
            </div>
            <List>
                <ListItem>
                    <Link to='/'>Contact</Link>
                </ListItem>
                <ListItem>
                    Charts and Maps
                </ListItem>
            </List>
        </Card>
    );
}