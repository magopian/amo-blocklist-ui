import React, { Component} from "react";

class Notification extends Component {
  onCloseClick(event) {
    event.preventDefault();
    this.props.close();
  }

  render() {
    return (
      <div className={`notification notification-${this.props.type}`}>
        <a className="close" href="" onClick={this.onCloseClick.bind(this)}>✖</a>
        <h2>{this.props.title || "Info"}</h2>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default class Notifications extends Component {
  render() {
    const {notifications, removeNotification} = this.props;
    return (
      <div className="notifications">{
        notifications.map((notification, index) => {
          return <Notification key={index} {...notification}
            close={removeNotification.bind(null, index)} />;
        })
      }</div>
    );
  }
}
