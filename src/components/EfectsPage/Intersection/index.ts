function Intersection() {
    const showElements = document.querySelectorAll(".showElements");
    const observerProperty = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('showObserver');
            }
        });
    });
    showElements.forEach(element => { observerProperty.observe(element)});
};

export default Intersection;