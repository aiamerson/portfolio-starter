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

### Entry 9
- **Copilot feature used:** Chat
- **Prompt:**
  > can you move the text next to the dark mode switch fom the right of the button, to the left of the button so that the button doesn't move when you switch mades?
- **Result:** I moved the text label to the left side of the switch and fixed its width so the toggle stays in place.
- **What I changed or did next:** I reordered the toggle markup and gave the label a fixed width instead of letting the text length change the button size.

### Entry 10
- **Copilot feature used:** Chat
- **Prompt:**
  > can yiu move the sun and moon symbol onto the circle of the switch and it just switched with the mode?
- **Result:** I moved the moon and sun symbol onto the switch thumb so the icon changes with the theme.
- **What I changed or did next:** I used the toggle state in CSS to swap the thumb icon instead of keeping the symbols on the track.

### Entry 11
- **Copilot feature used:** Chat
- **Prompt:**
  > Improve the responsive styles in this CSS file for screens under 600px. The nav links should stack or hide, the hero text should be smaller, and the projects grid should be single-column.
- **Result:** I added a 600px breakpoint that stacks the nav links, reduces the hero text size, and turns the projects grid into a single column.
- **What I changed or did next:** I kept the responsive work scoped to a smaller-screen media query so the tablet layout stays intact.

### Entry 12
- **Copilot feature used:** Chat
- **Prompt:**
  > I added a luffy_animation gif to my images folder, would you be able to add this as my hero image? Also if you can, could you have the original gif for dark made, and for the light mode you inver its colors?
- **Result:** I set the GIF as the hero background and made it invert in light mode while staying original in dark mode.
- **What I changed or did next:** I added layered hero pseudo-elements for the animated image and contrast overlay so the text remains readable.

### Entry 13
- **Copilot feature used:** Chat
- **Prompt:**
  > The "portfolio" text in light mode blends in with the background, so could you add a white outline to the word?
- **Result:** I added a white outline specifically to the Portfolio word in the hero title for light mode.
- **What I changed or did next:** I wrapped the word in a dedicated span so the outline can be controlled independently without affecting the highlighted name text.

### Entry 14
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you also make a black outline for portfolio in dark mode?
- **Result:** I added a black outline for the Portfolio word in dark mode.
- **What I changed or did next:** I replaced the dark-mode reset with a dedicated black stroke and shadow outline so the word remains readable in both themes.

### Entry 15
- **Copilot feature used:** Chat
- **Prompt:**
  > Would you be able to add my project experience? One is called "The Guardian" that is an AI weapon detection that can detect guns and knives and put a box around each in the photo. Another one is called "Spartan AUX" and it is a virtual music party, where people join a host and they can vote on a song in a genere the host picks. in the middle of the song another vote starts so that it can immediately play after the first is up. I don't have the links to any of them so you can remove the placeholders?
- **Result:** I replaced the placeholder project cards with your real project experience and removed the fake links.
- **What I changed or did next:** I updated the project data in the JavaScript file so the rendered cards now match your actual projects without showing placeholder URLs.

### Entry 16
- **Copilot feature used:** Chat
- **Prompt:**
  > I removed the third project chart could you center the remaining two?
- **Result:** I centered the two remaining project cards in the grid.
- **What I changed or did next:** I changed the projects array to only include your two real projects and updated the grid columns so they sit centered side by side on larger screens.

### Entry 17
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you add lines between sections where the background changes, red in dark made and blue in light mode?
- **Result:** I added theme-colored divider lines between the sections and footer.
- **What I changed or did next:** I used the accent color variable so the separators automatically stay blue in light mode and red in dark mode.

### Entry 18
- **Copilot feature used:** Chat
- **Prompt:**
  > For my skills, can you change C to C++, delete react, and when you hover over each skill, show a 5 star rating that shows up to the right of the line under the Skills header. Give C++ and Python 5 stars, put 4 stars for both javas and git and sql, and 3 stars for the rest of the skills. can you also sort them by descending star rating from left to right?
