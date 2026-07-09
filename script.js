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

  updateDrawCursorGlow();
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

// ============================================================
// DRAWING MODE
// ============================================================
const DRAW_STORAGE_KEY = "portfolio-drawings";

const drawingState = {
  enabled: false,
  drawing: false,
  tool: "draw",
  strokes: [],
  currentStroke: null,
  pointerId: null,
};

let drawingCanvas;
let drawingContext;
let drawToggleButton;
let drawingToolbar;
let drawRedSlider;
let drawGreenSlider;
let drawBlueSlider;
let drawHexInput;
let drawingEraserToggle;
let drawingPreview;
let drawToggleClickTimer;
let drawingEraserClickTimer;
let drawCursorGlow;
let drawCursorGlowFrame;
let drawCursorGlowPoint = null;

function getThemeAccentRgb(theme) {
  return theme === "dark"
    ? { red: 239, green: 68, blue: 68 }
    : { red: 79, green: 70, blue: 229 };
}

function getCurrentDrawColor() {
  return {
    red: Number(drawRedSlider?.value ?? 79),
    green: Number(drawGreenSlider?.value ?? 70),
    blue: Number(drawBlueSlider?.value ?? 229),
  };
}

function colorToCss(color) {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

function blendColors(color, target, amount) {
  return {
    red: Math.round(color.red + (target.red - color.red) * amount),
    green: Math.round(color.green + (target.green - color.green) * amount),
    blue: Math.round(color.blue + (target.blue - color.blue) * amount),
  };
}

function rgbToHex(color) {
  return `#${[color.red, color.green, color.blue]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
}

function hexToRgb(hexValue) {
  const normalizedHex = hexValue.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalizedHex)) {
    return null;
  }

  return {
    red: Number.parseInt(normalizedHex.slice(0, 2), 16),
    green: Number.parseInt(normalizedHex.slice(2, 4), 16),
    blue: Number.parseInt(normalizedHex.slice(4, 6), 16),
  };
}

function setColorInputs(color) {
  if (drawRedSlider) drawRedSlider.value = String(color.red);
  if (drawGreenSlider) drawGreenSlider.value = String(color.green);
  if (drawBlueSlider) drawBlueSlider.value = String(color.blue);
  if (drawHexInput) drawHexInput.value = rgbToHex(color);

  updateDrawingPreview();
  updateDrawCursorGlow();
}

function updateDrawingPreview() {
  if (!drawingPreview) return;
  drawingPreview.style.background = colorToCss(getCurrentDrawColor());
}

function updateDrawCursorGlow() {
  if (!drawCursorGlow) return;

  const currentColor = getCurrentDrawColor();
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const cursorColor = theme === "light" ? blendColors(currentColor, { red: 0, green: 0, blue: 0 }, 0.35) : currentColor;
  const ringColor = theme === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.45)";
  const coreColor = theme === "light" ? "rgba(0, 0, 0, 0.72)" : "rgba(255, 255, 255, 0.7)";
  const coreSoftColor = theme === "light" ? "rgba(0, 0, 0, 0.18)" : "rgba(255, 255, 255, 0.1)";

  drawCursorGlow.style.setProperty("--draw-cursor-color", colorToCss(cursorColor));
  drawCursorGlow.style.setProperty("--draw-cursor-ring-color", ringColor);
  drawCursorGlow.style.setProperty("--draw-cursor-core-color", coreColor);
  drawCursorGlow.style.setProperty("--draw-cursor-core-soft-color", coreSoftColor);
}

function syncDrawingSlidersToTheme() {
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const accent = getThemeAccentRgb(theme);

  setColorInputs(accent);
}

function getCanvasSize() {
  const root = document.documentElement;
  const body = document.body;

  return {
    width: Math.max(root.scrollWidth, body.scrollWidth, root.clientWidth),
    height: Math.max(root.scrollHeight, body.scrollHeight, root.clientHeight),
  };
}

function redrawCanvas() {
  if (!drawingContext || !drawingCanvas) return;

  const { width, height } = getCanvasSize();
  const scale = window.devicePixelRatio || 1;

  drawingCanvas.width = Math.round(width * scale);
  drawingCanvas.height = Math.round(height * scale);
  drawingCanvas.style.width = `${width}px`;
  drawingCanvas.style.height = `${height}px`;

  drawingContext.setTransform(scale, 0, 0, scale, 0, 0);
  drawingContext.clearRect(0, 0, width, height);

  drawingState.strokes.forEach((stroke) => {
    if (stroke.points.length === 0) return;

    if (stroke.points.length === 1) {
      drawingContext.beginPath();
      if (stroke.tool === "erase") {
        drawingContext.globalCompositeOperation = "destination-out";
        drawingContext.fillStyle = "rgba(0, 0, 0, 1)";
      } else {
        drawingContext.globalCompositeOperation = "source-over";
        drawingContext.fillStyle = colorToCss(stroke.color);
      }
      drawingContext.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
      drawingContext.fill();
      drawingContext.globalCompositeOperation = "source-over";
      return;
    }

    drawingContext.beginPath();
    drawingContext.lineCap = "round";
    drawingContext.lineJoin = "round";
    if (stroke.tool === "erase") {
      drawingContext.globalCompositeOperation = "destination-out";
      drawingContext.strokeStyle = "rgba(0, 0, 0, 1)";
    } else {
      drawingContext.globalCompositeOperation = "source-over";
      drawingContext.strokeStyle = colorToCss(stroke.color);
    }
    drawingContext.lineWidth = stroke.width;
    drawingContext.moveTo(stroke.points[0].x, stroke.points[0].y);

    stroke.points.forEach((point) => {
      drawingContext.lineTo(point.x, point.y);
    });

    drawingContext.stroke();
    drawingContext.globalCompositeOperation = "source-over";
  });
}

function saveDrawings() {
  localStorage.setItem(DRAW_STORAGE_KEY, JSON.stringify(drawingState.strokes));
}

function loadDrawings() {
  const savedDrawings = localStorage.getItem(DRAW_STORAGE_KEY);
  if (!savedDrawings) return;

  try {
    const parsedDrawings = JSON.parse(savedDrawings);
    if (Array.isArray(parsedDrawings)) {
      drawingState.strokes = parsedDrawings;
    }
  } catch {
    drawingState.strokes = [];
  }
}

function getPagePoint(event) {
  return {
    x: event.clientX + window.scrollX,
    y: event.clientY + window.scrollY,
  };
}

function drawStrokeSegment(stroke, fromPoint, toPoint) {
  if (!drawingContext) return;

  drawingContext.beginPath();
  drawingContext.lineCap = "round";
  drawingContext.lineJoin = "round";
  if (stroke.tool === "erase") {
    drawingContext.globalCompositeOperation = "destination-out";
    drawingContext.strokeStyle = "rgba(0, 0, 0, 1)";
  } else {
    drawingContext.globalCompositeOperation = "source-over";
    drawingContext.strokeStyle = colorToCss(stroke.color);
  }
  drawingContext.lineWidth = stroke.width;
  drawingContext.moveTo(fromPoint.x, fromPoint.y);
  drawingContext.lineTo(toPoint.x, toPoint.y);
  drawingContext.stroke();
  drawingContext.globalCompositeOperation = "source-over";
}

function clearDrawings() {
  drawingState.strokes = [];
  drawingState.currentStroke = null;
  drawingState.drawing = false;
  drawingState.pointerId = null;
  localStorage.removeItem(DRAW_STORAGE_KEY);
  redrawCanvas();
}

function startStroke(event) {
  if (!drawingState.enabled) return;

  drawingState.drawing = true;
  drawingState.pointerId = event.pointerId;
  const point = getPagePoint(event);
  drawingState.currentStroke = {
    tool: drawingState.tool,
    color: getCurrentDrawColor(),
    width: drawingState.tool === "erase" ? 22 : 4,
    points: [point],
  };
  drawingState.strokes.push(drawingState.currentStroke);

  if (drawingCanvas?.setPointerCapture) {
    drawingCanvas.setPointerCapture(event.pointerId);
  }
}

function continueStroke(event) {
  if (!drawingState.enabled || !drawingState.drawing || !drawingState.currentStroke) return;

  const nextPoint = getPagePoint(event);
  const stroke = drawingState.currentStroke;
  const previousPoint = stroke.points[stroke.points.length - 1];

  stroke.points.push(nextPoint);
  drawStrokeSegment(stroke, previousPoint, nextPoint);
}

function endStroke() {
  if (!drawingState.drawing) return;

  if (drawingCanvas?.releasePointerCapture && drawingState.pointerId !== null) {
    try {
      drawingCanvas.releasePointerCapture(drawingState.pointerId);
    } catch {
      // Ignore capture release issues if the pointer already ended.
    }
  }

  drawingState.drawing = false;
  drawingState.currentStroke = null;
  drawingState.pointerId = null;
  saveDrawings();
}

function toggleDrawingMode() {
  drawingState.enabled = !drawingState.enabled;

  if (drawToggleButton) {
    drawToggleButton.setAttribute("aria-pressed", String(drawingState.enabled));
  }

  if (drawingToolbar) {
    drawingToolbar.setAttribute("aria-hidden", String(!drawingState.enabled));
  }

  if (drawingCanvas) {
    drawingCanvas.dataset.drawColor = drawingState.enabled ? "true" : "";
  }

  if (drawCursorGlow) {
    drawCursorGlow.hidden = !drawingState.enabled;
  }

  document.body.classList.toggle("drawing-active", drawingState.enabled);

  if (!drawingState.enabled) {
    document.body.classList.remove("drawing-erase-mode");
    drawingState.tool = "draw";
    if (drawingEraserToggle) {
      drawingEraserToggle.setAttribute("aria-pressed", "false");
    }
  }

  if (drawingState.enabled) {
    syncDrawingSlidersToTheme();
    drawingState.tool = "draw";
    if (drawingEraserToggle) {
      drawingEraserToggle.setAttribute("aria-pressed", "false");
    }
    document.body.classList.remove("drawing-erase-mode");
    redrawCanvas();
  } else {
    endStroke();
  }
}

function toggleEraserMode() {
  if (!drawingState.enabled) return;

  drawingState.tool = drawingState.tool === "erase" ? "draw" : "erase";
  document.body.classList.toggle("drawing-erase-mode", drawingState.tool === "erase");

  if (drawingEraserToggle) {
    drawingEraserToggle.setAttribute("aria-pressed", String(drawingState.tool === "erase"));
  }
}

function updateCursorGlowPosition(event) {
  if (!drawCursorGlow || !drawingState.enabled) return;

  drawCursorGlowPoint = {
    x: event.clientX,
    y: event.clientY,
  };

  if (drawCursorGlowFrame) return;

  drawCursorGlowFrame = window.requestAnimationFrame(() => {
    drawCursorGlowFrame = null;

    if (!drawCursorGlow || !drawCursorGlowPoint || !drawingState.enabled) return;

    drawCursorGlow.style.left = `${drawCursorGlowPoint.x}px`;
    drawCursorGlow.style.top = `${drawCursorGlowPoint.y}px`;
  });
}

function initializeDrawingMode() {
  drawingCanvas = document.getElementById("drawing-canvas");
  if (!drawingCanvas) return;

  drawingContext = drawingCanvas.getContext("2d");
  drawToggleButton = document.getElementById("draw-toggle");
  drawingToolbar = document.getElementById("drawing-toolbar");
  drawRedSlider = document.getElementById("draw-red");
  drawGreenSlider = document.getElementById("draw-green");
  drawBlueSlider = document.getElementById("draw-blue");
  drawHexInput = document.getElementById("draw-hex");
  drawingEraserToggle = document.getElementById("drawing-eraser-toggle");
  drawingPreview = document.getElementById("drawing-preview");
  drawCursorGlow = document.createElement("div");
  drawCursorGlow.className = "draw-cursor-glow";
  drawCursorGlow.hidden = true;
  document.body.appendChild(drawCursorGlow);

  if (drawingToolbar) {
    drawingToolbar.setAttribute("aria-hidden", "true");
  }

  loadDrawings();
  redrawCanvas();

  [drawRedSlider, drawGreenSlider, drawBlueSlider].forEach((slider) => {
    slider?.addEventListener("input", () => {
      const color = getCurrentDrawColor();
      if (drawHexInput) drawHexInput.value = rgbToHex(color);
      updateDrawingPreview();
      updateDrawCursorGlow();
    });
  });

  drawHexInput?.addEventListener("input", () => {
    const parsedColor = hexToRgb(drawHexInput.value);
    if (!parsedColor) return;
    setColorInputs(parsedColor);
  });

  drawingEraserToggle?.addEventListener("click", () => {
    if (!drawingState.enabled) return;

    if (drawingEraserClickTimer) {
      clearTimeout(drawingEraserClickTimer);
      drawingEraserClickTimer = null;
      clearDrawings();
      return;
    }

    drawingEraserClickTimer = window.setTimeout(() => {
      toggleEraserMode();
      drawingEraserClickTimer = null;
    }, 220);
  });

  drawingEraserToggle?.addEventListener("dblclick", (event) => {
    event.preventDefault();
    if (!drawingState.enabled) return;

    if (drawingEraserClickTimer) {
      clearTimeout(drawingEraserClickTimer);
      drawingEraserClickTimer = null;
    }

    clearDrawings();
  });

  drawToggleButton?.addEventListener("click", (event) => {
    event.preventDefault();

    if (drawToggleClickTimer) {
      clearTimeout(drawToggleClickTimer);
      drawToggleClickTimer = null;

      if (drawingState.enabled) {
        clearDrawings();
      }

      return;
    }

    drawToggleClickTimer = window.setTimeout(() => {
      toggleDrawingMode();
      drawToggleClickTimer = null;
    }, 200);
  });

  drawingCanvas.addEventListener("pointerdown", (event) => {
    if (!drawingState.enabled) return;
    startStroke(event);
    updateCursorGlowPosition(event);
  });

  drawingCanvas.addEventListener("pointermove", (event) => {
    updateCursorGlowPosition(event);
    continueStroke(event);
  });

  drawingCanvas.addEventListener("pointerup", endStroke);
  drawingCanvas.addEventListener("pointercancel", endStroke);
  drawingCanvas.addEventListener("pointerleave", endStroke);

  const resizeAndRedraw = () => {
    redrawCanvas();
  };

  window.addEventListener("resize", resizeAndRedraw);
  window.addEventListener("load", resizeAndRedraw);
  window.addEventListener("pointermove", updateCursorGlowPosition, { passive: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(resizeAndRedraw).catch(() => {});
  }
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
  initializeDrawingMode();

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleDarkMode);
  }
});
