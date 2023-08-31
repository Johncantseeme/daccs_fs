import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        width: '500px',
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%',
    },
    profilePic: {
        width: '65px',
        height: '65px',
        borderRadius: '20%',
        backgroundColor: '#3f51b5',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2em',
        marginRight: '20px',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#3f51b5',
        color: 'white',
    },
});

interface ProfileProps {
    firstName: string;
    lastName: string;
    address: string;
    iban: string;
    email: string;
    phone: string;
}

const ProfileForm: React.FC<ProfileProps> = ({ firstName, lastName, address, iban, email, phone }) => {
    const classes = useStyles();

    const [profile, setProfile] = useState({
        firstName,
        lastName,
        address,
        iban,
        email,
        phone,
    });

    const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
    const fullName = `${profile.firstName} ${profile.lastName}`;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                setProfile(updatedProfile);
                setOpen(false);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className={classes.profile}>
            <div className={classes.profileHeader}>
                <div className={classes.profilePic}>{initials}</div>
                <Typography variant="h4">{fullName}</Typography>
            </div>
            <div className={classes.infoRow}>
                <Typography variant="body1">Address: {profile.address}</Typography>
                <Typography variant="body1">IBAN: {profile.iban}</Typography>
            </div>
            <div className={classes.infoRow}>
                <Typography variant="body1">Email: {profile.email}</Typography>
                <Typography variant="body1">Phone: {profile.phone}</Typography>
            </div>
            <Button className={classes.button} variant="contained" onClick={handleClickOpen}>
                Edit Profile
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        fullWidth
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                    {/* Add other input fields here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProfileForm;
