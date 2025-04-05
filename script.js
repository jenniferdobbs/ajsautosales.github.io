window.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded');
  
    // Only handle one particular tablist; if you have multiple tab
    // lists (might even be nested), you have to apply this code for each one
    const tabList = document.querySelector('[role="tablist"]');
    const tabs = tabList.querySelectorAll(':scope > [role="tab"]');
  
    // Add a click event handler to each tab
    tabs.forEach((tab) => {
      tab.addEventListener('click', changeTabs);
    });
  
    // Enable arrow navigation between tabs in the tab list
    let tabFocus = 0;
  
    tabList.addEventListener('keydown', (e) => {
      // Move right
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        tabs[tabFocus].setAttribute('tabindex', -1);
        if (e.key === 'ArrowRight') {
          tabFocus++;
          // If we're at the end, go to the start
          if (tabFocus >= tabs.length) {
            tabFocus = 0;
          }
          // Move left
        } else if (e.key === 'ArrowLeft') {
          tabFocus--;
          // If we're at the start, move to the end
          if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
          }
        }
  
        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
      }
    });

    // Add event listener for the hamburger menu toggle
    document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
  });
  
  // Function to toggle the mobile menu
  function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
  }

  function changeTabs(e) {
    const targetTab = e.target;
    const tabList = targetTab.parentNode;
    const tabGroup = tabList.parentNode;
  
    // Remove all current selected tabs
    tabList.querySelectorAll(':scope > [aria-selected="true"]').forEach((t) => t.setAttribute('aria-selected', false));
  
    // Set this tab as selected
    targetTab.setAttribute('aria-selected', true);
  
    // Hide all tab panels
    tabGroup.querySelectorAll(':scope > [role="tabpanel"]').forEach((p) => p.setAttribute('hidden', true));
  
    // Show the selected panel
    tabGroup.querySelector(`#${targetTab.getAttribute('aria-controls')}`).removeAttribute('hidden');
  }

// Toggle mobile navigation
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a'); // Select all nav links

  if (hamburger && navLinks) {
    // Toggle the menu when the hamburger is clicked
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close the menu when a nav link is clicked
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }
});

// Dynamically load footer.html into the footer placeholder
document.addEventListener('DOMContentLoaded', () => {
  fetch('footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load footer');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});