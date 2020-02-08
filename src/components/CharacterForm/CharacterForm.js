import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import Select from 'react-select';


class CharacterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			character_class: null,
			race: null,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
			numRolls: 0
		}
	}
	
	resetState = () => {
		this.setState({
			name: '',
			character_class: null,
			race: null,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
			numRolls: 0
		})
	};
	
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	
	handleSelectChange = selectedOption => {
		const { name } = selectedOption;
		this.setState({ [name]: selectedOption });
	};
	
	//use Math.min.apply method
	removeMin = arr => {
		let low = (Math.min.apply(null, arr));
		arr.splice(arr.indexOf(low), 1);
		return arr;
	};
	
	handleSubmit = event => {
		event.preventDefault();
		if(this.state.name
			&& this.state.character_class.hasOwnProperty('value')
			&& this.state.race.hasOwnProperty('value')
			&& this.state.strength
			&& this.state.intelligence
			&& this.state.dexterity
			&& this.state.constitution
			&& this.state.wisdom
			&& this.state.charisma) {
			
			const newCharacter = {
				name: this.state.name,
				race: this.state.race.value,
				character_class: this.state.character_class.value,
				strength: this.state.strength,
				intelligence: this.state.intelligence,
				dexterity: this.state.dexterity,
				constitution: this.state.constitution,
				wisdom: this.state.wisdom,
				charisma: this.state.charisma
			};
			this.props.postNewCharacter(newCharacter, this.resetState);
		}
		else {
			alert('Please fill out all the forms and roll up stats for your character!');
		}
	};
	
	rollStats = event => {
		// in DnD, you roll for your stats
		// you can roll 4 d6 and take the top 3 numbers
		// be careful though.. you can only reroll stats twice!
		let { numRolls } = this.state;
		if(numRolls < 8) {
			numRolls++;
			const { name } = event.target;
			
			let arrayOfRolls = [];
			// random numebr between 1-6, 4 times
			for(let i = 0; i < 4; i++) {
				arrayOfRolls.push(Math.floor(Math.random() * 6) + 1);
			}
			// drop the lowest number and add all the numbers up!
			const value = this.removeMin(arrayOfRolls).reduce((a, b) => a + b, 0);
			
			this.setState({ [name]: value, numRolls })
		}
		else {
			alert("You're stuck with what you got. Don't fret, you can still make a great character out of a weakling.");
		}
	};
	
	
	render() {
		const characterClasses = [
			{ value: 'Rogue', label: 'Rogue', name: 'character_class'},
			{ value: 'Barbarian', label: 'Barbarian', name: 'character_class'},
			{ value: 'Wizard', label: 'Wizard', name: 'character_class'},
			{ value: 'Bard', label: 'Bard', name: 'character_class'},
			{ value: 'Sorcerer', label: 'Sorcerer', name: 'character_class'},
			{ value: 'Ranger', label: 'Ranger', name: 'character_class'},
			{ value: 'Fighter', label: 'Fighter', name: 'character_class'},
			{ value: 'Monk', label: 'Monk', name: 'character_class'},
			{ value: 'Druid', label: 'Druid', name: 'character_class'},
		];
		
		const characterRaces = [
			{ value: 'Human', label: 'Human', name: 'race'},
			{ value: 'Half-elf', label: 'Half-elf', name: 'race'},
			{ value: 'Halfling', label: 'Halfling', name: 'race'},
			{ value: 'Elf', label: 'Elf', name: 'race'},
			{ value: 'Gnome', label: 'Gnome', name: 'race'},
			{ value: 'Half-ord', label: 'Half-ord', name: 'race'},
			{ value: 'Tiefling', label: 'Tiefling', name: 'race'},
			{ value: 'Dragonborn', label: 'Dragonborn', name: 'race'},
			{ value: 'Dwarf', label: 'Dwarf', name: 'race'},
		];
		
		return (
			<div>
				<Form>
					<FormGroup>
						<Label for="characterName">Character Name</Label>
						<Input
							type="text"
							name="name"
							id="characterName"
							onChange={this.handleInputChange}
							value={this.state.name}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="characterClass">Class</Label>
						<Select
							id={"characterClass"}
							value={this.state.character_class}
							onChange={this.handleSelectChange}
							options={characterClasses}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="characterRace">Race</Label>
						<Select
							id={"characterRace"}
							value={this.state.race}
							onChange={this.handleSelectChange}
							options={characterRaces}
						/>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<Button name="strength" onClick={this.rollStats}>Roll Strength</Button>
									</Col>
									<Col md={12}>
										<h3>{this.state.strength}</h3>
									</Col>
								</Row>
							</Col>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<Button name="intelligence" onClick={this.rollStats}>Roll Intelligence</Button>
									</Col>
									<Col md={12}>
										<h3>{this.state.intelligence}</h3>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<Button name="dexterity" onClick={this.rollStats}>Roll Dexterity</Button>
									</Col>
									<Col md={12}>
										<h3>{this.state.dexterity}</h3>
									</Col>
								</Row>
							</Col>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<Button name="wisdom" onClick={this.rollStats}>Roll Wisdom</Button>
									</Col>
									<Col md={12}>
										<h3>{this.state.wisdom}</h3>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<Button name="constitution" onClick={this.rollStats}>Roll Constitution</Button>
									</Col>
									<Col md={12}>
										<h3>{this.state.constitution}</h3>
									</Col>
								</Row>
							</Col>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<Button name="charisma" onClick={this.rollStats}>Roll Charisma</Button>
									</Col>
									<Col md={12}>
										<h3>{this.state.charisma}</h3>
									</Col>
								</Row>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Button type="submit" onClick={this.handleSubmit}>Submit</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default CharacterForm;