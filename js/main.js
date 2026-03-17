// Main shared logic for non-course pages

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');

  // INTENTIONAL BUG: loader is never hidden here
  // Students should call hideLoader() at the right time.

  if (page === 'home') {
    loadHomeData();
  } else if (page === 'mentors') {
    loadMentors();
  } else if (page === 'blog') {
    loadBlog();
  } else if (page === 'my-courses') {
    loadMyCourses();
  }
});

async function loadHomeData() {
  // Students can optionally load testimonials from JSON later.
  // For now, this is intentionally left as a no-op.
}

async function loadMentors() {
  const list = document.getElementById('mentors-list');
  if (!list) return;

  try {
    // INTENTIONAL BUG: incorrect path (missing "s" in mentors.json)
    const response = await fetch('data/mentor.json');
    if (!response.ok) {
      throw new Error('Failed to load mentors');
    }
    const mentors = await response.json();

    list.innerHTML = '';
    for (const mentor of mentors) {
      const article = document.createElement('article');
      article.className = 'mentor-card';
      article.innerHTML = `
        <h3>${mentor.name}</h3>
        <p>${mentor.title}</p>
      `;
      list.appendChild(article);
    }
    // Students should hide loader here.
  } catch (error) {
    console.error(error);
  }
}

async function loadBlog() {
  const list = document.getElementById('blog-list');
  if (!list) return;

  try {
    const response = await fetch('data/blog.json');
    if (!response.ok) {
      throw new Error('Failed to load blog posts');
    }
    const posts = await response.json();
    list.innerHTML = '';

    posts.forEach((post) => {
      const article = document.createElement('article');
      article.className = 'blog-post';
      article.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
      `;
      list.appendChild(article);
    });

    // Students should hide loader here.
  } catch (error) {
    console.error(error);
  }
}

async function loadMyCourses() {
  const list = document.getElementById('my-courses-list');
  if (!list) return;

  try {
    const response = await fetch('data/my-courses.json');
    if (!response.ok) {
      throw new Error('Failed to load my courses');
    }
    const myCourses = await response.json();

    list.innerHTML = '';

    myCourses.forEach((course) => {
      const article = document.createElement('article');
      article.className = 'course-card';
      article.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.progress}% complete</p>
        <a href="course-view.html?course=${course.slug}" class="btn-link">
          Continue
        </a>
      `;
      list.appendChild(article);
    });

    // Students should hide loader here.
  } catch (error) {
    console.error(error);
  }
}

