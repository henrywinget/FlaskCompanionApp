import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";

import Character from "../Character";
import CharacterForm from "../CharacterForm";

import "./Party.css";

class Party extends Component {
	render() {
		return (
			<Container className={"All_party_content"}>
				<Row>
					<Col md={6}>
						<h2>Current Party</h2>
						{this.props.characters.map((character, index) => <Character key={"Character_info_" + index} character={character} index={index}/>)}
					</Col>
					<Col md={6}>
						<h2>Add a Party Member</h2>
						<CharacterForm postNewCharacter={this.props.postNewCharacter}/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Party;