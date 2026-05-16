const defaultCourse = {
  title: "Next Step Complete Player Pathway",
  status: "Draft",
  modules: [
    {
      title: "Dribbling Foundations",
      source: "manual",
      phase: "Phase 1",
      level: "Foundation",
      minutes: 0,
      objective: "Build control across both hands while changing dribble height, force, and rhythm.",
      homework: "Complete the pound and V-dribble blocks with left, right, and both-hand variations. Track control errors.",
      lessons: [
        { title: "Left-hand chest-height pound dribble", type: "Hand: Left / Height: Chest / Intensity: Normal / Speed: Walking / Direction: Forward / Type: Pound", minutes: 4 },
        { title: "Right-hand waist-height V dribble", type: "Hand: Right / Height: Waist / Intensity: Hard / Speed: Jogging / Direction: Backward / Type: V Dribble", minutes: 5 },
        { title: "Both-hand knee-height forward-back dribble", type: "Hand: Both / Height: Knees / Intensity: Normal / Speed: Running / Direction: Sideways / Type: Fwd/Back", minutes: 6 },
      ],
      assessments: [
        "Maintains control with left, right, and both-hand patterns",
        "Changes dribble height without looking down",
        "Keeps posture and balance while moving",
      ],
      liveSession: "Baseline dribble-control test across hand, height, intensity, speed, and direction.",
    },
    {
      title: "Dribble Moves and Direction Changes",
      source: "manual",
      phase: "Phase 2",
      level: "Foundation Plus",
      minutes: 0,
      objective: "Teach change-of-direction dribble moves and how to shift from stationary control into movement.",
      homework: "Run each move for 30-second sets: in-and-out, BTB, BTL, reverse BTL, crossover, switching, and pocket.",
      lessons: [
        { title: "In-and-out setup dribble", type: "Type: In & Out / Hand: Left + Right / Height: Waist / Speed: Jogging / Direction: Forward", minutes: 5 },
        { title: "BTB and BTL change series", type: "Type: BTB + BTL / Hand: Both / Height: Knees / Speed: Walking to Running / Direction: Forward", minutes: 8 },
        { title: "Reverse BTL, crossover, and switching", type: "Type: Rev BTL + Crossover + Switching / Height: Knees / Intensity: Hard / Direction: Sideways", minutes: 8 },
        { title: "Pocket dribble timing", type: "Type: Pocket / Hand: Left + Right / Height: Waist / Speed: Jogging / Direction: Forward", minutes: 5 },
      ],
      assessments: [
        "Uses a move without losing balance",
        "Can change direction on command",
        "Protects the ball while moving sideways and backward",
      ],
      liveSession: "Cone-lane change-of-direction test with coach calling move, hand, and direction.",
    },
    {
      title: "Finishing Fundamentals",
      source: "manual",
      phase: "Phase 3",
      level: "Foundation",
      minutes: 0,
      objective: "Build reliable right- and left-hand finishing with simple footwork and no defensive pressure.",
      homework: "Make 20 right-hand layups and 20 left-hand layups at slow and medium speeds.",
      lessons: [
        { title: "Right-hand standard layup", type: "Hand: Right / Speed: Slow / Footwork: Standard / Finish: Layup / Environment: No Defense", minutes: 6 },
        { title: "Left-hand standard layup", type: "Hand: Left / Speed: Medium / Footwork: Standard / Finish: Layup / Environment: No Defense", minutes: 6 },
        { title: "Floater introduction", type: "Hand: Right + Left / Speed: Medium / Footwork: Standard / Finish: Floater / Environment: No Defense", minutes: 7 },
      ],
      assessments: [
        "Finishes right-hand layup with correct footwork",
        "Finishes left-hand layup with correct footwork",
        "Shows soft touch on basic floater reps",
      ],
      liveSession: "Layup footwork audit, weak-hand correction, and no-defense make-count baseline.",
    },
    {
      title: "Finishing Progressions",
      source: "manual",
      phase: "Phase 4",
      level: "Intermediate",
      minutes: 0,
      objective: "Progress finishing into off-foot, runner, and running-shot situations with defensive pressure.",
      homework: "Complete game-speed finishing reps with a parent or partner giving light defensive pressure.",
      lessons: [
        { title: "Off-foot layup", type: "Hand: Right + Left / Speed: Game / Footwork: Off-Foot / Finish: Layup / Environment: With Defense", minutes: 8 },
        { title: "Runner from the lane", type: "Hand: Right + Left / Speed: Game / Footwork: Off-Foot / Finish: Runner / Environment: With Defense", minutes: 8 },
        { title: "Running shot progression", type: "Hand: Right + Left / Speed: Game / Footwork: Standard + Off-Foot / Finish: Running Shot / Environment: With Defense", minutes: 8 },
      ],
      assessments: [
        "Chooses standard or off-foot finish based on defender position",
        "Completes runner at game speed",
        "Finishes with body control against light pressure",
      ],
      liveSession: "Defender-read finishing stations with coach tracking hand, footwork, and finish selection.",
    },
  ],
};

