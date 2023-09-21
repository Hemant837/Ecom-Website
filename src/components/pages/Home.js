import Container from "react-bootstrap/Container";
import { Button, Row, Col } from "react-bootstrap";

const HomePage = () => {
  const events = [
    {
      date: "JUL16",
      city: "DETROIT, MI",
      location: "DTE ENERGY MUSIC THEATRE",
    },
    {
      date: "JUL19",
      city: "TORONTO, ON",
      location: "BUDWEISER STAGE",
    },
    {
      date: "JUL22",
      city: "BRISTOW, VA",
      location: "JIGGY LUBE LIVE",
    },
    {
      date: "JUL29",
      city: "PHOENIX, AZ",
      location: "AK-CHIN PAVILION",
    },
    {
      date: "AUG2",
      city: "LAS VEGAS, NV",
      location: "T-MOBILE ARENA",
    },
    {
      date: "AUG7",
      city: "CONCORD, CA",
      location: "CONCORD PAVILION",
    },
  ];

  return (
    <Container>
      <h3 className="text-center">Tours</h3>
      {events.map((event, index) => (
        <Row key={index} className="justify-content-center mt-4">
          <Col xs lg="1">
            <p>{event.date}</p>
          </Col>
          <Col xs lg="2">
            <p>{event.city}</p>
          </Col>
          <Col xs lg="3">
            <p>{event.location}</p>
          </Col>
          <Col xs lg="2">
            <Button size="sm">Buy Tickets</Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default HomePage;
