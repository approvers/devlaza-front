import * as React from "react";
import * as styles from "css/comp/Avater.module.css";

import AvaterToolTip from "./AvaterToolTip";

import "react-tippy/dist/tippy.css";

import { Tooltip } from "react-tippy";

type AvaterProps = {
  uuid: string;
  hiddenName: boolean;
};

type AvaterState = {
  name: string;
  picurl: string;
  isLoaded: boolean;
};

class Avater extends React.Component<AvaterProps, AvaterState> {
  static defaultProps = {
    hiddenName: false,
  };

  constructor(props: AvaterProps) {
    super(props);
    this.state = {
      name: "",
      picurl: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    // TODO: ここでAPIをぶっ叩く
    this.setState({
      name: this.props.uuid,
      picurl: `${process.env.PUBLIC_URL}/higuchi.png`,
      isLoaded: true,
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <></>;
    }

    let nameElement = <></>;

    if (!this.props.hiddenName) {
      nameElement = (
        <span className={styles.avater_name}>{this.state.name}</span>
      );
    }

    return (
      <Tooltip
        html={<AvaterToolTip uuid={this.props.uuid} />}
        animation="fade"
        animateFill={false}
        delay={300}
        interactive={true}
        theme="light"
      >
        <span className={styles.avater_wrapper}>
          <span className={styles.avater_pic}>
            <img
              src={this.state.picurl}
              alt={`${this.state.name}'s icon`}
              height="24"
            />
          </span>
          {nameElement}
        </span>
      </Tooltip>
    );
  }
}

export default Avater;
