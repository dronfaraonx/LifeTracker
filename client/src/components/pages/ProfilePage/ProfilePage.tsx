import React, { useState } from 'react';
import './profile.style.css'; 

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, bio });
  };

  return (
    <div className="container">
      <h2 className="title">Add Personal Information</h2>

      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input" 
            required
          />
        </label>
        <label className="label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input" 
            required
          />
        </label>
        <label className="label">
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input" 
            rows={4}
          />
        </label>
        <button type="submit" className="button">
          Save Information
        </button>
      </form>
    </div>
  );
}
