import React from 'react';
import {Bar} from 'react-chartjs-2';


//https://www.chartjs.org/docs/latest/charts/bar.html
const data = {
  labels: ['Merkit', 'Numerot', 'Kirjaimet'],
  datasets: [
    {
      label: 'Oikein',
      backgroundColor: 'rgba(127,255,212,0.2)',
      borderColor: 'rgba(127,255,212,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(153, 255, 153,0.4)',
      hoverBorderColor: 'rgba(153, 255, 153,1)',
      data: [65, 59, 80]
    },
    {
      label: 'Väärin',
      backgroundColor: 'rgba(255, 102, 102,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 102, 102,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [10, 23, 12]
    }
  ]
};

export default function KaavioVaaka(props){
  //displayName: 'BarExample',
    return (
      <div>
        <h2>Tulokset aiheittain</h2>
        <Bar
          data={data}

          width={100}
          height={60}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
          }}
        />
      </div>
    );
};