import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class ContentTabMenu extends Component {
	constructor(props) {
		super(props);
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	onLinkClick(event) {
		if (this.props.onLinkClick) {
			this.props.onLinkClick(event);
		}
	}

	render() {
		return (
			<div id="contentTabMenuContainer">
				<div className="content-tab-menu">
					<div className="content-tab-menu-nav">
						<ul>
							{this.props.menuItems && 
								this.props.menuItems.map((item, index) =>
									<li key={index}>
										<NavLink
											className={"menu-item"}
											activeClassName={"menu-item active"}
											to={item.routePath}
											onClick={this.onLinkClick}>
											{item.title}
										</NavLink>
									</li>
								)
							}
						</ul>
					</div>
				</div>
				<div className="content-tab-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

ContentTabMenu.propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		routePath: PropTypes.string
	})).isRequired,
	onLinkClick: PropTypes.func
};

export default ContentTabMenu;