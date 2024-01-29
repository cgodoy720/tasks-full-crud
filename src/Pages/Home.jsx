import React from 'react';
import { Container } from 'react-bootstrap'

const Home = ({ user, token }) => {
    return (
        <Container className="mt-3 text-center">
            { !user ?
                <h2>World Class Task Management</h2>
                :
                <h2>{user.username}'s tasks</h2>
            }
        </Container>
    );
};

export default Home;