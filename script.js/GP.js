document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and ready.');

    // Function to toggle the menu
    function toggleMenu() {
        var mobileNavbar = document.getElementById('mobileNavbar');
        if (mobileNavbar) {
            mobileNavbar.classList.toggle('active');
        }
    }

    // Attach event listener to menu icon
    var menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('.nav-links li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offset = target.offsetTop - document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // IntersectionObserver for section highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const galleries = {
        house1: [
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png'
        ],
        house2: [
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png'
        ],
        house3: [
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png',
            '/images/EcoHouse - 3D View - 3D View 3.png'
        ]
    };

    window.openGallery = function (houseId) {
        const modal = document.getElementById('imageGalleryModal');
        const highlightedImage = document.getElementById('highlightedImage');
        const thumbnailContainer = document.getElementById('thumbnailContainer');

        // Get the images for the selected house
        const images = galleries[houseId];

        // Set the first image as the highlighted one
        highlightedImage.src = images[0];

        // Clear the thumbnail container and add thumbnails for the images
        thumbnailContainer.innerHTML = '';
        images.forEach((src, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = src;
            thumbnail.onclick = () => changeHighlightedImage(src, thumbnail);
            if (index === 0) {
                thumbnail.classList.add('active');
            }
            thumbnailContainer.appendChild(thumbnail);
        });

        modal.style.display = 'flex';
    }

    window.closeGallery = function () {
        const modal = document.getElementById('imageGalleryModal');
        modal.style.display = 'none';
    }

    function changeHighlightedImage(src, thumbnail) {
        const highlightedImage = document.getElementById('highlightedImage');
        const thumbnails = document.querySelectorAll('.thumbnail-container img');

        // Update the highlighted image
        highlightedImage.src = src;

        // Remove active class from all thumbnails
        thumbnails.forEach(img => img.classList.remove('active'));

        // Add active class to the clicked thumbnail
        thumbnail.classList.add('active');
    }

    // Close the modal when clicking outside of the modal content
    window.onclick = function(event) {
        const modal = document.getElementById('imageGalleryModal');
        if (event.target == modal) {
            closeGallery();
        }
    };
});


document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(this);

    fetch('/submit-valuation', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Expecting JSON response
    .then(data => {
        if (data.success) {
            alert('Valuation request submitted successfully!');
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    });
});



document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get field values
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const propertyType = document.querySelector('#property-type').value;
    const location = document.querySelector('#location').value;

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number

    // Validation logic
    if (!name) {
        alert('Please enter your full name.');
        return;
    }

    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phone || !phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    if (!propertyType) {
        alert('Please select a property type.');
        return;
    }

    if (!location) {
        alert('Please enter the property location.');
        return;
    }

    // If validation passes, proceed to submit the form
    this.submit(); // This will now submit the form after all validations have passed
});


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = dots.length;
    let currentIndex = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // Auto-slide every 10 seconds
    setInterval(nextSlide, 10000);

    // Initialize
    showSlide(currentIndex);

    // Attach event listeners to buttons
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);
});


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    let startX, currentIndex = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function handleDragStart(e) {
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        slides.style.transition = 'none'; // Disable transition during drag
    }

    function handleDragMove(e) {
        if (startX === undefined) return;
        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const dx = x - startX;
        slides.style.transform = `translateX(calc(-${currentIndex * 100}% + ${dx}px))`;
    }

    function handleDragEnd(e) {
        if (startX === undefined) return;
        const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const dx = x - startX;
        slides.style.transition = 'transform 0.3s ease'; // Re-enable transition

        if (Math.abs(dx) > 50) { // Threshold for swipe
            if (dx < 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % totalSlides;
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            }
        }
        showSlide(currentIndex);
        startX = undefined;
    }

    slides.addEventListener('mousedown', handleDragStart);
    slides.addEventListener('mousemove', handleDragMove);
    slides.addEventListener('mouseup', handleDragEnd);
    slides.addEventListener('mouseleave', handleDragEnd); // Handle mouse leaving element

    slides.addEventListener('touchstart', handleDragStart);
    slides.addEventListener('touchmove', handleDragMove);
    slides.addEventListener('touchend', handleDragEnd);

    // Auto-slide every 10 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }, 10000);

    // Initialize
    showSlide(currentIndex);
});


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = dots.length;
    let currentIndex = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    // Auto-slide every 10 seconds
    setInterval(nextSlide, 10000);

    // Initialize
    showSlide(currentIndex);

    // Attach event listeners to buttons
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // Attach event listeners to dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });
});




// Add this to your JS file
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.hidden');
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    elements.forEach(element => {
      observer.observe(element);
    });
  });
  