const courseStorageKey = "nextStepCourseDraftV3";
const assignmentStorageKey = "nextStepAssignmentsV1";
localStorage.removeItem("nextStepCourseDraft");
localStorage.removeItem("nextStepCourseDraftV2");
const savedCourse = localStorage.getItem(courseStorageKey);
const course = savedCourse ? JSON.parse(savedCourse) : structuredClone(defaultCourse);
const savedAssignments = localStorage.getItem(assignmentStorageKey);
const assignments = savedAssignments ? JSON.parse(savedAssignments) : [];

function normalizeCourseDraft() {
  course.modules.forEach((module, index) => {
    if (!module.id) module.id = `${slugify(module.title)}-${index + 1}`;
    if (!module.source) module.source = index < 3 ? "manual" : "ai";
    if (!Array.isArray(module.lessons)) module.lessons = [];
    if (!Array.isArray(module.assessments)) module.assessments = [];
    if (!module.liveSession) module.liveSession = "Add the in-person coaching checkpoint for this module.";
    module.minutes = moduleMinutes(module);
  });
}

normalizeCourseDraft();

const athletes = [
  {
    id: "arin",
    name: "Arin",
    age: 11,
    level: "Foundation",
    streak: 0,
    attendance: "New",
    course: 0,
    skill: 0,
    weeklyStatus: "Awaiting assignment",
    homeworkDone: false,
    focus: {
      shooting: ["No shooting focus assigned", "Assign a module from Admin to set Arin's current training focus.", "No homework assigned yet."],
      handle: ["No handle focus assigned", "Assign a dribbling module from Admin to start Arin's pathway.", "No homework assigned yet."],
      defence: ["No defence focus assigned", "Assign a module from Admin to set Arin's current training focus.", "No homework assigned yet."],
    },
    lessons: [],
    sessions: [
      { title: "Initial Assessment", when: "Not scheduled", location: "Court TBD", focus: ["Baseline", "Module placement"] },
    ],
    skills: [0, 0, 0, 0, 0, 0],
    goals: [],
  },
  {
    id: "mason",
    name: "Mason Carter",
    age: 12,
    level: "Foundation Plus",
    streak: 8,
    attendance: "92%",
    course: 46,
    skill: 71,
    weeklyStatus: "On track",
    homeworkDone: false,
    focus: {
      shooting: ["Form Shooting", "Lock wrist finish, hold follow-through until the ball lands.", "5 spots, 20 makes each. Parent records makes from the corner."],
      handle: ["Pressure Handle", "Keep the dribble below the hip while changing pace.", "3 rounds of pound-cross, retreat, and attack footwork."],
      defence: ["Closeout Angles", "Chop feet early and shade the player to their weaker hand.", "Mirror drill for 4 x 30 seconds."],
    },
    lessons: [
      { title: "Shooting base: feet, eyes, elbow", type: "Video + court rep", progress: 72 },
      { title: "Weak-hand control under pressure", type: "Drill block", progress: 38 },
      { title: "1v1 reads from the wing", type: "Decision lab", progress: 20 },
    ],
    sessions: [
      { title: "Private Skills Session", when: "Sat 9:30 AM", location: "Court 2", focus: ["Shooting", "Handle", "Goal review"] },
      { title: "Small Group Workout", when: "Tue 5:15 PM", location: "Hoop Lab", focus: ["1v1 reads", "Finishing"] },
      { title: "Monthly Assessment", when: "May 31", location: "Main court", focus: ["Testing", "Coach report"] },
    ],
    skills: [74, 68, 62, 79, 58, 71],
    goals: [
      { name: "Make 70% from form-shot spots", area: "Shooting", progress: 64 },
      { name: "Complete weak-hand cone course under 38s", area: "Ball handling", progress: 42 },
      { name: "Call defensive coverage before screen", area: "Decision making", progress: 36 },
    ],
  },
  {
    id: "ava",
    name: "Ava Nguyen",
    age: 10,
    level: "Starter",
    streak: 4,
    attendance: "88%",
    course: 31,
    skill: 59,
    weeklyStatus: "Needs reps",
    homeworkDone: true,
    focus: {
      shooting: ["Balanced Release", "Square shoulders before the catch and finish tall.", "30 close-range makes, then 20 catch-and-shoot reps."],
      handle: ["Body Protection", "Use off-arm space without pushing.", "Stationary wrap series, then cone lane attacks."],
      defence: ["Stance Endurance", "Stay low through the whole possession.", "Wall sit plus slide series, 4 sets."],
    },
    lessons: [
      { title: "Triple threat basics", type: "Video + quiz", progress: 84 },
      { title: "Layup footwork both sides", type: "Court rep", progress: 51 },
      { title: "Passing windows", type: "Decision lab", progress: 15 },
    ],
    sessions: [
      { title: "Junior Skills Session", when: "Fri 4:30 PM", location: "Court 1", focus: ["Layups", "Passing"] },
      { title: "Parent Progress Check", when: "May 24", location: "Online", focus: ["Goals", "Homework"] },
      { title: "Holiday Camp", when: "Jun 8", location: "Main court", focus: ["Games", "Confidence"] },
    ],
    skills: [61, 57, 68, 50, 55, 64],
    goals: [
      { name: "Finish 8/10 right-side layups", area: "Finishing", progress: 58 },
      { name: "Stay in stance for 40 seconds", area: "Defence", progress: 70 },
    ],
  },
];

