import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Container className="auth-page">
      <Row>
        <Col md={6} className="login__form-container">
          <div className="auth-card">
            <h1>Welcome back</h1>
            <p className="auth-subtext">Login to manage your bike purchases and track orders.</p>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form style={{ width: "100%" }} onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" disabled={isLoading} className="w-100 btn-primary">
                Login
              </Button>
            </Form>
            <p className="auth-footer">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
          </div>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Login;