- **Result:** I replaced C with C++, removed React, sorted the skills by rating, and added a hover-driven star display beside the Skills heading.
- **What I changed or did next:** I turned the skills list into rated objects, sorted them before rendering, and wired hover and focus states to update the rating panel.

### Entry 19
- **Copilot feature used:** Chat
- **Prompt:**
  > Can you write up a few sentences to add to the "I am currently looking for programming job opportunities" paragraph explaining how I am modivated to work with programming, and that I am quick to learn, thorough.
- **Result:** I expanded the paragraph to explain your motivation for programming and highlight that you learn quickly and work thoroughly.
- **What I changed or did next:** I kept the tone professional and added the new sentences directly into the About section so it reads smoothly with the rest of the bio.

### Entry 20
- **Copilot feature used:** Chat
- **Prompt:**
  > I changed my hero subtitle. Could you make it all on one line and make the font a bit thicker, with the same color and outline as "portfolio" in both modes?
- **Result:** I made the hero subtitle stay on one line, increased its weight, and matched its outline styling to the Portfolio word across both themes.
- **What I changed or did next:** I added a dedicated subtitle class so the line stays unwrapped and shares the same light/dark outline treatment as the hero title.

### Entry 21
- **Copilot feature used:** Chat
- **Prompt:**
  > Thank you but also please center the hero subtitle as well?
- **Result:** I centered the hero subtitle while keeping it on one line and preserving the outline styling.
- **What I changed or did next:** I set the subtitle to full width with centered text so it stays aligned in the middle of the hero area.

### Entry 22
- **Copilot feature used:** Chat
- **Prompt:**
  > For a special feature, could you add a pencil icon next to the dark mode that allows the user to draw on the page, with color sliders once drawing mode is activated, and the drawings moving on the page as you scroll. you can turn the mode off by clicking the pencil again. The drawings wouls be user side and doesn't affect other users viewings.
- **Result:** I added a local-only drawing mode with a pencil toggle, RGB sliders, and a full-page canvas that scrolls with the page.
- **What I changed or did next:** I wired the drawing feature into the existing navbar and saved strokes in the browser so the sketches stay user-side only.

### Entry 23
- **Copilot feature used:** Chat
- **Prompt:**
  > can you add a box where it shows the current hexacolor and allow the user to type in a hexacolor use? Can you also add an eraser toggle for the cursor, and if you double tap the button it deletes all drawings on the page? Can you also only show the sliders and added features when draw mode is activated?
- **Result:** I added a typed hex color field, an eraser toggle, and double-click clear behavior while keeping the toolbar hidden until draw mode is enabled.
- **What I changed or did next:** I extended the drawing toolbar with the new controls and switched the canvas to support erasing and clearing without affecting other users.

### Entry 24
- **Copilot feature used:** Chat
- **Prompt:**
  > The toolbar is still always visible, so could you put the components under an element called "drawing-toolbar" that's opacity it turned on when draw mode is active? also could you switch the full screen to a double tap on the eraser icon instead of the pencil. Could you also replace the text with an eraser image?
- **Result:** I made the toolbar fade in only while draw mode is active, swapped the eraser label for an icon, and moved clear-all to the eraser double-tap.
- **What I changed or did next:** I tied the toolbar visibility to draw mode state and updated the eraser button behavior so the pencil only toggles drawing mode.

### Entry 25
- **Copilot feature used:** Chat
- **Prompt:**
  > Are you able to add a slight glow to the cursor when you are in draw mode? Have the glow be the same color as the selected drawing color.
- **Result:** I added a subtle cursor glow that follows the pointer in draw mode and matches the selected drawing color.
- **What I changed or did next:** I created a floating glow element and updated it whenever the selected color changes so the cursor effect stays in sync with the tool settings.

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