const skillLabels = ["Shooting", "Handle", "Finishing", "Footwork", "Defence", "IQ"];
const state = {
  athlete: athletes[0],
  view: "dashboard",
  focus: "shooting",
  moduleIndex: 1,
  adminModuleIndex: 0,
  adminStudentId: "arin",
  adminSourceFilter: "all",
  publishNote: "",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function saveCourse() {
  normalizeCourseDraft();
  localStorage.setItem(courseStorageKey, JSON.stringify(course));
}

function saveAssignments() {
  localStorage.setItem(assignmentStorageKey, JSON.stringify(assignments));
}

function moduleSourceLabel(source) {
  return source === "ai" ? "AI Draft" : "My Program";
}

function moduleMinutes(module) {
  return module.lessons.reduce((total, lesson) => total + Number(lesson.minutes || 0), 0);
}

function filteredAdminModules() {
  return course.modules
    .map((module, index) => ({ module, index }))
    .filter((item) => state.adminSourceFilter === "all" || item.module.source === state.adminSourceFilter);
}

function moduleById(moduleId) {
  return course.modules.find((module) => module.id === moduleId);
}

function assignmentsForStudent(studentId = state.athlete.id) {
  return assignments.filter((assignment) => assignment.studentId === studentId);
}

function assignedModulesForStudent(studentId = state.athlete.id) {
  return assignmentsForStudent(studentId)
    .map((assignment) => ({ assignment, module: moduleById(assignment.moduleId) }))
    .filter((item) => item.module);
}

function athleteModules() {
  return assignedModulesForStudent().map(({ module, assignment }) => ({
    ...module,
    assignment,
    progress: assignment.progress || 0,
  }));
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("");
}

function renderAthleteOptions() {
  $("#playerSelect").innerHTML = athletes.map((athlete) => `<option value="${athlete.id}">${escapeHtml(athlete.name)}</option>`).join("");
}

function renderSummary() {
  const athlete = state.athlete;
  const assigned = assignmentsForStudent(athlete.id);
  const averageProgress = assigned.length
    ? Math.round(assigned.reduce((total, assignment) => total + Number(assignment.progress || 0), 0) / assigned.length)
    : 0;
  $("#studentInitials").textContent = initials(athlete.name);
  $("#studentName").textContent = athlete.name;
  $("#studentMeta").textContent = `Age ${athlete.age} - ${athlete.level}`;
  $("#weeklyStatus").textContent = athlete.weeklyStatus;
  $("#summaryMetrics").innerHTML = [
    ["Assigned modules", assigned.length],
    ["Course", `${averageProgress}%`],
    ["Skill score", athlete.skill],
    ["Attendance", athlete.attendance],
  ].map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderDashboard() {
  const athlete = state.athlete;
  const focus = athlete.focus[state.focus];
  $("#focusDetail").innerHTML = `<h3>${escapeHtml(focus[0])}</h3><p>${escapeHtml(focus[1])}</p><p><strong>Homework:</strong> ${escapeHtml(focus[2])}</p>`;
  const assigned = assignedModulesForStudent(athlete.id);
  const dashboardDrills = assigned.length
    ? assigned[0].module.lessons.map((lesson) => ({ ...lesson, progress: assigned[0].assignment.progress || 0 }))
    : athlete.lessons;
  $("#lessonList").innerHTML = dashboardDrills.length ? dashboardDrills.map((lesson) => `
    <div class="lesson-row">
      <div class="progress-ring" style="--value: ${lesson.progress}%"></div>
      <button type="button">
        <strong>${escapeHtml(lesson.title)}</strong><br />
        <small>${escapeHtml(lesson.type)} - ${lesson.progress}% complete</small>
      </button>
    </div>
  `).join("") : `<div class="homework-box"><h3>No assigned drills yet</h3><p>Assign Arin a module in Admin to populate his dashboard.</p></div>`;
  $("#homeworkBox").classList.toggle("is-done", athlete.homeworkDone);
  $("#homeworkBox").innerHTML = `
    <h3>${athlete.homeworkDone ? "Submitted for coach review" : "Due before next session"}</h3>
    <p>${escapeHtml(focus[2])}</p>
    <ul>
      <li>Upload parent count or short phone clip.</li>
      <li>Rate confidence from 1 to 5 after the workout.</li>
      <li>Coach checks it against the next session plan.</li>
    </ul>
  `;
  const next = athlete.sessions[0];
  $("#nextSession").innerHTML = `
    <p>${escapeHtml(next.when)} - ${escapeHtml(next.location)}</p>
    <h3>${escapeHtml(next.title)}</h3>
    <p>${next.focus.map(escapeHtml).join(" / ")}</p>
    <button class="primary-button">View Plan</button>
  `;
}

function renderCurriculum() {
  const modules = athleteModules();
  if (!modules.length) {
    state.moduleIndex = 0;
    $("#moduleStack").innerHTML = `<div class="homework-box"><h3>No curriculum yet</h3><p>Use the Admin panel to create your first module.</p></div>`;
    $("#moduleDetail").innerHTML = `
      <div class="video-frame">No Assignment</div>
      <p class="eyebrow">Student pathway</p>
      <h2>No assigned modules</h2>
      <p>${escapeHtml(state.athlete.name)} does not have any modules assigned yet. Use Admin to assign modules from the curriculum.</p>
    `;
    return;
  }
  state.moduleIndex = Math.min(state.moduleIndex, modules.length - 1);
  $("#moduleStack").innerHTML = modules.map((module, index) => `
    <div class="module-row ${index === state.moduleIndex ? "is-active" : ""}" data-module="${index}">
      <div class="progress-ring" style="--value: ${module.progress}%"></div>
      <button type="button">
        <strong>${escapeHtml(module.title)}</strong><br />
        <small>Assigned - ${escapeHtml(module.phase)} - ${moduleMinutes(module)} min - ${module.progress}%</small>
      </button>
    </div>
  `).join("");
  const selected = modules[state.moduleIndex];
  $("#moduleDetail").innerHTML = `
    <div class="video-frame">${escapeHtml(selected.title)}</div>
    <p class="eyebrow">${escapeHtml(selected.phase)}</p>
    <h2>${escapeHtml(selected.title)}</h2>
    <p>${escapeHtml(selected.objective)}</p>
    <p><strong>Coach notes:</strong> ${escapeHtml(selected.assignment.coachNotes || "No notes yet.")}</p>
    <div class="checklist">
      <label><input type="checkbox" ${selected.progress > 20 ? "checked" : ""} /> Watch lesson breakdown</label>
      <label><input type="checkbox" ${selected.progress > 45 ? "checked" : ""} /> Complete court workout</label>
      <label><input type="checkbox" ${selected.progress > 70 ? "checked" : ""} /> Submit homework evidence</label>
      <label><input type="checkbox" ${selected.progress > 90 ? "checked" : ""} /> Pass coach assessment</label>
    </div>
  `;
}

function renderSessions() {
  $("#sessionBoard").innerHTML = state.athlete.sessions.map((session) => `
    <section class="session-mini">
      <small>${escapeHtml(session.when)}</small>
      <strong>${escapeHtml(session.title)}</strong>
      <p>${escapeHtml(session.location)}</p>
      <div class="tag-row">${session.focus.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>
      <button class="ghost-button">Session Notes</button>
    </section>
  `).join("");
}

function renderGoals() {
  $("#goalList").innerHTML = state.athlete.goals.map((goal) => `
    <div class="goal-row">
      <div class="progress-ring" style="--value: ${goal.progress}%"></div>
      <div>
        <strong>${escapeHtml(goal.name)}</strong>
        <p>${escapeHtml(goal.area)} - ${goal.progress}% complete</p>
        <div class="bar" style="--value: ${goal.progress}%"><span></span></div>
      </div>
    </div>
  `).join("");
}

function renderAdmin() {
  state.adminModuleIndex = course.modules.length ? Math.min(state.adminModuleIndex, course.modules.length - 1) : 0;
  const filteredModules = filteredAdminModules();
  if (filteredModules.length && !filteredModules.some((item) => item.index === state.adminModuleIndex)) {
    state.adminModuleIndex = filteredModules[0].index;
  }
  const module = course.modules[state.adminModuleIndex];
  const lessonCount = course.modules.reduce((total, item) => total + item.lessons.length, 0);
  const assessmentCount = course.modules.reduce((total, item) => total + item.assessments.length, 0);
  const totalMinutes = course.modules.reduce((total, item) => total + moduleMinutes(item), 0);
  const manualCount = course.modules.filter((item) => item.source !== "ai").length;
  const aiCount = course.modules.filter((item) => item.source === "ai").length;

  $("#adminMetrics").innerHTML = [
    ["My modules", manualCount],
    ["AI drafts", aiCount],
    ["Drills", lessonCount],
    ["Course minutes", totalMinutes],
  ].map(([label, value]) => `<div class="admin-stat"><span>${label}</span><strong>${value}</strong></div>`).join("");

  renderAssignments();

  $$(".source-tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.sourceFilter === state.adminSourceFilter));

  $("#adminModuleStack").innerHTML = filteredModules.length ? filteredModules.map(({ module: item, index }) => `
    <div class="module-row ${index === state.adminModuleIndex ? "is-active" : ""} ${item.source === "ai" ? "is-ai" : ""}" data-admin-module="${index}">
      <div class="progress-ring" style="--value: ${Math.min(100, item.lessons.length * 22)}%"></div>
      <button type="button">
        <strong>${escapeHtml(item.title)} <span class="source-badge ${item.source === "ai" ? "ai" : ""}">${moduleSourceLabel(item.source)}</span></strong><br />
        <small>${escapeHtml(item.phase)} - ${escapeHtml(item.level)} - ${item.lessons.length} drills - ${moduleMinutes(item)} min</small>
      </button>
    </div>
  `).join("") : `<div class="homework-box"><h3>No modules in this view</h3><p>Switch filters or add a new module.</p></div>`;

  if (!module) {
    $("#adminEditor").innerHTML = `
      ${state.publishNote ? `<p class="publish-note">${escapeHtml(state.publishNote)}</p>` : ""}
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Module editor</p>
          <h2>Blank Course</h2>
        </div>
      </div>
      <div class="homework-box">
        <h3>Create your first module</h3>
        <p>Your program structure is empty. Add a module under My Program, or create an AI draft separately and promote it later if it belongs.</p>
      </div>
    `;
    $("#sessionPlan").innerHTML = `<div class="homework-box"><h3>No session blueprint yet</h3><p>Live coaching checkpoints will appear once modules are created.</p></div>`;
    return;
  }

  $("#adminEditor").innerHTML = `
    ${state.publishNote ? `<p class="publish-note">${escapeHtml(state.publishNote)}</p>` : ""}
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Module editor</p>
        <h2>${escapeHtml(module.title)} <span class="source-badge ${module.source === "ai" ? "ai" : ""}">${moduleSourceLabel(module.source)}</span></h2>
      </div>
      ${module.source === "ai" ? `<button class="ghost-button" id="promoteModule">Promote to My Program</button>` : ""}
    </div>
    <div class="field-grid">
      <label>Title <input id="adminTitle" type="text" value="${escapeHtml(module.title)}" /></label>
      <label>Phase <input id="adminPhase" type="text" value="${escapeHtml(module.phase)}" /></label>
      <label>Level <input id="adminLevel" type="text" value="${escapeHtml(module.level)}" /></label>
      <label>Source
        <select id="adminSource">
          <option value="manual" ${module.source !== "ai" ? "selected" : ""}>My Program</option>
          <option value="ai" ${module.source === "ai" ? "selected" : ""}>AI Draft</option>
        </select>
      </label>
      <label class="is-wide">Learning objective <textarea id="adminObjective">${escapeHtml(module.objective)}</textarea></label>
      <label class="is-wide">Homework <textarea id="adminHomework">${escapeHtml(module.homework)}</textarea></label>
    </div>
    <div class="homework-box">
      <h3>${moduleMinutes(module)} total minutes</h3>
      <p>Module duration is calculated from the drills below. Change the drill minutes to change this total.</p>
    </div>
    <button class="primary-button" id="saveModule">Save Module</button>

    <hr />
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Course content</p>
        <h2>Drills</h2>
      </div>
    </div>
    <div class="admin-lesson-list">
      ${module.lessons.map((lesson, index) => `
        <div class="admin-lesson-row">
          <div>
            <strong>${escapeHtml(lesson.title)}</strong>
            <p>${escapeHtml(lesson.type)} - ${lesson.minutes} min</p>
          </div>
          <div class="admin-lesson-actions">
            <button class="small-button" data-move-lesson="${index}" data-direction="-1">Up</button>
            <button class="small-button" data-remove-lesson="${index}">Remove</button>
          </div>
        </div>
      `).join("")}
    </div>
    <form class="lesson-form" id="lessonForm">
      <label class="is-wide">Drill title <input id="lessonTitle" type="text" placeholder="Example: Euro step finishing reads" /></label>
      <label>Type <input id="lessonType" type="text" placeholder="Video + drill block" /></label>
      <label>Minutes <input id="lessonMinutes" type="number" min="1" value="10" /></label>
      <button class="primary-button">Add Drill</button>
    </form>

    <hr />
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Assessment gates</p>
        <h2>Pass Criteria</h2>
      </div>
    </div>
    <div class="admin-lesson-list">
      ${module.assessments.map((assessment, index) => `
        <div class="assessment-row">
          <div><strong>${index + 1}. ${escapeHtml(assessment)}</strong><p>Coach validates during in-person or video review.</p></div>
          <button class="small-button" data-remove-assessment="${index}">Remove</button>
        </div>
      `).join("")}
    </div>
    <form class="quick-add" id="assessmentForm">
      <input id="assessmentText" type="text" placeholder="Add pass criterion" />
      <button class="primary-button">Add</button>
    </form>
  `;

  $("#sessionPlan").innerHTML = course.modules.map((item, index) => `
    <article>
      <strong>${escapeHtml(item.phase)} - ${escapeHtml(item.title)} <span class="source-badge ${item.source === "ai" ? "ai" : ""}">${moduleSourceLabel(item.source)}</span></strong>
      <p>${escapeHtml(item.liveSession)}</p>
      <div class="tag-row">
        <span class="tag">${item.lessons.length} drills</span>
        <span class="tag">${moduleMinutes(item)} min</span>
        <span class="tag">${item.assessments.length} checks</span>
      </div>
    </article>
  `).join("");
}

function renderAssignments() {
  const selectedStudent = athletes.find((athlete) => athlete.id === state.adminStudentId) || athletes[0];
  const studentAssignments = assignedModulesForStudent(selectedStudent.id);
  const assignedIds = new Set(studentAssignments.map((item) => item.module.id));
  const assignableModules = course.modules.filter((module) => module.source !== "ai" && !assignedIds.has(module.id));

  $("#assignmentPanel").innerHTML = `
    <form class="assignment-form" id="assignmentForm">
      <label>Student
        <select id="assignmentStudent">
          ${athletes.map((athlete) => `<option value="${athlete.id}" ${athlete.id === selectedStudent.id ? "selected" : ""}>${escapeHtml(athlete.name)}</option>`).join("")}
        </select>
      </label>
      <label>Module
        <select id="assignmentModule" ${assignableModules.length ? "" : "disabled"}>
          ${assignableModules.length
            ? assignableModules.map((module) => `<option value="${module.id}">${escapeHtml(module.title)}</option>`).join("")
            : `<option>No unassigned modules</option>`}
        </select>
      </label>
      <label>Priority
        <select id="assignmentPriority">
          <option>High</option>
          <option selected>Normal</option>
          <option>Low</option>
        </select>
      </label>
      <label>Due date <input id="assignmentDueDate" type="date" /></label>
      <label>Coach notes <textarea id="assignmentNotes" placeholder="Example: Start with left-hand control and lower dribble height."></textarea></label>
      <button class="primary-button" ${assignableModules.length ? "" : "disabled"}>Assign Module</button>
    </form>
    <div class="assignment-list">
      ${studentAssignments.length ? studentAssignments.map(({ assignment, module }) => `
        <div class="assignment-row">
          <strong>${escapeHtml(module.title)}</strong>
          <p>${escapeHtml(assignment.priority)} priority${assignment.dueDate ? ` - due ${escapeHtml(assignment.dueDate)}` : ""} - ${assignment.progress || 0}% complete</p>
          <p>${escapeHtml(assignment.coachNotes || "No coach notes.")}</p>
          <button class="small-button" data-remove-assignment="${assignment.id}">Remove</button>
        </div>
      `).join("") : `<div class="homework-box"><h3>No assignments yet</h3><p>Assign a module to ${escapeHtml(selectedStudent.name)} to build their pathway.</p></div>`}
    </div>
  `;
}

function drawRadar() {
  const canvas = $("#radarCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 8;
  const radius = 118;
  const scores = state.athlete.skills;
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  context.font = "700 13px system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";

  for (let ring = 1; ring <= 4; ring += 1) {
    context.beginPath();
    skillLabels.forEach((_, index) => {
      const angle = -Math.PI / 2 + (index / skillLabels.length) * Math.PI * 2;
      const pointRadius = (radius / 4) * ring;
      const x = centerX + Math.cos(angle) * pointRadius;
      const y = centerY + Math.sin(angle) * pointRadius;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.closePath();
    context.strokeStyle = getComputedStyle(document.body).getPropertyValue("--line");
    context.stroke();
  }

  skillLabels.forEach((label, index) => {
    const angle = -Math.PI / 2 + (index / skillLabels.length) * Math.PI * 2;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    context.stroke();
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--muted");
    context.fillText(label, centerX + Math.cos(angle) * (radius + 34), centerY + Math.sin(angle) * (radius + 26));
  });

  context.beginPath();
  scores.forEach((score, index) => {
    const angle = -Math.PI / 2 + (index / scores.length) * Math.PI * 2;
    const pointRadius = (score / 100) * radius;
    const x = centerX + Math.cos(angle) * pointRadius;
    const y = centerY + Math.sin(angle) * pointRadius;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.closePath();
  context.fillStyle = "rgba(196, 68, 33, 0.28)";
  context.strokeStyle = getComputedStyle(document.body).getPropertyValue("--accent");
  context.lineWidth = 3;
  context.fill();
  context.stroke();
}

function setView(view) {
  state.view = view;
  $$(".view").forEach((panel) => panel.classList.remove("is-visible"));
  $(`#${view}View`).classList.add("is-visible");
  $$(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  $("#pageTitle").textContent = {
    dashboard: "Training Dashboard",
    curriculum: "Curriculum",
    sessions: "Coaching Sessions",
    progress: "Progress Tracker",
    admin: "Admin Panel",
  }[view];
  $(".student-summary").style.display = view === "admin" ? "none" : "";
  $("#openGoalModal").style.display = view === "admin" ? "none" : "";
  if (view === "progress") drawRadar();
  if (view === "admin") renderAdmin();
}

function renderAll() {
  renderSummary();
  renderDashboard();
  renderCurriculum();
  renderSessions();
  renderGoals();
  renderAdmin();
  drawRadar();
}

renderAthleteOptions();
renderAll();

$("#playerSelect").addEventListener("change", (event) => {
  state.athlete = athletes.find((athlete) => athlete.id === event.target.value);
  state.moduleIndex = Math.min(state.moduleIndex, course.modules.length - 1);
  renderAll();
});

$$(".nav-item").forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));

$$(".hotspot").forEach((button) => {
  button.addEventListener("click", () => {
    state.focus = button.dataset.skill;
    $$(".hotspot").forEach((hotspot) => hotspot.classList.remove("active"));
    button.classList.add("active");
    renderDashboard();
  });
});

$("#moduleStack").addEventListener("click", (event) => {
  const row = event.target.closest(".module-row");
  if (!row) return;
  state.moduleIndex = Number(row.dataset.module);
  renderCurriculum();
});

$("#adminModuleStack").addEventListener("click", (event) => {
  const row = event.target.closest(".module-row");
  if (!row) return;
  state.adminModuleIndex = Number(row.dataset.adminModule);
  state.publishNote = "";
  renderAdmin();
});

$("#sourceTabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-source-filter]");
  if (!tab) return;
  state.adminSourceFilter = tab.dataset.sourceFilter;
  renderAdmin();
});

$("#assignmentPanel").addEventListener("change", (event) => {
  if (event.target.id !== "assignmentStudent") return;
  state.adminStudentId = event.target.value;
  renderAssignments();
});

$("#assignmentPanel").addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-assignment]");
  if (!removeButton) return;
  const index = assignments.findIndex((assignment) => assignment.id === removeButton.dataset.removeAssignment);
  if (index >= 0) assignments.splice(index, 1);
  saveAssignments();
  renderAll();
});

$("#assignmentPanel").addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id !== "assignmentForm") return;
  const studentId = $("#assignmentStudent").value;
  const moduleId = $("#assignmentModule").value;
  if (!moduleById(moduleId)) return;
  const duplicate = assignments.some((assignment) => assignment.studentId === studentId && assignment.moduleId === moduleId);
  if (duplicate) return;
  assignments.push({
    id: `assignment-${Date.now()}`,
    studentId,
    moduleId,
    status: "assigned",
    priority: $("#assignmentPriority").value,
    dueDate: $("#assignmentDueDate").value,
    coachNotes: $("#assignmentNotes").value.trim(),
    progress: 0,
    assignedAt: new Date().toISOString(),
  });
  state.adminStudentId = studentId;
  saveAssignments();
  renderAll();
});

