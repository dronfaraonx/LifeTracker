import React, { useState } from 'react';
import './profile.style.css'; 
import { Divider, Box, Button } from '@mui/material';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState(null);
  const [image, setImage] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, phone, location });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader); // Set the image source to the result of FileReader
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <Box display="flex" alignItems="flex-start" className="container">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="form"
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '16px',
          marginRight: '16px'
        }}
      >
        <h2 className="title">My Profile</h2>

        <div className="image-upload">
          <img 
            src={image || 'https://via.placeholder.com/150'} // Default image if none is uploaded
            alt="Profile"
            className="profile-image" 
            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '16px' }} 
          />
          <Button 
            variant="contained" 
            component="label"
            sx={{ marginBottom: '16px' }}
          >
            Change Image
            <input 
              type="file" 
              hidden 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </Button>
        </div>

        <label className="label">
          Name:
          <input
            type="text"
            value={name}
            className="input" 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Email:
          <input
            type="email"
            value={email}
            className="input" 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Phone:
          <input
            type="text"
            value={phone || ''}
            className="input" 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </label>
        <label className="label">
          Location:
          <input
            type="text"
            value={location}
            className="input" 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </label>
        <button type="submit" className="button">
          Save Information
        </button>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
    </Box>
  );
}
