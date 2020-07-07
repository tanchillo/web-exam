import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import {renderData} from '../store/actions/mainActions';
import CardItem from './CardItem'

class Cards extends Component {

    componentDidMount() {
        this.props.renderData();
    }

    searchHandler = term => {
        return function(x) {
            return (x.name.toLowerCase()).includes(term.toLowerCase()) || !term
        }
    }

    render() {
        return (
            <div className='Cards'>
                <div className="container">
                    <div className="row">
                        <Button variant='primary'>Sort by price +</Button>
                        <Button variant='primary'>Sort by price -</Button>
                        <Button variant='primary'>Sort by weight +</Button>
                        <Button variant='primary'>Sort by weight -</Button>

                        <FormControl type='text' placeholder='Enter name for search' />
                    </div>
                </div>
                <hr/>
                <div className="container">
                    <div className="row">
                        {this.props.goods.filter(this.searchHandler(this.props.term)).map((good, index) => {
                            return (
                                <div className="col" key={index+good}>
                                    <CardItem 
                                        good={good}
                                        onEdit={() => this.props.onEdit(good)}
                                        loadData={this.props.loadData}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goods: state.mainReducer.goods,
        term: state.mainReducer.term
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderData: () => dispatch(renderData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
