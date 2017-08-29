import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class ContentSideMenu extends Component {
	constructor(props) {
		super(props);
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	componentDidMount() {
		$(window).on('scroll', function(){
			if($(this).scrollTop() >= 64) { //contentHeader height
				$('#contentSideMenu')
					.css('position', 'fixed')
					.css('top', '80px'); //pageHeader height + sideMenu padding-top
			}else {
				$('#contentSideMenu')
					.css('position', 'inherit')
					.css('top', '0');
			}
		});
	}
	componentWillUnmount() {
		$(window).off('scroll');
	}

	onLinkClick(event) {
		if (this.props.onLinkClick) {
			this.props.onLinkClick(event);
		}
	}


	render() {
		return (
			<div id="content" className="container">
				<div className="col-xs-2 content-side-menu-box">
					<div id="contentSideMenu">
						<div className="content-side-menu-nav">
							{this.props.menuItems &&
								this.props.menuItems.map((item, index) =>
									<NavLink
										key={index}
										className="menu-item"
										activeClassName="menu-item active"
										to={item.routePath}
										onClick={this.onLinkClick}>
										{item.title}
									</NavLink>
								)
							}
						</div>
					</div>
				</div>
				<div id="childContentContainer" className="col-xs-10">
					{this.props.children}
				</div>
			</div>
		);
	}
}

ContentSideMenu.propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		routePath: PropTypes.string.isRequired
	})).isRequired,
	currentPath: PropTypes.string.isRequired,
	onLinkClick: PropTypes.func
};

export default ContentSideMenu;