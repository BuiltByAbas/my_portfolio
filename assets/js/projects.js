const filterButtons = document.querySelectorAll(
    ".filter-projects button"
);

const projectCards = document.querySelectorAll(
    ".project-card"
);

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.textContent.trim();

        // Update active button state
        filterButtons.forEach((btn) => {
            btn.setAttribute("aria-pressed", String(btn === button));
        });

        // Filter the project cards
        projectCards.forEach((card) => {
            const category = card.dataset.category;

            const showProject =
                filter === "All Projects" ||
                (filter === "Coursework" && category === "coursework") ||
                (filter === "Personal Projects" && category === "personal");

            card.hidden = !showProject;
        });
    });
});