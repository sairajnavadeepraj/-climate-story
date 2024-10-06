const ctx = document.getElementById('ghgChart').getContext('2d');

// Data updated to reflect every year from 1990 to 2022
const completeData = {
    labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", 
             "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", 
             "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],

    datasets: [
        
    {
        label: 'N₂O Emissions', // Nitrous oxide emissions
        data: [400, 410, 415, 420, 425, 430, 435, 440, 445, 450, 455, 
               460, 465, 470, 475, 480, 485, 490, 495, 500, 490, 480, 
               470, 465, 460, 455, 450, 445, 440, 435, 430, 425, 420],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: true,
    },
    {
        label: 'N₂O Emissions (Including LULUCF)', // Nitrous oxide including LULUCF
        data: [390, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450, 
               455, 460, 465, 470, 475, 480, 485, 490, 495, 485, 475, 
               465, 460, 455, 450, 445, 440, 435, 430, 425, 420, 415],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
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
