import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

import { setSearchField } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField 
    }
}

function App({store}) {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: '',
    //     }
    // }

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    /* Depreciado 
    componentWillMount(){
        console.log('will mount')
    }
    */

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => this.setState({ robots: users }));

    // }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));
        //console.log(store.getState())
    },[])



    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return !robots.length ?
        <h1 className='f1 tc'>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )





}

export default connect(mapStateToProps, mapDispatchToProps)(App);