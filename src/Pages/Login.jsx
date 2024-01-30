import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, setToken }) => {
  const API = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password_hash: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${API}/users/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            if(res.user.user_id){
                const { user, token } = res
                setUser(user)
                setToken(token)
                setFormData(() => ({
                    username: '',
                    password_hash: ''
                }))
                navigate('/tasks');
            } else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))

    
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password_hash"
                value={formData.password_hash}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;