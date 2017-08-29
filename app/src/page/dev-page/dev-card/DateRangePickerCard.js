import React, { Component } from 'react';
import DateRangePicker from 'Component/common/datepicker/DateRangePicker';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';

class DateRangePickerCard extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

        this.onChange = this.onChange.bind(this);
    }

    onChange({ startDate, endDate }) {
        // console.log("onChange / startDate : ",startDate);
        // console.log("onChange / endDate : ",endDate);
    }

    render() {
        return (
            <DevCardView
                name={"DateRangePicker | DateRangePickerCard.js"}
                desc={[
                    "<code>Not available</code> Please refer to DateRangePickerCard.js",
                ]}
                component={
                    <div>
                        <DateRangePicker
                            onChange={this.onChange}
                            allowsAllDays={false}
                            style={{}}
                        />
                        <DateRangePicker
                            onChange={this.onChange}
                            allowsAllDays={true}
                            style={{marginTop:"10px"}}
                        />
                    </div>
                }
                code={
                    <div>
                        <div className="nt">Not supported</div>
                    </div>
                }
            />
        );
    }
}

export default DateRangePickerCard;