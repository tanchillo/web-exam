import React, { Component } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import {renderData} from '../store/actions/mainActions'
import {connect} from 'react-redux'

class Edit extends Component {

    state = {
        check: []
    }  
    
    async componentDidMount() {
        try {
            const response = await axios.get(`https://scripts-exam-a217a.firebaseio.com/goods/${this.props.location.state.selectedGood}.json`);
            const check = response.data;
            this.setState({check})
        } catch(e) {
            console.log(e)
        }
    }

    nameAdd = event => {
        this.setState({name: event.target.value})
    }

    categoryAdd = event => {
        this.setState({category: event.target.value})
    }

    producerAdd = event => {
        this.setState({producer: event.target.value})
    }

    weightAdd = event => {
        this.setState({weight: event.target.value})
    }

    priceAdd = event => {
        this.setState({price: event.target.value})
    }

    countAdd = event => {
        this.setState({count: event.target.value})
    }

    deleteHandler = async () => {
        try {
            await axios.delete(`https://scripts-exam-a217a.firebaseio.com/goods/${this.props.location.state.selectedGood}.json`);
            this.props.renderData();
        } catch(e) {
            console.log(e)
        }
    }

    updateInfoHandler = async event => {
        event.preventDefault();
        try {
            await axios.put(`https://scripts-exam-a217a.firebaseio.com/goods/${this.props.location.state.selectedGood}.json`, {
                name: this.state.name || this.state.check.name,
                category: this.state.category || this.state.check.category,
                producer: this.state.producer || this.state.check.producer,
                weight: this.state.weight || this.state.check.weight,
                price: this.state.price || this.state.check.price,
                count: this.state.count || this.state.check.count,
            })
        } catch(e) {
            console.log(e)
        }
        this.props.renderData();
        this.props.history.push('/')
    }

    render() {
        const validate = 
        ((this.state.name === '') ||
        (this.state.category === '') ||
        (this.state.producer === '') ||
        (this.state.weight === '') ||
        (this.state.price === '') ||
        (this.state.count === ''))
        return (
            <div className='Edit'>
                <h1>{this.props.name}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <h1>Add new good here</h1>
                            <h6>On this page u can add a new good</h6>
                        </div>
                        <div className="col-xl-6">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter the name' defaultValue={this.state.check.name} onChange={this.nameAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as='select' defaultValue={this.state.check.category} onChange={this.categoryAdd}>
                                        <option value='Furniture'>Furniture</option>
                                        <option value='Technic'>Technic</option>
                                        <option value='Books'>Books</option>
                                        <option value='Phones'>Phones</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Producer</Form.Label>
                                    <Form.Control type='text' defaultValue={this.state.check.producer} placeholder='Enter the producer' onChange={this.producerAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control type='number' defaultValue={this.state.check.weight} placeholder='Enter the weight' onChange={this.weightAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='number' defaultValue={this.state.check.price} placeholder='Enter the price' onChange={this.priceAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Count</Form.Label>
                                    <Form.Control type='number' defaultValue={this.state.check.count} placeholder='Enter the count' onChange={this.countAdd}></Form.Control>
                                </Form.Group>

                                {!validate ? 
                                    <Button variant='primary' type='submit' onClick={this.updateInfoHandler}>Edit good</Button> :
                                    <Button variant='primary' type='submit' disabled>Edit good</Button> 
                                }
                                <Button variant='danger' style={{marginLeft: '2rem'}} onClick={this.deleteHandler}>Delete</Button>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderData: () => dispatch(renderData())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Edit));
