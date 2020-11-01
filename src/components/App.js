import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilter = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  setPetsState = data => {
    this.setState({
      pets: data
    })
  }

  findClick = event => {
    let filter = this.state.filters.type
    if (filter==='all') {
      fetch('/api/pets')
      .then(response=>response.json())
      .then(data=>this.setPetsState(data))
    } else {
      fetch(`/api/pets?type=${filter}`)
      .then(response=>response.json())
      .then(data=>this.setPetsState(data))
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilter} onFindPetsClick={this.findClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
