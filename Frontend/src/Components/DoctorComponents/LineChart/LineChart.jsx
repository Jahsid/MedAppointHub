
import { Chart as ChartJS, LinearScale, CategoryScale, LineController, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, LineController, PointElement, LineElement, Title, Tooltip, Legend);
const LineChart = ({ appointmentsByYear }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
        scales: {
            x: {
                type: 'category',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            y: {
                type: 'linear',
                position: 'left',
            },
        },
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Monthly Appointments',
                data: appointmentsByYear,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export default LineChart;