$("#adminEditor").addEventListener("click", (event) => {
  const module = course.modules[state.adminModuleIndex];
  const removeLesson = event.target.closest("[data-remove-lesson]");
  const moveLesson = event.target.closest("[data-move-lesson]");
  const removeAssessment = event.target.closest("[data-remove-assessment]");

  if (event.target.id === "saveModule") {
    module.title = $("#adminTitle").value.trim() || module.title;
    module.phase = $("#adminPhase").value.trim() || module.phase;
    module.level = $("#adminLevel").value.trim() || module.level;
    module.source = $("#adminSource").value;
    module.objective = $("#adminObjective").value.trim();
    module.homework = $("#adminHomework").value.trim();
    module.minutes = moduleMinutes(module);
    saveCourse();
    renderAll();
  }

  if (event.target.id === "promoteModule") {
    module.source = "manual";
    state.adminSourceFilter = "manual";
    state.publishNote = "AI draft promoted into My Program. You can now edit it as your owned structure.";
    saveCourse();
    renderAll();
  }

  if (removeLesson) {
    module.lessons.splice(Number(removeLesson.dataset.removeLesson), 1);
    module.minutes = moduleMinutes(module);
    saveCourse();
    renderAll();
  }

  if (moveLesson) {
    const index = Number(moveLesson.dataset.moveLesson);
    if (index > 0) {
      const [lesson] = module.lessons.splice(index, 1);
      module.lessons.splice(index - 1, 0, lesson);
      saveCourse();
      renderAll();
    }
  }

  if (removeAssessment) {
    module.assessments.splice(Number(removeAssessment.dataset.removeAssessment), 1);
    saveCourse();
    renderAll();
  }
});

