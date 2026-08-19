# PORTFOLIO MOTION — MASTER SPECIFICATION
# FIRMAN BINTANG NARENDRA

> THIS FILE IS THE SINGLE SOURCE OF TRUTH FOR THIS PROJECT.
>
> AI CODING AGENTS MUST READ AND FOLLOW THIS FILE BEFORE
> IMPLEMENTING OR MODIFYING THE PROJECT.
>
> DO NOT REINTERPRET, SIMPLIFY, REMOVE, OR REDESIGN CORE
> REQUIREMENTS WITHOUT EXPLICIT APPROVAL FROM THE PROJECT OWNER.

---

# 01 — PROJECT IDENTITY

## Owner

Firman Bintang Narendra

## Main Roles

- Front-End Developer
- UI/UX Designer
- Motion Designer
- Creative Developer

## Main Focus

The portfolio focuses primarily on:

- Front-End Development
- UI/UX Design
- Motion Design
- Interactive Web
- 3D Web Experience
- Creative Technology

However, the identity should not be limited only to web development.

The portfolio must communicate that the creator is capable of combining:

```text
DESIGN
+
CODE
+
MOTION
+
3D
+
INTERACTION

02 — CORE CONCEPT

This is NOT a conventional portfolio.

The website itself must function as a demonstration of the creator's ability.

The user should feel as if they are entering an interactive creative world.

The portfolio must feel:

immersive
premium
playful
modern
clean
colorful
interactive
motion-driven
3D-driven

The experience should feel like:

ENTER
↓
DISCOVER
↓
INTERACT
↓
EXPLORE
↓
CREATE
↓
CONNECT
03 — MAIN CREATIVE PRINCIPLE

MOTION SHOULD EXPLAIN THE EXPERIENCE,
NOT SIMPLY DECORATE THE PAGE.

Animations must have purpose.

For example:

About visually transitions toward Skills.
Skills visually transitions into Tools.
Tools represents the creative tools used to produce work.
Projects represent the result of those skills and tools.
Contact represents the final interaction with the creator.

The website must feel like one continuous story.

04 — SECONDARY CREATIVE PRINCIPLE

EVERY SECTION SHOULD FEEL LIKE A NEW WORLD,
BUT EVERY WORLD MUST BELONG TO THE SAME UNIVERSE.

Each section can have a different visual composition.

However:

colors must remain related
typography must remain consistent
motion language must remain connected
3D quality must remain consistent
spacing must remain intentional

The page must NOT feel like several unrelated websites
placed one after another.

05 — VISUAL DIRECTION
Primary Theme

LIGHT THEME.

The visual direction should be:

clean
soft
colorful
modern
premium
creative
experimental
3D-focused

The website must NOT feel:

boring
corporate
generic
sterile
template-like
overly minimalist
like a normal dashboard
like a standard developer portfolio
06 — COLOR SYSTEM
Primary Color

CANDY BLUE / SOFT BLUE

The primary blue should feel:

soft
friendly
modern
slightly playful
premium
Secondary Colors

Use controlled secondary colors such as:

soft cyan
lavender
soft purple
peach
warm pastel accents
Neutral Colors

Use:

white
off-white
very light gray
dark navy
near-black

The candy blue identity must remain dominant.

Do not introduce random colors.

07 — TYPOGRAPHY

Typography is an important visual element.

The typography system must prioritize:

hierarchy
readability
whitespace
rhythm
alignment
visual balance

Possible font directions:

Manrope
Inter
Plus Jakarta Sans
Satoshi

Only use a small number of font families.

Prefer:

1 primary font
+
optional secondary font

Do NOT use excessive fonts.

08 — TYPOGRAPHY SPACING RULE

This rule is extremely important.

DO NOT ALLOW TEXT TO RANDOMLY OVERLAP.

The design must make intentional use of empty space.

Use:

large negative space
asymmetric layouts
visual hierarchy
clear grouping
intentional alignment

3D objects may overlap other 3D objects.

Typography must remain readable.

Do NOT sacrifice readability simply to make the design look "busy".

09 — 3D IS A CORE FEATURE

The website must use real 3D.

Preferred technology:

Three.js
React Three Fiber
Drei

3D must NOT feel like:

random cubes
random spheres
basic rotating objects
generic blobs
simple primitive demonstrations

The 3D should be designed specifically for the portfolio.

Objects should have:

purpose
depth
lighting
material
movement
interaction
spatial relationship
visual storytelling
10 — TECHNOLOGY STACK

Primary stack:

Next.js
React
TypeScript
Tailwind CSS


Three.js
React Three Fiber
Drei


GSAP
ScrollTrigger
Lenis

Preferred animation architecture:

Lenis
↓
GSAP ticker
↓
ScrollTrigger
↓
Section animation
↓
3D interaction

Do NOT introduce another animation framework without explicit approval.

11 — MAIN PAGE STRUCTURE

The section order is FIXED.

Hero
│
│ scroll
▼
About
│
│ scroll
▼
Skills
│
│
▼
Tools
│
│
▼
Projects
│
▼
Contact
│
▼
Footer

The order must NOT be changed.

12 — CRITICAL SCROLL ARCHITECTURE

The intended experience is:

Hero
│
│ scroll
▼
About rises and visually covers Hero
│
│ scroll
▼
About stops / becomes stable
│
│ scroll
▼
Skills enters from the RIGHT
│
│ scroll
▼
Skills continues into Tools
│
│
│
│ HORIZONTAL WORLD
│
│
Skills ─────────────────────────→ Tools
                                      │
                                      │
                                      │ horizontal journey finishes
                                      ▼
                                  Projects
                                      ↓
                                   Contact
                                      ↓
                                    Footer

THIS IS ONE OF THE MOST IMPORTANT REQUIREMENTS.

13 — HERO → ABOUT

When the user scrolls from Hero:

Hero
↓
About

About must visually rise and cover the Hero.

Hero must NOT:

suddenly disappear
turn black
move upward unexpectedly
leave a blank area
break the scroll height

The transition must feel intentional.

14 — ABOUT BEHAVIOR

After About enters:

About
↓
stabilizes
↓
remains visually present
↓
Skills approaches

About should feel like a temporary world
that has taken over the Hero.

15 — ABOUT → SKILLS

Skills must enter from the RIGHT.

The intended visual behavior:

ABOUT
████████████████


        SKILLS
              →
              →
              →

Skills must NOT simply appear below About.

It must feel like a new visual scene
entering horizontally.

16 — SKILLS → TOOLS

This is CRITICAL.

Skills and Tools are part of ONE HORIZONTAL WORLD.

The user should experience:

Skills → Tools

NOT:

Skills
↓
Tools

And absolutely NOT:

Skills
↓
black screen
↓
Tools

And NOT:

Skills
↓
Tools appears below

The horizontal sequence must remain continuous.

17 — HORIZONTAL WORLD RULE

During the Skills → Tools sequence:

NORMAL VERTICAL SCROLLING MUST NOT RESUME PREMATURELY.

The user must remain inside the horizontal experience
until the Tools sequence has completed.

Only after Tools finishes:

horizontal world ends
↓
vertical scrolling resumes
↓
Projects
18 — PROJECTS ENTRY

After Tools completes:

Tools
↓
horizontal journey ends
↓
Projects

Projects must enter naturally.

There must NOT be:

black gap
sudden jump
unexpected vertical displacement
missing section
duplicated section
teleporting content
19 — BIDIRECTIONAL SCROLL

THIS IS REQUIRED.

Animations must work when:

scroll DOWN

AND:

scroll UP
20 — SECTION ANIMATION LIFECYCLE

Every major section should behave like:

ENTER
↓
ACTIVE
↓
EXIT

When scrolling down:

ENTER
→
ACTIVE
→
EXIT

When scrolling up:

ENTER
→
ACTIVE
→
EXIT

The animation must NOT only work once.

21 — RE-ENTRY RULE

When the user leaves a section:

section exits

When the user returns:

section enters again

The section should feel like entering the page/world again.

Do not leave it in a broken state.

Do not leave it invisible.

Do not leave it half animated.

Do not create:

return
↓
blank
↓
wait
↓
suddenly appear
22 — HERO

Hero is the first major visual experience.

It must contain:

3D environment
strong typography
creative objects
motion
depth
ambient animation
23 — HERO LOADING EXPERIENCE

When entering the website:

A loading experience should appear.

Do NOT use a boring generic spinner
as the main visual.

The loading experience can contain:

3D object
progress
percentage
geometry
typography
construction animation
motion

Example:

LOADING EXPERIENCE
        ↓
3D OBJECT FORMS
        ↓
SCENE BUILDS
        ↓
HERO REVEALS
24 — HERO 3D OBJECTS

The Hero may contain objects representing:

programming
design
UI
creative tools
motion
technology

Objects should emerge from below.

Then they spread through the scene.

Different objects should have different entrance choreography.

Possible:

rise
rotate
flip
scale
drift
parallax
depth movement

Do NOT animate every object identically.

25 — HERO TEXT

Typography should enter with animation.

Possible:

fade
slide
mask reveal
stagger
split reveal

But text must have enough space.

3D objects must NOT accidentally cover important text.

26 — HERO IDLE STATE

After the main entrance animation:

The scene must remain alive.

Use subtle:

floating
breathing scale
slight rotation
depth movement
particle movement
parallax

Idle motion must be subtle.

Do not make the page exhausting to watch.

27 — ABOUT SECTION

About is the next visual world.

It should contain:

personal introduction
role
focus
creative philosophy

But the text must remain concise.

Do NOT create a huge biography.

28 — ABOUT 3D LANYARD

The main About visual is a 3D lanyard.

The profile/photo presentation should exist
inside the 3D lanyard.

The lanyard should feel physical.

It may have:

swinging
rotation
depth
lighting
material
subtle cursor interaction

It should feel like an actual object.

29 — ABOUT TEXT

Suggested structure:

ABOUT ME


I'm Firman Bintang Narendra,
a Front-End Developer, UI/UX Designer,
and Motion Creative focused on creating
interactive digital experiences.


I enjoy combining design, code, motion,
and 3D to create interfaces that feel
alive rather than static.

The final wording can be refined later.

The layout is more important than the exact wording.

30 — ABOUT TRANSITION ELEMENT

Add a paper/card-like object.

The object contains a directional arrow.

The visual idea:

ABOUT
  ↓
paper/card
  ↓
arrow
  ↓
next section

The paper should feel as if it is being pulled
toward the next world.

It should connect About to Skills.

Do NOT make it feel like an ordinary button.

31 — SKILLS

Primary skills:

JavaScript
TypeScript
React
Next.js
Tailwind CSS
Laravel
MySQL
GSAP
Anime.js
Framer Motion

These are the primary skills.

32 — SKILLS VISUALIZATION

Do NOT create a generic grid like:

[React]
[Next]
[JS]
[TS]

as the main experience.

Instead create a 3D ecosystem.

Skills can behave like:

objects
nodes
cards
code elements
interfaces
floating structures

Each skill can have a unique visual identity.

33 — SKILL MOTION

Skills should have:

entrance animation
depth
floating
parallax
subtle rotation
interaction

But animation must remain organized.

Do not create visual chaos.

34 — TOOLS

Tools should feel like a larger creative workspace.

Desktop:

Adobe Premiere
Adobe Illustrator
Figma
CorelDRAW
GitHub

Mobile:

Canva
Alight Motion
PixelLab
Infinite Design
35 — TOOLS VISUAL EXPERIENCE

Tools should be more spacious than Skills.

This section should be one of the main motion showcases.

Possible elements:

floating design panels
editing timeline
UI frames
nodes
creative cards
tool objects
3D interfaces
layered panels
depth
parallax

The environment should feel like:

CREATIVE WORKSPACE
36 — TOOLS MOTION

The Tools section should feel alive.

Objects can:

slide
rotate
float
scale
parallax
move in depth
react to cursor

Different objects should have different timing.

Avoid synchronized robotic movement.

37 — PROJECT SECTION

Projects should NOT simply be:

Project Card
Project Card
Project Card

Instead:

First create a featured project.

38 — FEATURED PROJECT

The best/strongest project should appear first.

It exists inside a 3D environment/object.

Possible:

3D frame
floating display
device
glass-like screen
physical card
creative object

The project should feel like a physical artifact.

39 — FEATURED PROJECT HOVER

When cursor moves toward the project image:

cursor
↓
object reacts
↓
slightly scales
↓
depth increases
↓
image becomes more visible
↓
perspective changes

The object must feel alive.

Do NOT make the scale excessive.

40 — PROJECT CTA

Include a button such as:

EXPLORE THE WORK

This leads to the project collection/archive.

41 — PROJECT ARCHIVE

Project archive uses alternating composition:

PROJECT 01
LEFT


PROJECT 02
RIGHT


PROJECT 03
LEFT


PROJECT 04
RIGHT

The layout should use the available whitespace.

Do not compress all projects into a grid.

42 — PROJECT SCROLL LINE

Add a visual line that follows the project journey.

Concept:

●────────────
             \
              ●────────
                       \
                        ●────────

The line progresses as the user scrolls.

It should visually connect the projects.

43 — CONTACT

Contact should be visually strong
but calmer than Hero and Skills.

Suggested:

WHAT WILL WE CREATE NEXT?

or:

LET'S CREATE SOMETHING.

Possible visual:

3D envelope
3D message
paper
floating UI
interactive object

CTA:

LET'S WORK TOGETHER
44 — FOOTER

Footer should be simple.

Possible:

KEEP CREATING.

The Footer should visually reference
the visual language from earlier sections.

This creates closure.

45 — NAVIGATION

The website uses a custom floating navigation trigger.

The logo/trigger consists of three lines.

However:

IT MUST NOT LOOK LIKE A STANDARD HAMBURGER MENU.

The middle line is intentionally offset.

Concept:

────────
   ╲────
────────

The exact geometry can be improved during implementation.

46 — NAVIGATION POSITION

Preferred:

TOP RIGHT

It must be fixed.

The Hero must leave enough space
so the navigation does not collide with important content.

47 — NAVIGATION IDLE

The navigation icon should have a subtle idle animation.

Possible:

micro morph
line movement
breathing
slight offset

It should not distract from the Hero.

48 — NAVIGATION OPEN

When clicked:

signature icon
↓
morph
↓
sidebar opens

Sidebar navigation:

Home
About
Skills
Tools
Projects
Contact

The sidebar should feel like part of the visual identity.

49 — NAVIGATION SCROLL BEHAVIOR

The floating navigation may animate when scrolling.

The Hero can initially have the floating navigation.

When scrolling:

navigation animation
↓
visual state changes
↓
sidebar trigger remains accessible

The exact animation can be refined during implementation.

The navigation trigger must remain easy to access.

50 — BACKGROUND PATTERN

The background should not be completely empty.

Use subtle patterns such as:

tiny dots
thin grid
soft geometric lines
subtle curves
noise

The opacity must remain low.

The pattern must NEVER compete with:

typography
3D
project images
navigation
51 — CURSOR

Desktop may use a custom cursor.

Normal:

○

Interactive:

◉

3D:

✦

Keep it subtle.

Do not use React state for every mouse movement.

Prefer:

refs
GSAP
transforms
requestAnimationFrame where appropriate
52 — RESPONSIVE

Desktop is the primary experience.

Mobile is optional/secondary.

However, the site must remain usable.

Desktop:

full 3D
full animation
horizontal Skills → Tools
full interaction

Mobile:

vertical fallback
adaptive 3D
simplified horizontal behavior

Do NOT force the desktop horizontal architecture
onto mobile if it creates a bad experience.

53 — PERFORMANCE

THIS IS NON-NEGOTIABLE.

NEVER REMOVE CORE VISUAL FEATURES JUST TO SOLVE PERFORMANCE PROBLEMS.

The final website must remain:

3D
animated
interactive
visually rich
smooth

If performance becomes a problem:

DO THIS:

PROFILE
↓
FIND BOTTLENECK
↓
OPTIMIZE
↓
TEST

Do NOT immediately do this:

PERFORMANCE PROBLEM
↓
REMOVE 3D
↓
REMOVE ANIMATION
54 — PERFORMANCE OPTIMIZATION

Use where appropriate:

shared geometry
shared materials
instancing
frustum culling
optimized textures
GLTF/GLB
Draco
Meshopt
controlled pixel ratio
selective rendering
dynamic imports
lazy loading
progressive loading
preloading

Optimize the implementation.

Preserve visual quality.

55 — ASSET LOADING

Critical Hero assets should load early.

Upcoming scenes can be progressively preloaded.

Example:

Hero active
↓
preload About


About active
↓
preload Skills


Skills active
↓
preload Tools


Tools active
↓
preload Projects

The next scene should feel ready before the user reaches it.

56 — THREE.JS PERFORMANCE

Prefer:

reusable geometry
reusable materials
instancing
optimized models
compressed textures
proper culling
reasonable scene complexity
controlled render resolution

Do not unnecessarily create thousands
of separate objects.

57 — PARTICLES

Do NOT create hundreds/thousands
of DOM elements for particles.

Prefer:

Three.js
instancing
Canvas
shaders

depending on the visual requirement.

58 — ANIMATION PERFORMANCE

Prefer GPU-friendly properties:

transform
opacity

Avoid unnecessary layout animation:

top
left
width
height
margin

when transform can achieve the same visual result.

59 — SCROLL PERFORMANCE

Use one scroll architecture.

Preferred:

Lenis
+
GSAP
+
ScrollTrigger

Do NOT create:

Lenis
+
another smooth scroll
+
another scroll library
+
custom competing engine
60 — SCROLLTRIGGER CLEANUP

Every animation must have a lifecycle.

When a component is destroyed:

kill timeline
kill ScrollTrigger
remove event listeners
cancel animation loops
cleanup WebGL resources where necessary

Avoid:

duplicate ScrollTriggers
orphan timelines
duplicate listeners
memory leaks
61 — REDUCED MOTION

Respect:

prefers-reduced-motion

When enabled:

reduce movement
reduce large transitions
preserve layout
preserve navigation
preserve content
preserve hierarchy

Do not completely break the website.

62 — COMPONENT ARCHITECTURE

Do NOT put everything into:

app/page.tsx

Separate responsibilities.

Recommended:

app/


components/


  navigation/


  layout/


  scenes/


    hero/


    about/


    skills/


    tools/


    projects/


    contact/


    footer/


  three/


  motion/


  ui/


lib/


  animation/


  scroll/


  three/


  utils/


public/


  models/


  textures/


  images/


  icons/

The exact structure can evolve.

The responsibility separation must remain.

63 — SCENE MANAGER

A central scene/scroll coordination layer should handle:

current scene
previous scene
scroll direction
scroll progress
scene transitions
active state

Do NOT duplicate scene state
inside many unrelated components.

64 — STATE MANAGEMENT

Use the simplest solution possible.

Do NOT install a large state-management library
unless genuinely necessary.

65 — BUG FIXING RULE

When a bug occurs:

DO NOT immediately patch the visible symptom.

First investigate:

1. Which system owns the behavior?
2. What state is incorrect?
3. What lifecycle is incorrect?
4. What scroll state is incorrect?
5. Is it layout?
6. Is it animation?
7. Is it rendering?
8. Is it architecture?

Then fix the root cause.

66 — CRITICAL BUG RULE

If fixing one section breaks another section:

STOP.

Do NOT continue stacking patches.

Example:

Tools works
↓
change something
↓
Hero breaks

Do NOT immediately patch Hero.

Inspect:

scroll container
ScrollTrigger
Lenis
pinning
sticky behavior
transforms
stacking contexts
section heights
scene lifecycle

The goal is to fix the architecture.

67 — NO DESIGN DRIFT

AI MUST NOT:

redesign the website
change the theme
remove the 3D
remove core animation
remove horizontal Tools
change section order
turn the site into generic cards
make it a standard portfolio
introduce dark theme as the primary theme
randomly change typography
randomly change colors
68 — NO RANDOM DEPENDENCIES

Do NOT introduce:

random animation libraries
random UI libraries
unnecessary state libraries
unnecessary 3D libraries

without explicit approval.

Preferred:

GSAP
ScrollTrigger
Lenis

for animation/scroll.

Preferred:

Three.js
React Three Fiber
Drei

for 3D.

69 — PRESERVE WORKING CODE

VERY IMPORTANT.

If something is already working:

DO NOT REWRITE IT JUST BECAUSE YOU THINK ANOTHER IMPLEMENTATION IS CLEANER.

Make the smallest safe change.

Example:

If:

Hero works
About works
Skills works
Tools works

and Projects needs a fix:

DO NOT rewrite Hero → Tools.

Only modify what is necessary.

70 — DEVELOPMENT STRATEGY

DO NOT build everything at once.

Build incrementally.

71 — PHASE 1
FOUNDATION

Implement:

Next.js
TypeScript
Tailwind
basic architecture
required dependencies

Do not create complex 3D yet.

72 — PHASE 2
SCROLL FOUNDATION

Implement:

Lenis
GSAP
ScrollTrigger
scroll direction
scene lifecycle
cleanup

Then TEST.

Do not continue if the scroll foundation is broken.

73 — PHASE 3
SECTION SKELETON

Create:

Hero
About
Skills
Tools
Projects
Contact
Footer

Use temporary text/simple visuals.

The purpose is to verify:

vertical flow
section height
scroll behavior
74 — PHASE 4
HERO → ABOUT

Verify:

Hero
↓
About covers Hero
↓
About stabilizes

Do NOT continue until this is stable.

75 — PHASE 5
ABOUT → SKILLS

Verify:

About
↓
Skills enters from right

Skills must NOT appear below About.

76 — PHASE 6
SKILLS → TOOLS

This is the most important scroll test.

Verify:

Skills
→
Tools

as one continuous horizontal world.

Then:

Tools completes
↓
Projects

Only after this works should the 3D complexity increase.

77 — PHASE 7
BIDIRECTIONAL ANIMATION

Test:

DOWN

and:

UP

Repeatedly.

Verify sections can:

enter
become active
exit
re-enter

without breaking.

78 — PHASE 8
HERO 3D

Only after scroll architecture is stable:

Implement:

loading
3D environment
object entrance
spreading
typography
idle motion
79 — PHASE 9
ABOUT 3D

Implement:

lanyard
profile/photo
interaction
lighting
depth
transition cue
80 — PHASE 10
SKILLS 3D

Implement:

primary skill objects
ecosystem
motion
depth
interaction
81 — PHASE 11
TOOLS 3D

Implement:

creative workspace
tool objects
horizontal movement
parallax
depth
interaction
ending transition
82 — PHASE 12
PROJECTS

Implement:

featured project
3D object
hover interaction
CTA
archive
alternating layout
scroll-following line
83 — PHASE 13
CONTACT + FOOTER

Implement:

contact scene
CTA
footer
final visual callback
84 — PHASE 14
NAVIGATION

Implement:

asymmetric three-line mark
idle animation
hover
sidebar
section navigation
scroll interaction
85 — PHASE 15
PERFORMANCE

Only optimize after the complete visual architecture exists.

Profile first.

Then optimize:

rendering
assets
memory
animation
events
3D
scroll
loading

Do NOT remove core visual features.

86 — PHASE 16
ACCESSIBILITY

Verify:

semantic HTML
keyboard navigation
focus states
alt text
accessible buttons
accessible navigation
reduced motion
87 — PHASE 17
FINAL POLISH

Polish:

spacing
typography
timing
easing
lighting
materials
cursor
transitions
background pattern
micro-interactions

Do not redesign the architecture at this stage.

88 — TESTING AFTER EVERY MAJOR CHANGE

Test scrolling DOWN:

Hero
↓
About
↓
Skills
↓
Tools
↓
Projects
↓
Contact
↓
Footer

Test scrolling UP:

Footer
↑
Contact
↑
Projects
↑
Tools
↑
Skills
↑
About
↑
Hero

Test horizontal:

Skills ─────────→ Tools
89 — VISUAL REGRESSION

After every major refactor or optimization,
verify:

Hero
About
Skills
Tools
Projects
Contact
Footer
navigation
3D
typography
spacing
transitions
horizontal scrolling
reverse scrolling
idle animations

If something previously working becomes broken:

STOP AND FIX IT.

90 — GIT CHECKPOINTS

Create checkpoints after:

foundation
scroll-system
section-skeleton
hero
about
skills
tools
projects
contact
navigation
performance
final-polish

Avoid destructive refactoring without a checkpoint.

91 — AI DECISION PRIORITY

If requirements conflict, prioritize:

1. Functional correctness
2. Scroll architecture
3. Core visual direction
4. User interaction
5. Animation quality
6. 3D quality
7. Performance
8. Accessibility
9. Micro polish

However:

Performance MUST preserve the core visual experience.

92 — AI IMPLEMENTATION BEHAVIOR

Before modifying code:

READ
↓
UNDERSTAND
↓
INSPECT EXISTING IMPLEMENTATION
↓
PLAN
↓
MODIFY
↓
TEST

Do NOT:

GUESS
↓
REWRITE EVERYTHING
↓
HOPE IT WORKS
93 — AI MUST EXPLAIN MAJOR CHANGES

When making an architectural change,
explain briefly:

WHAT changed
WHY it changed
WHAT behavior it fixes
WHAT existing behavior it must preserve
94 — AI MUST NOT OVERENGINEER

Do not create unnecessary abstractions.

Do not create a framework inside the framework.

Use abstraction when it improves:

maintainability
reuse
lifecycle management
animation control

Not simply because abstraction is possible.

95 — ACCEPTANCE CRITERIA

The portfolio is NOT COMPLETE until all are true.

Structure
 Hero
 About
 Skills
 Tools
 Projects
 Contact
 Footer
Scroll
 Hero → About works
 About covers Hero
 About stabilizes
 Skills enters from right
 Skills → Tools is horizontal
 Tools remains beside Skills
 Tools does not fall underneath
 No black transition
 Tools completes before Projects
 Projects returns to vertical scrolling
Animation
 Hero entrance
 Hero idle
 About entrance
 About exit
 Skills entrance
 Tools entrance
 Projects entrance
 Contact entrance
 Footer entrance
 Reverse animations
 Re-entry animations
 Exit animations
3D
 Hero 3D
 About lanyard
 Skills 3D ecosystem
 Tools 3D workspace
 Projects 3D
 Contact 3D
Navigation
 Floating trigger
 Asymmetric three-line logo
 Idle animation
 Hover animation
 Sidebar
 Section navigation
Design
 Light theme
 Candy blue identity
 Consistent typography
 Proper whitespace
 No accidental text overlap
 Subtle background pattern
 Visual consistency
Performance
 No unnecessary duplicate animation loops
 No duplicate ScrollTriggers
 No obvious memory leaks
 Assets optimized
 3D optimized
 Progressive loading
 Smooth scrolling
 Smooth interaction
 Visual quality preserved
Accessibility
 Semantic HTML
 Keyboard navigation
 Focus states
 Alt text
 Accessible buttons
 Reduced motion
96 — ABSOLUTE FINAL RULE

The final portfolio must feel like:

A PREMIUM INTERACTIVE 3D MOTION EXPERIENCE.

NOT:

A NORMAL PORTFOLIO WITH SOME ANIMATIONS.

The website itself is part of the portfolio.

Therefore:

DESIGN
+
CODE
+
3D
+
MOTION
+
INTERACTION
+
PERFORMANCE

must work together.

If implementation becomes difficult:

DO NOT IMMEDIATELY SIMPLIFY.

Instead:

UNDERSTAND
↓
FIND THE ROOT CAUSE
↓
DESIGN THE ARCHITECTURE
↓
OPTIMIZE
↓
IMPLEMENT
↓
TEST

Never sacrifice the core experience merely because
the easier implementation is more convenient.

END OF SPECIFICATION