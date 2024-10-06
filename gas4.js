const ctx = document.getElementById('ghgChart').getContext('2d');

// Data updated to reflect every year from 1990 to 2022
const completeData = {
    labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", 
             "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", 
             "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],

    datasets: [
      {
        label: 'Fluorinated Gas Emissions',
        data: [120, 130, 140, 150, 160, 170, 180, 185, 190, 200, 205, 
            210, 220, 210, 205, 195, 190, 180, 175, 170, 165, 175, 
            180, 185, 190, 195, 200, 205, 210, 215, 220, 230], // Approximated yearly data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
    }]
};

// Initialize Chart
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: completeData.labels, // Displaying all years from 1990 to 2022
        datasets: completeData.datasets
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Carbon Dioxide Emissions (Million Metric Tons of CO₂)'
                }
            }
        }
    }
});

// Update Chart Based on Year Range (This part stays the same)
const yearRangeInput = document.getElementById('yearRange');
const yearLabel = document.getElementById('yearLabel');

// Event listener to update the chart when the range input changes
yearRangeInput.addEventListener('input', function () {
    const selectedYear = parseInt(this.value); // Get the year from the range slider
    yearLabel.textContent = selectedYear; // Update the label to reflect the selected year

    // Filter the data for the selected year range (for simplicity, we'll show up to that year)
    updateChartBasedOnYear(selectedYear);
});

function updateChartBasedOnYear(year) {
    // Find the index of the selected year
    const yearIndex = completeData.labels.indexOf(year.toString());

    // Slice the data and labels to only show data up to the selected year
    const newLabels = completeData.labels.slice(0, yearIndex + 1);
    const newDatasets = completeData.datasets.map(dataset => {
        return {
            ...dataset,
            data: dataset.data.slice(0, yearIndex + 1)
        };
    });

    // Update the chart's data and re-render it
    chart.data.labels = newLabels;
    chart.data.datasets = newDatasets;
    chart.update();
}
