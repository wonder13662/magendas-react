import React, { Component } from 'react';
import DevCardView from 'DevPage/common/DevCardView';
import Avatar from 'Component/common/avatar/Avatar';

class AvatarCard extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<DevCardView
				name={"Avatar | AvatarCard.js"}
				desc={[
					"<code>Not available</code> Please refer to AvatarCard.js",
				]}
				component={
					<div>
						<Avatar
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							// style={{display:"inline-block"}}
							width={25}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={""}
							// style={{display:"inline-block"}}
							width={25}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							// style={{display:"inline-block"}}
							width={40}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={""}
							// style={{display:"inline-block"}}
							width={40}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							// style={{display:"inline-block"}}
							width={60}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={""}
							// style={{display:"inline-block"}}
							width={60}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={"http://cdn.images.express.co.uk/img/dynamic/galleries/x701/53087.jpg"}
							width={120}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
						/>

						<Avatar
							src={""}
							width={120}
							tooltipMsg={"Arrrrgh!"}
							fullName={"Tiger Morris"}
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

export default AvatarCard;