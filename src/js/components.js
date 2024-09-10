document.addEventListener('DOMContentLoaded', () => {
  
    const loadHTML = (url, containerId) => {
      fetch(url)
        .then(response => response.text())
        .then(data => {
          const container = document.getElementById(containerId);
          if (container) {
            container.innerHTML = data;
          } else {
            console.error(`Element with ID ${containerId} not found.`);
          }
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
    };

    // Load navbar and footer
    loadHTML('../../components/navbar.html', 'navbar-container');
    loadHTML('../../components/footer.html', 'footer-container');

    // Handle scroll event for sticky navbar
    const handleScroll = () => {
      const navbar = document.getElementById('navbar-container');
      if (navbar) {
        if (window.scrollY >= 100) {
          navbar.classList.add('sticky');
        } else {
          navbar.classList.remove('sticky');
        }
      }
    };

    // Throttle scroll event handler
    let isThrottled = false;
    window.addEventListener('scroll', () => {
      if (!isThrottled) {
        handleScroll();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 100); // Adjust throttle delay as needed
      }
    });
  });