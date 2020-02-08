import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Container
} from 'reactstrap';

import logo from "../../dd-logo-clipart.png";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}
	
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
	};
	
	
	render() {
		const brandStyle = {
			maxWidth: '150px'
		};
		
		return (
			<div>
				<Navbar color="light" light expand="md">
					<Container>
						<NavbarBrand href="/">
							<img style={brandStyle} src={logo} alt={"DnD_logo"}/>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="mr-auto" navbar>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;