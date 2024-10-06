const ctx = document.getElementById('ghgChart').getContext('2d');

// Data updated to reflect every year from 1990 to 2022
const completeData = {
    labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", 
             "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", 
             "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],

    datasets: [
       
    {
        label: 'CH₄ Emissions', // Methane emissions
        data: [900, 920, 910, 915, 905, 900, 890, 880, 875, 870, 860, 
               850, 845, 835, 820, 815, 805, 800, 790, 780, 770, 760, 
               750, 740, 730, 720, 710, 705, 700, 690, 680, 670, 660],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: true,
    },
    {
        label: 'CH₄ Emissions (Including LULUCF)', // Methane including LULUCF
        data: [870, 890, 885, 880, 870, 860, 855, 850, 840, 835, 830, 
               820, 810, 805, 800, 790, 780, 770, 765, 760, 750, 740, 
               730, 725, 715, 710, 700, 690, 680, 670, 660, 650, 640],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