$("#adminEditor").addEventListener("submit", (event) => {
  event.preventDefault();
  const module = course.modules[state.adminModuleIndex];

  if (event.target.id === "lessonForm") {
    const title = $("#lessonTitle").value.trim();
    if (!title) return;
    module.lessons.push({
      title,
      type: $("#lessonType").value.trim() || "Court rep",
      minutes: Number($("#lessonMinutes").value) || 10,
    });
    module.minutes = moduleMinutes(module);
  }

  if (event.target.id === "assessmentForm") {
    const assessment = $("#assessmentText").value.trim();
    if (!assessment) return;
    module.assessments.push(assessment);
  }

  saveCourse();
  renderAll();
});

$("#moduleForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = $("#newModuleTitle").value.trim();
  if (!title) return;
  course.modules.push({
    id: `${slugify(title)}-${Date.now()}`,
    title,
    source: "manual",
    phase: `Phase ${course.modules.length + 1}`,
    level: "New",
    minutes: 0,
    objective: "Define the key learning outcome for this module.",
    homework: "Add a measurable homework assignment.",
    lessons: [],
    assessments: [],
    liveSession: "Add the in-person coaching checkpoint for this module.",
  });
  state.adminModuleIndex = course.modules.length - 1;
  $("#newModuleTitle").value = "";
  saveCourse();
  renderAll();
});

