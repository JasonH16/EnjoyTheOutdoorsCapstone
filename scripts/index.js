document.addEventListener("DOMContentLoaded", function() {
    // Initialize slideshows for each feature item
    const featureItems = document.querySelectorAll(".feature-item");

    featureItems.forEach((feature) => {
        const slides = feature.querySelectorAll(".slide");
        let currentIndex = 0;

        // Show the current slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        // Initial slide display
        showSlide(currentIndex);

        // Cycle slides for each feature-item independently
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 3000); // Change image every 3 seconds
    });
});
