import * as React from "react"
import "./AvaterToolTip.css"
type AvaterToolTipProps = {
	uuid: string
}

type AvaterToolTipState = {
	name: string
	id: string
	picurl: string
	is_loaded: boolean;
}

class AvaterToolTip extends React.Component<AvaterToolTipProps, AvaterToolTipState> {
	
	constructor(props: AvaterToolTipProps){
		super(props);
		this.state = {
			name: "",
			id: "",
			picurl: "",
			is_loaded: false
		};
	}

	componentDidMount() {
		// TODO: ここでAPIをぶっ叩く
		this.setState({
			name: this.props.uuid + "＠限界開発鯖",
			id: this.props.uuid,
			picurl: `${process.env.PUBLIC_URL}/higuchi.png`,
			is_loaded: true,
		});
	}
		
	render() {
		
		if(!this.state.is_loaded) {
			return (<></>)
		}

		return (

			<div className="avatertt-wrapper">
				<span className="avatertt-pic">
					<img src={this.state.picurl} alt={`${this.state.name}'s icon`} height="48" />
				</span>
				<div className="avatertt-name-wrapper">
					<div className="avatertt-name">
						{this.state.name}
					</div>
					<div className="avatertt-id">
						@{this.state.id}
					</div>
				</div>
			</div>
		)
	}

}

export default AvaterToolTip;
