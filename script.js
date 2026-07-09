// ============================================================
// PROJECTS DATA
// TODO: Replace these with your real projects!
// Each project needs: title, description, tags, and optional links.
// Ask Copilot: "Add a project card for a [project type] called [name]"
// ============================================================
const projects = [
  {
    title: "The Guardian",
    description: "An AI weapon detection project that identifies guns and knives in photos and draws bounding boxes around each detected item.",
    tags: ["AI Detection", "Computer Vision", "Security"],
  },
  {
    title: "Spartan AUX",
    description: "A virtual music party where guests join a host, vote on songs from a chosen genre, and keep the next vote ready so the music keeps playing without a gap.",
    tags: ["Voting", "Music Party", "Real-time"],
  },
];

// ============================================================
// SKILLS DATA
// TODO: Replace with your actual skills.
// Ask Copilot to help format this list based on your resume.
// ============================================================
const skills = [
  { name: "Python", rating: 5 },
  { name: "C++", rating: 5 },
  { name: "JavaScript", rating: 4 },
  { name: "Java", rating: 4 },
  { name: "Git & GitHub", rating: 4 },
  { name: "SQL", rating: 4 },
  { name: "HTML & CSS", rating: 3 },
  { name: "Node.js", rating: 3 },
  { name: "Linux", rating: 3 },
];

// ============================================================
// RENDER PROJECTS
// ============================================================
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          ${project.github ? `<a href="${project.github}" target="_blank">GitHub →</a>` : ""}
          ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo →</a>` : ""}
        </div>
      </div>
    `
    )
    .join("");
}

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills() {
  const container = document.getElementById("skills-container");
  const ratingPanel = document.getElementById("skills-rating");
  if (!container) return;

  const sortedSkills = [...skills].sort((firstSkill, secondSkill) => {
    if (secondSkill.rating !== firstSkill.rating) {
      return secondSkill.rating - firstSkill.rating;
    }

    return firstSkill.name.localeCompare(secondSkill.name);
  });

  container.innerHTML = sortedSkills
    .map(
      (skill) => `
        <button class="skill-badge" type="button" data-skill-name="${skill.name}" data-skill-rating="${skill.rating}" aria-label="${skill.name} skill rating ${skill.rating} out of 5 stars">
          ${skill.name}
        </button>
      `
    )
    .join("");

  if (!ratingPanel) return;

  const ratingName = ratingPanel.querySelector(".skills-rating-name");
  const ratingStars = ratingPanel.querySelector(".skills-rating-stars");

  const resetRating = () => {
    if (ratingName) {
      ratingName.textContent = "Hover a skill";
    }

    if (ratingStars) {
      ratingStars.textContent = "☆☆☆☆☆";
    }
  };

  sortedSkills.forEach((skill, index) => {
    const skillButton = container.querySelectorAll(".skill-badge")[index];
    if (!skillButton) return;

    const showRating = () => {
      if (ratingName) {
        ratingName.textContent = skill.name;
      }

      if (ratingStars) {
        ratingStars.textContent = "★★★★★".slice(0, skill.rating) + "☆☆☆☆☆".slice(skill.rating);
      }
    };

    skillButton.addEventListener("mouseenter", showRating);
    skillButton.addEventListener("focus", showRating);
    skillButton.addEventListener("mouseleave", resetRating);
    skillButton.addEventListener("blur", resetRating);
  });

  resetRating();
}

// ============================================================
// DARK MODE TOGGLE
const THEME_STORAGE_KEY = "portfolio-theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    const isDark = theme === "dark";
    toggleButton.setAttribute("aria-pressed", String(isDark));

    const toggleLabel = toggleButton.querySelector(".theme-toggle-label");
    if (toggleLabel) {
      toggleLabel.textContent = isDark ? "Dark mode on" : "Dark mode";
    }
  }
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
function updateYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  updateYear();

  applyTheme(getPreferredTheme());

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleDarkMode);
  }
});
