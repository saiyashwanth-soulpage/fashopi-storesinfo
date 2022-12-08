import React from "react";
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";
// Next Imports
import Head from "next/head";
// Redux Imports
// import { connect } from "react-redux";
// React Bootstrap
import { Tab, Nav, Form } from "react-bootstrap";
// components
// import { LoginForm, RegisterForm } from "components/forms";

export default function test() {
  return (
    <div>
      <div className="Container">
        <div className="row">
          <div className="col-md-12">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
