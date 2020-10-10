import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			pets    : [],
			filters : {
				type : 'all',
			},
			error   : null,
		};
	}
	fetchPets = () => {
    const petType = this.state.filters.type;
    const pets = []
    let url;
		if (petType != 'all') {
			url = `/api/pets?type=${petType}`;
			fetch(url).then((r) => r.json()).then((data) => {
        data.filter(pet=> pet.type === petType? pets.push(pet):null)
      });
      this.setState({
        pets : pets,
      });
		} else {
      url = '/api/pets'
			fetch(url).then((r) => r.json()).then((data) => {
				this.setState({
					pets : data,
				});
			});
		}
  };
  
	ChangeType = (event) => {
		event.persist();
		this.setState({
			filters : {
				...this.state.filters,
				type : event.target.value,
			},
		});
	};

	onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

	render() {
		return (
			<div className="ui container">
				<header>
					<h1 className="ui dividing header">React Animal Shelter</h1>
				</header>
				<div className="ui container">
					<div className="ui grid">
						<div className="four wide column">
							<Filters onChangeType={(event) => this.ChangeType(event)} onFindPetsClick={this.fetchPets} />
						</div>
						<div className="twelve wide column">
							<PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
