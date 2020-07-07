import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import {renderData} from '../store/actions/mainActions'
import { withRouter } from 'react-router-dom';

class Add extends Component {

    state = {
        name: '',
        category: 'Books',
        producer: '',
        weight: '',
        price: '',
        count: ''
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

    pushAddData = async event => {
        event.preventDefault();
        const weight = parseInt(this.state.weight);
        const price = parseInt(this.state.price);
        const count = parseInt(this.state.count);

        if((weight && price && count) > 0) {
            try {
                await axios.post('https://scripts-exam-a217a.firebaseio.com/goods.json', this.state);
                this.props.history.push('/')
            } catch(e) {
                console.log(e)
            }
        }
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
            <div className='Add'>
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
                                    <Form.Control type='text' placeholder='Enter the name' onChange={this.nameAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as='select' value={this.state.category} onChange={this.categoryAdd}>
                                        <option value='Furniture'>Furniture</option>
                                        <option value='Technic'>Technic</option>
                                        <option value='Books'>Books</option>
                                        <option value='Phones'>Phones</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Producer</Form.Label>
                                    <Form.Control type='text' placeholder='Enter the producer' onChange={this.producerAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control type='number' placeholder='Enter the weight' onChange={this.weightAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='number' placeholder='Enter the price' onChange={this.priceAdd}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Count</Form.Label>
                                    <Form.Control type='number' placeholder='Enter the count' onChange={this.countAdd}></Form.Control>
                                </Form.Group>

                                {!validate ? 
                                    <Button variant='primary' type='submit' onClick={this.pushAddData}>Add new good</Button> :
                                    <Button variant='primary' type='submit' disabled>Add new good</Button> 
                                }

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

export default withRouter(connect(null, mapDispatchToProps)(Add));
