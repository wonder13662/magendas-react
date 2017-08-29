import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import Table from 'Component/common/table/Table';
import Tr from 'Component/common/table/Tr';
import Th from 'Component/common/table/Th';
import Td from 'Component/common/table/Td';
import Input from 'Component/common/input/Input';
import CurrencyInput from 'Component/common/input/CurrencyInput';
import Button from 'Component/common/button/Button';

class TableCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			sample:2000,
			sample2:2000,
		};

		this.onBlurSample = this.onBlurSample.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickButton = this.onClickButton.bind(this);
	}

	onBlurSample({ userInput }) {
		this.setState({ sample:userInput });
	}

	onChange({ userInput, caretPos }) {
		// Do something...
	}

	onClickButton(param) {

	}

	render() {
		return (
			<div>
				<DevCardView
					name={"Table | TableCard.js"}
					desc={[
						"<code>Not available</code> Please refer to TableCard.js",
					]}
					component={
						<div>
							<Table hover stripe bordered>
								<Tr>
									<Th left width={20}>{"Earnings"}</Th>
									<Th right width={20}>{"Gross Pay"}</Th>
									<Th right width={20}>{"Additional Earnings"}</Th>
									<Th right width={20}>{"Deduction"}</Th>
									<Th right width={20}>{"Net Pay"}</Th>
								</Tr>

								<Tr>
									<Td left>{"Basic Salary"}</Td>
									<Td right offset={1} colSpan={2}>
										<CurrencyInput
											onChange={({ userInput }) => {
												this.setState({ sample:userInput });
											}}
											onBlur={({ userInput }) => {
												this.setState({ sample:userInput });
											}}
											amount={`${this.state.sample}`}
											currency={"RM"}
										/>
									</Td>
								</Tr>

								<Tr>
									<Td left>{"Reimbursement"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 90,000"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Mobile Allowance"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<CurrencyInput
											onChange={({ userInput }) => {
												this.setState({ sample2:userInput });
											}}
											onBlur={({ userInput }) => {
												this.setState({ sample2:userInput });
											}}
											amount={`${this.state.sample2}`}
											currency={"RM"}
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Petrol Allowance"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 765"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Childcare Allowance"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 2,000"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>
										<Button
											className={"btn btn-default"}
											title={" Add new earning"}
											style={{width:"100%"}}
											onClick={this.onClickButton}
										>
											<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
										</Button>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

							</Table>

							<Table hover>

								<Tr>
									<Th hide width={20}></Th>
									<Th hide width={20}></Th>
									<Th hide width={20}></Th>
									<Th hide width={20}></Th>
									<Th hide width={20}></Th>
								</Tr>

								<Tr>
									<Td left>{"Basic Salary"}</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 90,000"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Reimbursement"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 90,000"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Mobile Allowance"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 765"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Petrol Allowance"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 765"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>{"Childcare Allowance"}</Td>
									<Td right>&nbsp;</Td>
									<Td right>
										<Input
											className={""}
											text={"RM 2,000"}
											placeholder={"Type Anything"}
											onChange={this.onChange}
											right
										/>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

								<Tr>
									<Td left>
										<Button
											className={"btn btn-default"}
											title={" Add new earning"}
											style={{width:"100%"}}
											onClick={this.onClickButton}
										>
											<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
										</Button>
									</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
									<Td right>&nbsp;</Td>
								</Tr>

							</Table>


						</div>
					}
					code={
						<div>
							<div className="nt">Not supported</div>
						</div>
					}
				/>
			</div>

		);
	}
}



export default TableCard;