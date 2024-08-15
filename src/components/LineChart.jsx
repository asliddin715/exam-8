import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const PriceChart = () => {
    const [timeFrame, setTimeFrame] = useState('24h');

    const data = {
        series: [
            {
                name: 'Price in INR',
                data: [2945000, 2947000, 2943000, 2951000, 2935000, 2948000, 2920000,
                    2935000, 2918000, 2940000, 2933000, 2956000, 2948000, 2960000,
                    2972000, 2965000, 2978000, 2960000, 2972000, 2985000, 2978000,
                    2990000, 2982000, 2975000, 2998000, 2999000, 3002000, 2999000,
                    3000000, 3000000, 3012000, 3005000, 3018000, 3020000, 3022000,
                    3025000, 3028000, 3030000, 3042000, 3045000, 3018000, 3020000,
                    3052000, 3055000, 3058000, 3010000, 3022000, 3035000, 3028000,
                    3020000, 3012000, 3025000, 3058000, 3030000, 3042000, 3075000]
            }
        ],
        options: {
            chart: {
                type: 'line',
                background: '#121212',
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories: ["08:45 AM", "09:15 AM", "09:45 AM", "10:15 AM", "10:45 AM", "11:15 AM", "11:45 AM", "12:15 PM", 
                             "12:45 PM", "01:15 PM", "01:45 PM", "02:15 PM", "02:45 PM", "03:15 PM", "03:45 PM", "04:15 PM", 
                             "04:45 PM", "05:15 PM", "05:45 PM", "06:15 PM", "06:45 PM", "07:15 PM", "07:45 PM", "08:15 PM", 
                             "08:45 PM", "09:15 PM", "09:45 PM", "10:15 PM", "10:45 PM", "11:15 PM", "11:45 PM", "12:15 AM", 
                             "12:45 AM", "01:15 AM", "01:45 AM", "02:15 AM", "02:45 AM", "03:15 AM", "03:45 AM", "04:15 AM", 
                             "04:45 AM", "05:15 AM", "05:45 AM", "06:15 AM", "06:45 AM", "07:15 AM", "07:45 AM", "08:15 AM", 
                             "08:45 AM", "09:15 AM","09:45 AM", "10:15 AM", "10:45 AM","11:15 AM", "11:45 AM", "12:15 PM"],
                labels: {
                    style: {
                        colors: '#ffffff',
                       

                    }
                },
                axisBorder: {
                    color: '#444'
                },
                axisTicks: {
                    color: '#444'
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#ffffff'
                    }
                },
                axisBorder: {
                    color: '#444'
                },
                axisTicks: {
                    color: '#444'
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: ['#87CEEB']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#87CEEB'],
                    shadeIntensity: 1,
                    type: 'vertical',
                    opacityFrom: 0.7,
                    opacityTo: 0.1,
                    stops: [0, 100]
                }
            },
            grid: {
                borderColor: '#444',
                strokeDashArray: 4
            },
            tooltip: {
                theme: 'dark'
            },
            legend: {
                labels: {
                    colors: '#ffffff'
                }
            }
        }
    };

    const handleTimeFrameChange = (frame) => {
        setTimeFrame(frame);
        // Here you can update the data based on the selected time frame
        // For simplicity, this example does not change the data
    };

    return (
        <div style={{ backgroundColor: '#121212', color: '#ffffff', padding: '20px' }}>
            <h1>Price Chart (Past {timeFrame})</h1>
            <Chart options={data.options} series={data.series} type="line" height={400} />
            <div style={{ marginTop: '20px' }} className='flex justify-between items-center'>
                <button className={`pr-[100px] pl-4 py-2 rounded-[5px] border-[#87CEEB] border-[1px] ${timeFrame === "24h" ? "bg-[#87CEEB]" : "bg-[#333] text-white"}`} onClick={() => handleTimeFrameChange('24h')}>24 Hours</button>
                <button className={`pr-[100px] pl-4 py-2 rounded-[5px] border-[#87CEEB] border-[1px] ${timeFrame === "30d" ? "bg-[#87CEEB]" : "bg-[#333] text-white"}`} onClick={() => handleTimeFrameChange('30d')}>30 Days</button>
                <button className={`pr-[100px] pl-4 py-2 rounded-[5px] border-[#87CEEB] border-[1px] ${timeFrame === "3m" ? "bg-[#87CEEB]" : "bg-[#333] text-white"}`} onClick={() => handleTimeFrameChange('3m')}>3 Months</button>
                <button className={`pr-[100px] pl-4 py-2 rounded-[5px] border-[#87CEEB] border-[1px] ${timeFrame === "1y" ? "bg-[#87CEEB]" : "bg-[#333] text-white"}`} onClick={() => handleTimeFrameChange('1y')}>1 Year</button>
            </div>
        </div>
    );
};

export default PriceChart;
