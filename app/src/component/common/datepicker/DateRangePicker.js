import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker as AirbnbDateRangePicker } from 'react-dates';
import 'style-loader!react-dates/lib/css/_datepicker.css';

/*
    @ Desc : Airbnb Datepicker
    @ Referer : https://github.com/airbnb/react-dates#daterangepicker
    @ LiveDemo : http://airbnb.io/react-dates/?selectedKind=DateRangePicker%20%28DRP%29&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel
 */

class DateRangePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate:props.startDate,
            endDate:props.endDate,
            focusedInput:props.focusedInput,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
        if(this.props.onChange) {
            this.props.onChange({ startDate, endDate });
        }
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    isOutsideRange(momentObj) {
        // 캘린더에서 날짜 활성화 여부를 묻는 메서드. false:활성화/true:비활성화
        if(!this.props.allowsAllDays) {
            // 오늘부터 이후만 표시
            return momentObj.isBefore(moment().subtract(1, 'days'));
        }
        // 모든 날짜 표시
        return false;
    }

    render() {
        return(
            <div style={this.props.style}>
                <AirbnbDateRangePicker
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={this.onFocusChange}
                    isOutsideRange={this.isOutsideRange}
                />
            </div>
        );
    }
}

DateRangePicker.defaultProps = {
    startDate:null,
    endDate:null,
    onChange:null,
    allowsAllDays:false,
    style:{},
};

DateRangePicker.propTypes = {
    startDate:PropTypes.object,
    endDate:PropTypes.object,
    onChange:PropTypes.func,
    allowsAllDays:PropTypes.bool,
    style:PropTypes.object,
};

export default DateRangePicker;