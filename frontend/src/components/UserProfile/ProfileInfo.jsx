import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { StoreContext } from '../../context/StoreContext';
import './ProfileInfo.css';

const ProfileInfo = () => {
    const { currentUser, fetchProfile, updateProfile } = useContext(StoreContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // States for password change dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    const handleSaveProfile = async () => {
        await updateProfile(name, email);
        fetchProfile(); // Refresh the profile information
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
        setIsEditing(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match");
            return;
        }
        // Call the API to change the password
        // await changePassword(currentPassword, newPassword);
        handleCloseDialog();
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIsDialogOpen(false);
    };

    return (
        <div className="profile-container">
            <h1>Profile Information</h1>
            {currentUser ? (
                <div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="profile-actions">
                        {isEditing ? (
                            <>
                                <Button
                                    onClick={handleSaveProfile}
                                    color="primary"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={handleCancelEdit}
                                    color="secondary"
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                color="primary"
                                variant="contained"
                            >
                                Edit Profile
                            </Button>
                        )}
                        <Button
                            onClick={handleOpenDialog}
                            color="secondary"
                            variant="outlined"
                            style={{ marginLeft: '10px' }}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {/* Change Password Dialog */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogContent>
                    <TextField
                        type="password"
                        label="Current Password"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        type="password"
                        label="New Password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        type="password"
                        label="Confirm New Password"
                        fullWidth
                        margin="normal"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleChangePassword} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProfileInfo;
