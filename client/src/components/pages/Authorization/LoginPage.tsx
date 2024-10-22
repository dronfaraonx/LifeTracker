import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Form, Button, FormGroup, Input, Label, Alert } from "reactstrap";
import { useUser } from '../../../context/auth';
import './login.css'; 

const LoginPage = () => {
  const { setUser } = useUser();  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", { email, password }, {withCredentials: true}, );
      setUser(res.data.user); 
      
      localStorage.setItem("user", JSON.stringify(res.data.user)); 

      navigate(`/`); 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              value={email}
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
              value={password}
              onChange={changeHandler}
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />
          </FormGroup>
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
