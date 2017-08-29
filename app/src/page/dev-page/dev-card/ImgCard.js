import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import Img from 'Component/common/img/Img';

class ImgCard extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<DevCardView
				name={"Img | ImgCard.js"}
				desc={[
					"<code>Not available</code> Please refer to ImgCard.js",
				]}
				component={
					<div>
						<Img
							width={30}
							height={30}
							src={""}
						/>
						<Img
							width={60}
							height={60}
							src={""}
						/>
						<Img
							width={120}
							height={120}
							src={""}
						/>
						<Img
							width={120}
							height={120}
							src={""}
							className={"img-circle"}
						/>
						<Img
							width={120}
							height={120}
							src={""}
							className={"img-rounded"}
						/>
						<Img
							width={120}
							height={120}
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
						/>
						<Img
							width={120}
							height={120}
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							className={"img-circle"}
						/>
						<Img
							width={120}
							height={120}
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							className={"img-rounded"}
						/>
						<Img
							width={120}
							height={120}
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							className={"img-thumbnail"}
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

export default ImgCard;