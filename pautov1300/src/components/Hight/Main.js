import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom';
import Cards from '../Cards';
import Edit from '../Edit';
import Info from '../Info';
import Add from '../Add';

class Main extends Component {

    state = {
        selectedGood: null
    }

    onEditHandler = (x) => {
        this.setState(() => ({
            selectedGood: x.id
        }), () => {
            this.props.history.push('/edit', this.state);
        })
    }

    render() {
        return (
            <div classname='Main'>
                <Switch>
                    <Route path='/' exact>
                        <Cards 
                            onEdit={this.onEditHandler}
                        />
                    </Route>
                    <Route path='/add'>
                        <Add />
                    </Route>
                    <Route path='/info'>
                        <Info />
                    </Route>
                    <Route path='/edit'>
                        <Edit />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default withRouter(Main);
