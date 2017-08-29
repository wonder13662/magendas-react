import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import 'select2';

import "style-loader!select2/dist/css/select2.css";
import 'style-loader!./searchable-select.less';


export default class SearchableSelect extends React.Component {
	constructor(props) {
		super(props);
		this.$el = null;
		this.$select = null;
		this.selectParsley = null;
	}

	componentDidMount() {
		this.$select
			.addClass('swv-searchable-select')
			.select2({ // https://select2.github.io/
				placeholder: {
					id: '',
					text: this.props.placeholder
				},
				allowClear: true
			})
			.on('change', ev => {
				ev.preventDefault();
				ev.stopPropagation();

				const selectedValue = isNaN(ev.target.value)? ev.target.value : Number(ev.target.value);
				if(!selectedValue) {
					this.props.onChange({value: '', title: this.props.placeholder || ''});
					return;
				}
				if(selectedValue && this.props.options) {
					const selectedOption = _.find(this.props.options, option => {
						const optionValue = isNaN(option.value)? option.value: Number(option.value);
						return optionValue === selectedValue;
					});
					this.props.onChange(selectedOption);
				}
			})
			.on('classChanged', () => {
				if(this.$select.hasClass("parsley-error")) {
					this.$el.css('margin-bottom', '12px');
					this.$el.find('.select2-container').addClass('valid-error');
				}else if(this.$select.hasClass("parsley-success")){
					this.$el.css('margin-bottom', '12px');
					this.$el.find('.select2-container').addClass('valid-success');
				}else {
					this.$el.css('margin-bottom', '0');
					this.$el.find('.select2-container')
						.removeClass('valid-error')
						.removeClass('valid-success');
				}
			});

		this.selectParsley = this.$select.parsley();

		const initialValue = this.props.value || '';
		this.$select.val(initialValue).trigger("change");
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.value !== prevProps.value || (this.props.options.length > 0 && prevProps.options.length === 0)) {
			this.$select.val(this.props.value).trigger("change");
			const select2Container = this.$el.find('.select2-container');
			if(select2Container.hasClass('valid-success') || select2Container.hasClass('valid-error')) {
				this.selectParsley.validate();
			}
		}
	}

	componentWillUnmount() {
		this.$select.off('change');
		this.$select.off('classChanged');
	}

	render() {
		let attr = Object.assign({}, this.props.attr);
		attr.disabled = this.props.disabled? "disabled" : "";

		return (
			<div ref={el => this.$el = $(el)}
				 className={`swv-searchable-select ${this.props.className}`}>
				<select
					ref={select => this.$select = $(select)}
					style={{
						width: '100%'
					}}
					{...attr}>
					{this.props.placeholder &&
						<option value='' disabled>{this.props.placeholder}</option>
					}
					{this.props.options && this.props.options.map((option, index) =>
						<option key={index} value={option.value}>{option.title}</option>
					)}
				</select>
			</div>
		);
	}
}

SearchableSelect.defaultProps = {
	className:"",
	disabled:false,
	attr: null,
};
SearchableSelect.propTypes = {
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired
	})),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	attr: PropTypes.object,
};