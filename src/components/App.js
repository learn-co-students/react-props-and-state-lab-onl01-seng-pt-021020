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

  changeType = event => {
    event.preventDefault()
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  findPets = () => {
    let url;
    switch (this.state.filters.type) {
      case 'cat':
        url = '/api/pets?type=cat'
        break;
      case 'dog':
        url = '/api/pets?type=dog'
        break;
      case 'micropig':
        url = '/api/pets?type=micropig'
        break;

      default:
        url = '/api/pets'
        break;
    }
    fetch(url)
    .then(resp=>resp.json())
    .then(json=>{
      this.setState({pets: json})
    })
  }

  adoptPet = petId => {
    let pet = this.state.pets.find(pet => pet.id === petId)
    pet.isAdopted = true;
    this.setState({pets: this.state.pets})
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
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
