import React, { useState } from "react";
import styled from "styled-components";
const StyledContact = styled.div`
  background-color: white;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  p {
    justify-self: center;
    align-self: center;
    font-size: var(--medium-text);
    padding: 40px;
    text-align: center;
    color: #515151;
  }
  form {
    width: 90%;
    margin: 0 auto;
    label {
      margin-top: 20px;
      font-size: var(--small-text);
      color: #515151;
    }
    textarea {
      width: 100%;
      min-height: 200px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    button {
      margin-top: 10px;
    }
  }
`;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(formData);
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const feedBack = await res.json();
    console.log(feedBack);
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <StyledContact>
      <p>
        If you have any enquiries, please feel free to contact us. <br />
        <br />
        We will get back to you at the first moment!
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      ;
    </StyledContact>
  );
};

export default Contact;
