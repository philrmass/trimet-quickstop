import React from 'react';
import Arrival from './Arrival';

let list = [
  {
    line: 'orange',
    destination: 'Milwaukie',
    scheduled: '10:30 PM',
    estimatedMin: 7,
    estimatedSec: 5,
  },
  {
    line: 'green',
    destination: 'City Ctr',
    scheduled: '10:52 PM',
    estimatedMin: 21,
    estimatedSec: 20,
  },
  {
    line: 'orange',
    destination: 'Milwaukie',
    scheduled: '11:00 PM',
    estimatedMin: 28,
    estimatedSec: 40,
  }
];

function ArrivalList() {
  return (
    <div>
      {list.map((arrival, index) => 
        <Arrival 
          key={index}
          line={arrival.line}
          destination={arrival.destination}
          scheduled={arrival.scheduled}
          estimatedMin={arrival.estimatedMin}
          estimatedSec={arrival.estimatedSec} />
      )}
    </div>
  );
}

export default ArrivalList;
