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

change = (e) => {
  this.setState({
    filters: {
      type: e.target.value
    }
  })
}

pets = () => {
  let URL = '/api/pets'
  const type = this.state.filters.type

  if (type !== 'all') {URL = `/api/pets?type=${type}`}
  fetch(URL)
  .then(response => response.json())
  .then(data => this.setPets(data));
}

setPets = (data) => {
  this.setState({
    pets: data
  })
}

adopt = (id) => {
  let pet = this.state.pets.find(pet => pet.id === id)
  pet.isAdopted = true
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
              <Filters onChangeType={this.change} onFindPetsClick={this.pets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adopt} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
