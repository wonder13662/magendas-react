import React, { Component } from 'react';
import ButtonCard from 'DevPage/dev-card/ButtonCard';
import LoadingButtonCard from 'DevPage/dev-card/LoadingButtonCard';
import ModalCard from 'DevPage/dev-card/ModalCard';
import DropDownCard from 'DevPage/dev-card/DropDownCard';
import DropDownFilterCard from 'DevPage/dev-card/DropDownFilterCard';
import DropDownMultiSelectCard from 'DevPage/dev-card/DropDownMultiSelectCard';
import SearchTextFilterCard from 'DevPage/dev-card/SearchTextFilterCard';
import InputCard from 'DevPage/dev-card/InputCard';
import FormInputCard from 'DevPage/dev-card/FormInputCard';
import FileLabelCard from 'DevPage/dev-card/FileLabelCard';
import PanelCard from 'DevPage/dev-card/PanelCard';
import GlassPanelCard from 'DevPage/dev-card/GlassPanelCard';
import TooltipGlassPanelCard from 'DevPage/dev-card/TooltipGlassPanelCard';
import DateRangePickerCard from 'DevPage/dev-card/DateRangePickerCard';
import SingleDatePickerCard from 'DevPage/dev-card/SingleDatePickerCard';
import StepsCard from 'DevPage/dev-card/StepsCard';
import SearchBarCard from 'DevPage/dev-card/SearchBarCard';
import CheckBoxCard from 'DevPage/dev-card/CheckBoxCard';
import FormParselyCard from 'DevPage/dev-card/FormParselyCard';
import ToastCard from 'DevPage/dev-card/ToastCard';
import AvatarCard from 'DevPage/dev-card/AvatarCard';
import ImgCard from 'DevPage/dev-card/ImgCard';
import AdvancedButtonCard from 'DevPage/dev-card/AdvancedButtonCard';
import TableCard from 'DevPage/dev-card/TableCard';
import SelectCard from 'DevPage/dev-card/SelectCard';
import CurrencyInputCard from 'DevPage/dev-card/CurrencyInputCard';
import AlertCard from 'DevPage/dev-card/AlertCard';

import 'style-loader!DevPage/dev-page-theme.less';
import 'style-loader!Src/app-theme.less';

class Common extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9" role="main">
						<AlertCard/>
						<SearchBarCard/>
						<CurrencyInputCard/>
						<ModalCard/>
						<DropDownMultiSelectCard/>
						<TableCard/>
						<AdvancedButtonCard/>
						<ToastCard/>
						<AvatarCard/>
						<ImgCard/>
						<FormParselyCard/>
						<CheckBoxCard/>
						<StepsCard/>
						<DateRangePickerCard/>
						<SingleDatePickerCard/>
						<TooltipGlassPanelCard/>
						<GlassPanelCard/>
						<PanelCard/>
						<FileLabelCard/>
						<FormInputCard/>
						<InputCard/>
						<SelectCard/>
						<DropDownFilterCard/>
						<SearchTextFilterCard/>
						<DropDownCard/>
						<ButtonCard/>
						<LoadingButtonCard/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Common;