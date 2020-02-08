import React, { Component } from 'react';

import { Row, Col, Collapse, Button } from "reactstrap";

import './Character.css';

class Character extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}
	
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	
	
	// Alternate way to iterate over the character object!
	// generateCharacterStats = player => {
	// 	const characterIterable = Object.keys(player);
	// 	return characterIterable.map((key, index) => {
	// 		if(key.toLowerCase() !== 'name' || key.toLowerCase() !== 'character_class' || key.toLowerCase() !== 'race') {
	// 			return <Col md={4} key={"Character_stat_" + index}>
	// 			<p>{key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}: {player[key]}</p>
	// 		</Col>
	// 		}
	// 	})
	// };
	
	
	render() {
		const {
			name,
			character_class,
			race,
			strength,
			dexterity,
			constitution,
			intelligence,
			wisdom,
			charisma
		} = this.props.character;
		
		const characterHeader = <Row>
			<Col md={3} className={"Flex-beginning"}>
				<Button onClick={this.toggle}>{this.state.isOpen ? 'Less' : 'More'}</Button>
			</Col>
			<Col md={5}>
				<p>{name}</p>
			</Col>
			<Col md={4} className={"Flex-end"}>
				<Button onClick={() => this.props.deleteCharacter(this.props.character.id)} color={"danger"}>X</Button>
			</Col>
		</Row>;
		
		return (
			<div key={"Character_collapse_" + this.props.index} className={"Character_collapse"}>
				{characterHeader}
				<Collapse isOpen={this.state.isOpen}>
					<Row>
						{/*{this.generateCharacterStats(this.props.character)}*/}
						<Col md={6}>
							<p>Class: {character_class}</p>
						</Col>
						<Col md={6}>
							<p>Race: {race}</p>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<p>Strength: {strength}</p>
						</Col>
						<Col md={6}>
							<p>Intelligence: {intelligence}</p>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<p>Dexterity: {dexterity}</p>
						</Col>
						<Col md={6}>
							<p>Wisdom: {wisdom}</p>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<p>Constitution: {constitution}</p>
						</Col>
						<Col md={6}>
							<p>Charisma: {charisma}</p>
						</Col>
					</Row>
				
				</Collapse>
			</div>
		);
	}
}

export default Character;