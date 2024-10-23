import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Form, Button, FormFeedback, FormGroup, Input, Label, Alert } from "reactstrap";
import { FormDataType } from "./authTypes";
import { useUser } from '../../../context/auth';

const SignupPage = () => {
  const { setUser } = useUser();  
  const [formData, setFormData] = useState<FormDataType>({ name: '', email: '', password: '', repeat: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errorMessage) {
      setErrorMessage(null);
    }
  };
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 

    if (formData.password !== formData.repeat) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false); 
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        ...formData,
        repeatPassword: formData.repeat,
      }, {withCredentials: true});
      setUser(res.data.user); 
      navigate('/'); 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Signup failed. Please try again.");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            value={formData.name}
            onChange={changeHandler}
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            value={formData.email}
            onChange={changeHandler}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            value={formData.password}
            onChange={changeHandler}
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="repeat">Repeat Password</Label>
          <Input
            invalid={formData.repeat.length > 0 && formData.repeat !== formData.password}
            value={formData.repeat}
            onChange={changeHandler}
            id="repeat"
            name="repeat"
            placeholder="Repeat Password"
            type="password"
            required
          />
          <FormFeedback>Passwords should match</FormFeedback>
        </FormGroup>
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </>
  );
};

export default SignupPage;
