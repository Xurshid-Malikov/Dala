import React from "react";
import { Bar } from "react-chartjs-2";
import Nav from "./components/Nav/Nav";

function Private() {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "Example Dataset",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options = {
    scales: {
      x: [
        {
          type: 'category',
          position: 'bottom',
        },
      ],
      y: [
        {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
        },
      ],
    },
  };

  return (
    <div>
      <Nav />
      <Bar data={data} options={options} />
    </div>
  );
}

export default Private;