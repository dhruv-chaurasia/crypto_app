import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrices } from "./actions/cryptoActions";
import { Modal, Button, Form, Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const symbols = ["BTC", "ETH", "MATIC", "XRP", "SOL"];


const App = () => {

  const dispatch = useDispatch();
  const prices = useSelector((state) => state.cryptoData.prices);
  // console.log(prices);

  const selectedSymbol = localStorage.getItem("selectedSymbol") || "BTC";
  const isModalOpen = JSON.parse(localStorage.getItem("isModalOpen")) || false;

  useEffect(() => {
    dispatch(fetchPrices(selectedSymbol)); 
    const interval = setInterval(() => {
      dispatch(fetchPrices(selectedSymbol));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, selectedSymbol]);

  const handleOpenModal = () => {
    localStorage.setItem("isModalOpen", JSON.stringify(true));
  };

  const handleCloseModal = () => {
    localStorage.setItem("isModalOpen", JSON.stringify(false));
  };

  const handleSymbolChange = (e) => {
    localStorage.setItem("selectedSymbol", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchPrices(localStorage.getItem("selectedSymbol")));
    handleCloseModal();
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Real-Time Crypto Price Data</h1>
      <div className="d-flex justify-content-center my-3">
        <Button variant="primary" onClick={handleOpenModal}>
          Change Cryptocurrency
        </Button>
      </div>
      <Table striped bordered hover className="text-center">
        <thead className="thead-dark">
          <tr>
            <th>Cryptocurrency Name</th>
            <th>Timestamp</th>
            <th>Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price._id}>
              <td>{price.symbol}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
              <td>{price.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Cryptocurrency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={handleSubmit}>
            <Form.Group controlId="formSymbol">
              <Form.Label>Symbol</Form.Label>
              <Form.Select
                defaultValue={selectedSymbol}
                onChange={handleSymbolChange}
                required
              >
                {symbols.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button className="mt-1" variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="mt-1"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default App;
