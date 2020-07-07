import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form';
import {NavLink} from 'react-router-dom'

export default class Layout extends Component {
    render() {
        return (
            <div className='Layout'>
                <Navbar bg="dark" expand="lg" variant='dark'>
                    <Navbar.Brand href="/">Pautov Exam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to='/' className='nav-link'>Home</NavLink>
                            <NavLink to='/add' className='nav-link'>Add Card</NavLink>
                            <NavLink to='/info' className='nav-link'>Info</NavLink>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </div>
        )
    }
}
