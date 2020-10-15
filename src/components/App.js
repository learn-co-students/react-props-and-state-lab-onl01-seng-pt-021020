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

  onChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    const filter = this.state.filters.type
    let url
    
    if (filter === 'all') {
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${filter}`
    }

    fetch(url)
    .then(response => response.json())
    .then(json => {this.setState({pets: Array.from(json)})})
  }

  onAdoptPet = (id) => {
    this.setState(previousState => {
      const thisPet = this.state.pets.find(pet => pet.id === id)
      const thisPetIndex = this.state.pets.indexOf(thisPet)
      const newState = previousState

      newState.pets[thisPetIndex].isAdopted = true

      return newState
    })
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
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.onAdoptPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
