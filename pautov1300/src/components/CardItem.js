import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import {renderData} from '../store/actions/mainActions'

class CardItem extends Component {

    state = {
        counter: this.props.good.count
    }

    deleteHandler = async () => {
        try {
            await axios.delete(`https://scripts-exam-a217a.firebaseio.com/goods/${this.props.good.id}.json`);
            this.props.renderData();
        } catch(e) {
            console.log(e)
        }
    }

    plusCounter = async () => {
        const counter = parseInt(this.state.counter) + 1;

        this.setState({counter});

        try {
            await axios.put(`https://scripts-exam-a217a.firebaseio.com/goods/${this.props.good.id}.json`, {
                name: this.props.good.name,
                category: this.props.good.category,
                producer: this.props.good.producer,
                weight: this.props.good.producer,
                price: this.props.good.price,
                count: counter
            });
        } catch(e) {
            console.log(e)
        }
    }

    minusCounter = async () => {
        if (this.state.counter > 1) {
            const counter = parseInt(this.state.counter) - 1;

            this.setState({counter});
    
            try {
                await axios.put(`https://scripts-exam-a217a.firebaseio.com/goods/${this.props.good.id}.json`, {
                    name: this.props.good.name,
                    category: this.props.good.category,
                    producer: this.props.good.producer,
                    weight: this.props.good.producer,
                    price: this.props.good.price,
                    count: counter
                });
            } catch(e) {
                console.log(e)
            }
        }
        
    }

    render() {
        return (
            <div className='CardItem card'>
                <div className="card-body">
                    <div className="card-title">{this.props.good.name}</div>
                    <div className="card-subtitle">{this.props.good.category}</div>
                </div>
                <div className="list-group">
                    <div className="list-group-item">Producer: <b>{this.props.good.producer}</b></div>
                    <div className="list-group-item">Weight: <b>{this.props.good.weight}</b> <small style={{color: '#ff3b3b'}}>Kg</small></div>
                    <div className="list-group-item">Count: <b>{this.state.counter}</b> <small style={{color: '#ff3b3b'}}>Pieces</small></div>
                    <div className="list-group-item">Price: <b>{this.props.good.price}</b> <small style={{color: '#ff3b3b'}}>Per Item</small></div>
                    <br/>
                    <Button variant='primary' onClick={this.plusCounter}>+</Button>
                    <Button variant='primary' onClick={this.minusCounter}>-</Button>
                    <br/>
                </div>
                <div className="card-body">
                    <Button variant='warning' onClick={this.props.onEdit}>Edit</Button>
                    <Button variant='danger' style={{marginLeft: '2rem'}} onClick={this.deleteHandler}>Delete</Button>
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

export default connect(null, mapDispatchToProps)(CardItem);
