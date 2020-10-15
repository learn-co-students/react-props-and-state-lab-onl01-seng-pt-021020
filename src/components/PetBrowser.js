import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return <div
      className="ui cards"
    >
      {this.props.pets.map(petItem => <Pet
          key={petItem.id}
          pet={petItem}
          onAdoptPet={this.props.onAdoptPet}
        />
      )}
    </div>
  }
}

export default PetBrowser
