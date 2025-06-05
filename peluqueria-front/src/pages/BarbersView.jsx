import { Container, Row, Col, Card, Button } from "react-bootstrap";

const BarberView = () => {
    const turnosMock = [
        { id: 1, cliente: "Juan Viamonte", servicio: "Corte", hora: "10:00 AM" },
        { id: 2, cliente: "Sofia Lopez", servicio: "Corte y barba", hora: "11:30 AM" },
        { id: 3, cliente: "Carlos Gonzales", servicio: "Coloración", hora: "1:00 PM" },
    ];

    return (
        <Container className="mt-5">
        <Card className="p-4 shadow">
            <Card.Body>
            <h3 className="mb-4">Turnos pendientes</h3>
            <p className="mb-4">Estos son los turnos asignados para hoy:</p>

            <Row className="g-4">
                {turnosMock.map((turno) => (
                <Col md={4} key={turno.id}>
                    <Card className="h-100 shadow-sm">
                    <Card.Body>
                        <Card.Title className="mb-3">{turno.cliente}</Card.Title>
                        <Card.Text>
                        <strong>Servicio:</strong> {turno.servicio}<br />
                        <strong>Hora:</strong> {turno.hora}
                        </Card.Text>
                        <div className="d-flex justify-content-end">
                        <Button
                        >
                            Ver detalles
                        </Button>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            </Card.Body>
        </Card>
        </Container>
    );
};

export default BarberView;
