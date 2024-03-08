import React, { useState } from 'react';

const MyForm = () => {
  // State for form input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Handler for form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, such as sending data to a server
    console.log('Form submitted with data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
