import React, { useState } from 'react';
import '../Styles/registration.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom'; 

const RegistrationPage = () => {
  // State to store registration data
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle registration submission
  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:3003/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data.message);
        navigate.push('/');
        // Optionally, you can redirect to the login page or perform other actions
      } else {
        console.error('Registration failed:', data.message);
        // Handle registration failure, show an error message, etc.
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle network or other errors during registration
    }
  };
  return (
    <div className="registration-container">
       <p id="naslov">Dobro došli na forum</p>
      <h2>Registracija</h2>
      <form className="registration-form">
        <input
          class="input-login"
          type="text"
          name="firstName"
          placeholder="Ime"
          value={registrationData.firstName}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="text"
          name="lastName"
          placeholder="Prezime"
          value={registrationData.lastName}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="text"
          name="address"
          placeholder="Adresa"
          value={registrationData.address}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="text"
          name="city"
          placeholder="Grad"
          value={registrationData.city}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="text"
          name="country"
          placeholder="Drzava"
          value={registrationData.country}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="tel"
          name="phoneNumber"
          placeholder="Broj telefona"
          value={registrationData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="email"
          name="email"
          placeholder="Email"
          value={registrationData.email}
          onChange={handleInputChange}
        />
        <input
          class="input-login"
          type="password"
          name="password"
          placeholder="Lozinka"
          value={registrationData.password}
          onChange={handleInputChange}
        />
      </form>
      <button id="btn-reg" onClick={handleRegistration}>Registracija</button>
    </div>
  );
};

export default RegistrationPage;
