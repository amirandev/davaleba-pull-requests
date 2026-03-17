// Course list and details logic

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');

  if (page === 'courses') {
    initCoursesPage();
  }
  // For course-view page, a script tag in course-view.html
  // tries to call loadCourseDetails() directly.
});

async function initCoursesPage() {
  try {
    const courses = await loadCourses();
    // INTENTIONAL BUG: filters are not wired correctly
    setupFilters(courses);
    renderCourses(courses);
    // Students should hide loader here.
  } catch (error) {
    console.error('Error loading courses:', error);
  }
}

// INTENTIONAL BUG: fetch path is slightly wrong
async function loadCourses() {
  const response = await fetch('./data/courses-data.json');
  if (!response.ok) {
    throw new Error('Could not load courses.json');
  }
  const data = await response.json();
  return data;
}

// Students must make this work with filters
function renderCourses(courses, filters) {
  const list = document.getElementById('courses-list');
  const empty = document.getElementById('courses-empty');
  if (!list) return;

  let filtered = courses;

  if (filters) {
    filtered = courses.filter((course) => {
      let ok = true;
      if (filters.category && course.category !== filters.category) {
        ok = false;
      }
      if (filters.type && course.type !== filters.type) {
        ok = false;
      }
      if (filters.registration === 'open' && course.is_registration_open !== true) {
        ok = false;
      }
      if (filters.registration === 'closed' && course.is_registration_open !== false) {
        ok = false;
      }
      return ok;
    });
  }

  list.innerHTML = '';

  filtered.forEach((course) => {
    const article = document.createElement('article');
    article.className = 'course-card';
    article.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.short_description}</p>
      <div>
        <span class="badge badge-category">${course.category}</span>
        <span class="badge badge-type">${course.type}</span>
      </div>
      <!-- INTENTIONAL BUG: using course.id instead of slug -->
      <a href="course-view.html?course=${course.id}" class="btn-link">
        View Details
      </a>
    `;
    list.appendChild(article);
  });

  if (empty) {
    empty.hidden = filtered.length > 0;
  }
}

// INTENTIONAL BUG: event handlers not set correctly
function setupFilters(courses) {
  const categorySelect = document.getElementById('filter-category');
  const typeSelect = document.getElementById('filter-type');
  const registrationSelect = document.getElementById('filter-registration');

  if (!categorySelect || !typeSelect || !registrationSelect) {
    return;
  }

  function applyFilters() {
    const filters = {
      // INTENTIONAL BUG: category is read from wrong element id
      category: document.getElementById('category-filter')?.value || '',
      type: typeSelect.value,
      registration: registrationSelect.value,
    };
    renderCourses(courses, filters);
  }

  // Only one filter wired up; others ignored
  categorySelect.addEventListener('change', applyFilters);
  // Students must fix and add listeners for the rest.
}

// Course detail loader (students must complete / fix)
async function loadCourseDetails(slug) {
  if (!slug) {
    console.error('Missing course slug');
    return;
  }

  const titleEl = document.getElementById('course-title');
  const descEl = document.getElementById('course-description');
  const mentorEl = document.getElementById('course-mentor');
  const durationEl = document.getElementById('course-duration');
  const levelEl = document.getElementById('course-level');
  const lessonsEl = document.getElementById('course-lessons');

  try {
    // INTENTIONAL BUG: path does not use slug
    const response = await fetch('data/courses/javascript.json');
    if (!response.ok) {
      throw new Error('Failed to load course detail');
    }
    const detail = await response.json();

    // Students must map all fields correctly
    titleEl.textContent = detail.name; // wrong property
    descEl.textContent = detail.description; // wrong property
    mentorEl.textContent = 'Mentor: ' + detail.mentor;
    durationEl.textContent = 'Duration: ' + detail.duration;
    levelEl.textContent = 'Level: ' + detail.level;

    lessonsEl.innerHTML = '';
    detail.lessons.forEach((lesson) => {
      const li = document.createElement('li');
      li.textContent = lesson;
      lessonsEl.appendChild(li);
    });

    // Students should hide loader here.
  } catch (error) {
    console.error(error);
  }
}

// INTENTIONAL CONSOLE ERROR: reference to undefined variable
// Students must remove or fix this.
console.log(nonExistingVariableForDebug);

