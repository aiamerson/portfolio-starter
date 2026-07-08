# Prompt Journal

Log your Copilot prompts here as you work. This is your record of the prompting process — not just what worked, but what didn't, and how you iterated.

**There are no wrong answers here.** The goal is to practice prompt writing and reflect on it honestly.

---

## How to fill this in

For each entry, note:
- **Where** you used Copilot (inline chat, Ask mode, Edit mode, Agent mode, inline completion)
- **What you asked** (copy/paste the prompt if you can)
- **What you got** (brief summary — did it work? was it close? way off?)
- **What you changed** (did you refine the prompt? edit the output manually?)

---

## Phase 1 — Setup & Orientation

### Entry 1
- **Feature/task:** Create the prompt journal and record this request
- **Copilot feature used:** Chat / agent-assisted editing
- **Prompt:**
  > Hey copilot! First off I would like you to log the prompts I submit to you, the result tou give, and the reflections, including this one, into "prompt-journal.md".
- **Result:** I used the existing journal template and filled in the first entry so it can track prompts, results, and reflections from the start.
- **What I changed or did next:** I kept the structure in place and started the log with this request so future entries can be added in the same format.

---

## Phase 2 — Guided Tasks

### Entry 2 — About section
- **Copilot feature used:** Chat
- **Prompt:**
  > Write a short professional bio for a CS student interested in an open source job. Keep it warm and professional. Also add my University as Norfolk State University, my interest as "art, music, technology, and anime/manga", and my hobbies as "painting, going on walks, reading manga, nad playing video games". Also remember to keep the prompt journal updated
- **Result:** I turned the placeholder About text into a short bio tailored to a CS student aiming for an open source role.
- **What I changed or did next:** I added a more specific career goal and kept the tone warm, then logged this prompt so the journal stays current.

---

### Entry 3 — Projects
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you help me change the highlight color of the header at the top of the webpage in to red and have it with a back outline
- **Result:** I updated the hero highlight text so it shows as red with a black outline.
- **What I changed or did next:** I changed the `.highlight` CSS rule instead of editing the HTML, which keeps the style reusable and easy to adjust later.

---

### Entry 4 — Dark mode
- **Copilot feature used:** Chat
- **Prompt:**
  > Add the changes so I can see how your way looks please
- **Result:** I swapped the avatar placeholder for an actual image slot and styled it like a framed profile photo.
- **What I changed or did next:** I updated the About section markup and added a reusable `.avatar-image` style so the photo will display cleanly once the file is in the project.

---

### Entry 5 — Responsive layout
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you add a dark mode toggle button that looks like a switch here?
- **Result:** I added a switch-style dark mode toggle in the navigation bar and connected it to theme settings.
- **What I changed or did next:** I updated the HTML, CSS, and JavaScript together so the toggle works and remembers the selected mode.

---

## Phase 3 — Independent Feature

**Feature I chose:** 

### Entry 6
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you add the sun and moon on the switch, and make the blue accent color red when dark mode is on, but keep it blue when dark mode is off?
- **Result:** I added sun and moon symbols to the toggle and changed the dark-mode accent color to red while leaving light mode blue.
- **What I changed or did next:** I updated the switch styling in CSS so the icons and theme colors change visually without needing more HTML.

### Entry 7
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you also change the highlight to a deeper red when in dark mode?
- **Result:** I added a dark-mode-only highlight override so the hero text becomes a deeper red while light mode stays the same.
- **What I changed or did next:** I kept the highlight style global and layered the darker red on top only when the dark theme is active.

### Entry 8 — A prompt that didn't work well
- **Copilot feature used:** Chat
- **What I asked:**
  > Can you center all the text and the buttons in the get in touch section. Also remove the text from the buttons and replace them with a graphic of an envelope for email, and the logos for github and linkedin for their respective buttons? Also can you make sure that they stay on color theme and switch color with the light and dark mode? While you're at it can you make the buttons circular instead of rectangular?
- **What went wrong:** 
- **How I fixed it (revised prompt or manual edit):** I replaced the text buttons with icon-only circular links, centered the section, and let the icons inherit the theme accent color so they switch with light and dark mode.

---

## Reflection

**1. What feature are you most proud of?**

The prompt journal itself, because it turns the Copilot workflow into something I can review and improve instead of treating each prompt like a one-off.

---

**2. Describe a time Copilot gave you something wrong or unhelpful. What did you do?**

*(Be specific — this is one of the most valuable things to reflect on.)*

---

**3. What did you learn about writing better prompts?**

*(What made a prompt work well? What made one fail?)*

---

**4. What's one part of the codebase you now understand better than at the start?**

---

**5. What would you build or improve next?**
