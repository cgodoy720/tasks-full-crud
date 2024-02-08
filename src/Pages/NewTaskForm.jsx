import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NewTaskForm = ({ user, token }) => {
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false,
        user_id: user.user_id
    })

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target

        const inputValue =  type === 'checkbox' ?  checked : value
        
        setFormData((prev) => ({
            ...prev,
            [name]: inputValue
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${API}/users/${user.user_id}/tasks`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                setFormData((prev) => ({
                    title: '',
                    description: '',
                    completed: false,
                    ...prev
                }))
                navigate('/tasks')
            })
            .catch(err => console.log(err))
    }

    return (
        <Container style={{ marginTop: "50px" }}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Enter task title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="completed">
                            <Form.Check 
                                type="checkbox"
                                label="Completed"
                                name="completed"
                                checked={formData.completed}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button type="submit">Create Task</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewTaskForm;