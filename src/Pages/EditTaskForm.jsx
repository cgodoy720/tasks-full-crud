import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const EditTaskForm = ({ user, token }) => {
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const { taskId } = useParams()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false,
        user_id: user.user_id
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API}/users/${user.user_id}/tasks/${taskId}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => {
                // Remove console log later. Only for dev purposes
                console.log(res)
                navigate('/tasks')
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        fetch(`${API}/users/${user.user_id}/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => {
                // Remove console log in production
                console.log(res)
                navigate('/tasks')
            })
            .catch(err => console.log())
    }

    useEffect(() => {
        fetch(`${API}/users/${user.user_id}/tasks/${taskId}`, {
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => {
                setFormData((prev) => ({
                    title: res.title,
                    description: res.description,
                    completed: res.completed,
                    user_id: res.user_id
                }))
            })
            .catch(err => console.log(err))
    }, [taskId, token, user.user_id])

    return (
        <Container style={{ marginTop: "50px"}}>
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

                        <Button variant="primary" type="submit">
                        Update Task
                        </Button>{' '}
                        <Button variant="danger" onClick={handleDelete}>
                        Delete Task
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditTaskForm;