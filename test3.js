

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
