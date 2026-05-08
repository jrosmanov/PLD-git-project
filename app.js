document.addEventListener("DOMContentLoaded", () => {
    const teamContainer = document.getElementById("team-container");

    // Dynamically load team members from data.js
    if (typeof teamData !== 'undefined' && teamContainer) {
        teamData.forEach(member => {
            const card = document.createElement("div");
            card.className = "team-card";

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p class="bio">${member.bio}</p>
            `;

            teamContainer.appendChild(card);
        });
    } else {
        console.error("Team data not found or container missing.");
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handler (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thank you for your message! VIBECODE team will get back to you soon.");
            contactForm.reset();
        });
    }
});