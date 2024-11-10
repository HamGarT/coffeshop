

const loadHTML = async (url, containerId, callback) => {
  try {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with ID '${containerId}' not found.`);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load content from ${url}: ${response.statusText}`);
    }
    container.innerHTML = await response.text();
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleScroll = () => {
  let navbar = document.getElementById('navbar-container');
  if (navbar) {
    if (window.scrollY >= 100 && window.innerWidth >= 1025) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
};

loadHTML('../src/components/navbar.html', 'navbar-container', () => {
  const navbarBtn = document.getElementById('navbarbtn');
  const navbarCLoseBtn = document.getElementById('navbarclosebtn');
  const navbar = document.querySelector('.c-navbar');
  navbarBtn.addEventListener('click', () => {
    navbar.style.width = "100vw"
  });
  navbarCLoseBtn.addEventListener('click', () => {
    navbar.style.width = "0"
  });
});
loadHTML('../src/components/footer.html', 'footer-container');

document.addEventListener('DOMContentLoaded', () => {
  let isThrottled = false;
  window.addEventListener('scroll', () => {
    if (!isThrottled) {
      handleScroll();
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 100);
    }
  });
});

