const ctx = document.getElementById('ghgChart').getContext('2d');

// Data updated to reflect every year from 1990 to 2022
const completeData = {
    labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", 
             "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", 
             "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],

    datasets: [{
        label: 'Gross CO₂ Emissions',
        data: [5100, 5150, 5200, 5250, 5300, 5400, 5500, 5600, 5700, 5800, 6000, 
               6100, 6200, 6300, 6350, 6300, 6250, 6200, 6000, 5900, 5850, 5800, 
               5750, 5700, 5650, 5600, 5500, 5400, 5350, 5300, 5250, 5200, 5150],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true,
    }, {
        label: 'Net CO₂ Emissions',
        data: [4700, 4750, 4800, 4850, 4900, 5000, 5100, 5200, 5300, 5400, 5400, 
               5350, 5300, 5250, 5200, 5100, 5050, 5000, 4900, 4800, 4700, 4600, 
               4500, 4450, 4400, 4350, 4300, 4250, 4200, 4150, 4100, 4050, 4000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
    },
    
   ]
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
                    text: 'Emissions (Million Metric Tons of CO₂ Equivalent)'
                }
            }
        }
    }
});

// Update Chart Based on Year Range
const yearRangeInput = document.getElementById('yearRange');
const yearLabel = document.getElementById('yearLabel');

// Event listener to update the chart when the range input changes
yearRangeInput.addEventListener('input', function () {
    const selectedYear = parseInt(this.value);
    yearLabel.textContent = selectedYear;

    // Filter the data for the selected year range (up to that year)
    updateChartBasedOnYear(selectedYear);
});

function updateChartBasedOnYear(year) {
    const yearIndex = completeData.labels.indexOf(year.toString());
    const newLabels = completeData.labels.slice(0, yearIndex + 1);
    const newDatasets = completeData.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(0, yearIndex + 1)
    }));

    chart.data.labels = newLabels;
    chart.data.datasets = newDatasets;
    chart.update();
}

// Sidebar and submenu toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

function toggleSubMenu(subMenuId) {
    const subMenu = document.getElementById(subMenuId);
    if (subMenu.style.display === "block") {
        subMenu.style.display = "none";
    } else {
        subMenu.style.display = "block";
    }
}

// Add event listeners for submenus
document.querySelectorAll('.has-submenu').forEach(item => {
    item.addEventListener('click', () => {
        const subMenuId = item.getAttribute('data-submenu-id');
        toggleSubMenu(subMenuId);
    });
});
