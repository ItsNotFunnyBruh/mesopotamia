document.addEventListener('DOMContentLoaded', () => {

    const animatedSections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedSections.forEach(section => {
        observer.observe(section);
    });

    
    const dot = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
});