$("#addAiSuggestion").addEventListener("click", () => {
  const nextNumber = course.modules.length + 1;
  course.modules.push({
    id: `ai-competitive-finishing-${Date.now()}`,
    title: `AI Draft: Competitive Finishing ${nextNumber}`,
    source: "ai",
    phase: `Draft ${nextNumber}`,
    level: "Suggested",
    minutes: 0,
    objective: "Suggested progression for finishing through contact, reading shot blockers, and choosing clean angles.",
    homework: "AI suggestion: 4 finishing spots, 10 makes each, with one clip from the weak side.",
    lessons: [
      { title: "Contact balance finishes", type: "AI suggested drill", minutes: 10 },
      { title: "Inside-hand layup reads", type: "AI suggested decision lab", minutes: 12 },
    ],
    assessments: ["Finishes through light contact", "Chooses correct hand based on defender angle"],
    liveSession: "AI suggestion: pad-contact finishing stations followed by 1v1 advantage starts.",
  });
  state.adminModuleIndex = course.modules.length - 1;
  state.adminSourceFilter = "ai";
  state.publishNote = "AI draft created separately. Review it, edit it, then promote it only if it belongs in your program.";
  saveCourse();
  renderAll();
});

$("#publishCourse").addEventListener("click", () => {
  course.status = "Published draft";
  state.publishNote = "Draft published locally. Next step is connecting this builder to a real database/admin login.";
  saveCourse();
  renderAdmin();
});

$("#completeHomework").addEventListener("click", () => {
  state.athlete.homeworkDone = !state.athlete.homeworkDone;
  renderDashboard();
});

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  drawRadar();
});

$("#openGoalModal").addEventListener("click", () => $("#goalModal").showModal());

$("#saveGoal").addEventListener("click", (event) => {
  event.preventDefault();
  const name = $("#goalName").value.trim();
  if (!name) return;
  state.athlete.goals.unshift({
    name,
    area: $("#goalArea").value,
    progress: Number($("#goalProgress").value),
  });
  $("#goalName").value = "";
  $("#goalModal").close();
  renderGoals();
  setView("progress");
});
