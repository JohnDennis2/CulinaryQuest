import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Search For a City</Card.Title>
                            <Card.Text>Search here</Card.Text>
                            <Button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default Home;












