import React from 'react';
import { Icon } from '@blueprintjs/core';

export const FlyItem = props => (
  <div className="bp3-card fly-item">
    <h5 className="bp3-heading">
      <a href={`https://www.kiwi.com/cz/booking?passengers=1-0-0&token=${props.fly.bookingToken}`} target="_blank">
        {props.fly.from} - {props.fly.to}
      </a>
    </h5>
    <p>
      <Icon iconSize={20} intent="primary" icon="changes" /> {props.fly.departureTime} -> {props.fly.arrivalTime}
    </p>
    <p>
      <Icon iconSize={20} intent="primary" icon="time" /> {props.fly.duration}
    </p>
    <p>
      <Icon iconSize={20} intent="primary" icon="euro" /> {props.fly.price}
    </p>
  </div>
);
