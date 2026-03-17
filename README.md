# Learnify – Frontend Practice Project (HTML/CSS/JS + JSON)

This project is a beginner-to-intermediate **frontend practice app**: an online courses platform called **Learnify**.

The app currently:
- Uses **hardcoded HTML** for courses, mentors, blog, testimonials, and my courses.
- Has **incomplete / buggy JavaScript**.
- Loads data from **JSON files** (mock backend) – but many fetches are wrong or missing.

Your job is to **fix bugs** and **replace static content with dynamic rendering**.

---

## 🔧 Tech Stack

- **HTML**
- **CSS**
- **Vanilla JavaScript**
- **JSON files** (no real backend)

Open `index.html` in your browser using a simple HTTP server (recommended) or open directly in the browser (some `fetch` calls may require a server).

---

## 🧠 Learning Goals

By finishing this project, you should be comfortable with:

- Reading and understanding **existing code**.
- Using **`fetch` + JSON** with `async/await`.
- **Rendering lists** from data (courses, mentors, blog, testimonials).
- Handling **URL query parameters** (e.g. `?course=javascript`).
- Implementing **filters** in JavaScript.
- Doing basic **auth-like validation** on the frontend.
- Working with **Git branches, commits, and pull requests**.

---

## 🧩 Project Pages

- `index.html` – Home page (hero, popular courses, testimonials).
- `courses.html` – Courses list + filters.
- `course-view.html` – Single course detail page.
- `mentors.html` – Mentors list.
- `blog.html` – Blog posts.
- `login.html` – Login form (mock auth).
- `my-courses.html` – User’s enrolled courses (mock).

JavaScript:
- `js/main.js` – Shared logic for non-course pages (mentors, blog, my courses).
- `js/courses.js` – Courses list and course detail logic.
- `js/auth.js` – Login validation.
- `js/ui.js` – Loader and UI helpers.

Data (mock backend) in `data/`:
- `courses.json` – List of all courses.
- `mentors.json` – Mentors.
- `testimonials.json` – Testimonials.
- `blog.json` – Blog posts.
- `users.json` – Users for login.
- `my-courses.json` – Mock enrolled courses.
- `data/courses/*.json` – Course detail files by **slug**.

---

## 🧪 Level 1 – Cleanup & Basics

Focus: **understanding the project**, **fixing obvious issues**, and **making the UI usable**.

### 1. Fix the Loader

Current behavior:
- The loader (`#loader`) is **always visible** because `hideLoader()` is never called.

Tasks:
- Find `hideLoader()` in `js/ui.js`.
- Decide **when** to hide the loader on each page:
  - After data is finished loading (e.g. mentors, blog, courses, my-courses).
  - Immediately for pages with no async work (if any).
- Call `hideLoader()` from the appropriate functions in:
  - `js/main.js`
  - `js/courses.js`
  - `js/auth.js`

Goal: When you open any page, the loader appears briefly (if needed) and then hides.

### 2. Fix Console Errors

Current issues:
- `js/courses.js` refers to `nonExistingVariableForDebug` – this throws an error.
- There may be other errors due to wrong `fetch` paths, etc.

Tasks:
- Open DevTools → Console.
- Refresh pages and **note any red error messages**.
- Fix or remove code that is causing errors, **without breaking the learning goals**:
  - Keep intentional bugs in logic (like wrong paths or slug usage) until later tasks, but remove completely broken, non-instructional code (like the undefined variable).

### 3. Identify Hardcoded Content

Look for **hardcoded lists** that should later become dynamic:
- `index.html` – Popular courses + testimonials.
- `courses.html` – Hardcoded course cards.
- `mentors.html` – Hardcoded mentors.
- `blog.html` – Hardcoded posts.
- `my-courses.html` – Hardcoded enrolled course.

Don’t change them yet; just read and understand how they’re structured.

---

## 🚀 Level 2 – Courses List & Navigation

Focus: **dynamic list rendering** and **basic navigation**.

### 4. Load Courses from JSON

File: `js/courses.js`

Tasks:
- Fix `loadCourses()` so it:
  - Uses the correct path: `data/courses.json`.
  - Uses `async/await` with proper error handling:
    - Check `response.ok`.
    - Throw an error or show a user-friendly message on failure.
- Call `renderCourses()` with the loaded data.
- Remove or ignore hardcoded course cards in `courses.html`.

Expected result:
- `courses.html` shows all courses from `data/courses.json`.

### 5. Fix Navigation to Course Detail

Current issues:
- `renderCourses()` uses `course.id` in the URL instead of `course.slug`.
- `course-view.html` reads `?id=...` but course links use `?course=...` (or should).

Tasks:
- Update course cards so **each link uses the course slug**:
  - Example: `course-view.html?course=javascript`.
- In `course-view.html`, update the script block to:
  - Read the `course` parameter instead of `id`.
  - Pass that slug into `loadCourseDetails(slug)`.
- Do **not** fully fix `loadCourseDetails` yet; that’s a Level 3 task.

### 6. Fix the Broken Nav Link

File: `courses.html`

Task:
- There is an intentional typo in the navigation (`coursess.html`).
- Fix it so clicking “Courses” from the courses page still works.

---

## 🎯 Level 3 – Details, Filters, Auth, My Courses

Focus: **deeper data use**, **filters**, and **simple auth**.

### 7. Course Detail Page (Slug-Based)

Files:
- `course-view.html`
- `js/courses.js`
- `data/courses/*.json`

Tasks:
- Make `loadCourseDetails(slug)`:
  - Build the correct file path using slug: `data/courses/${slug}.json`.
  - Fetch the file with `async/await` and proper error handling.
  - Map JSON fields correctly:
    - `title` → `#course-title`
    - `full_description` → `#course-description`
    - `mentor` → `#course-mentor` (with prefix “Mentor: ”)
    - `duration` → `#course-duration` (with prefix “Duration: ”)
    - `level` → `#course-level` (with prefix “Level: ”)
    - `lessons` array → list items in `#course-lessons`.
- Handle the case where:
  - The slug is missing.
  - The JSON file is not found (e.g. show a friendly message).

Expected result:
- Clicking “View Details” from courses list opens a page that shows real data for that course.

### 8. Implement Filters on Courses Page

File: `js/courses.js`

Elements (in `courses.html`):
- `#filter-category` (values: `""`, `"programming"`, `"design"`).
- `#filter-type` (values: `""`, `"short"`, `"long"`).
- `#filter-registration` (values: `""`, `"open"`, `"closed"`).

Tasks:
- Fix `setupFilters(courses)`:
  - Read the correct element IDs (no more `category-filter` typo).
  - Add `change` event listeners for **all three** selects.
  - On any change, build a `filters` object and call `renderCourses(courses, filters)`.
- Ensure `renderCourses` correctly applies:
  - `category`
  - `type`
  - `registration` → uses `course.is_registration_open`.

Expected result:
- Changing any filter updates the visible list.
- When no courses match, `#courses-empty` is visible.

### 9. Fix Authentication with `users.json`

Files:
- `login.html`
- `js/auth.js`
- `data/users.json`

Tasks:
- Fix `validateLogin(email, password)`:
  - Use the correct path: `data/users.json`.
  - Use `async/await` with error handling.
- Compare the input with users in JSON:
  - Email and password must both match.
- On success:
  - Hide `#login-error`.
  - Redirect to `my-courses.html`.
  - (Optional) Save a mock “logged in user” in `localStorage`.
- On failure:
  - Show `#login-error`.

Optional extension:
- Use `localStorage` to:
  - Store `userId` or email on login.
  - Filter `my-courses.json` by `user_id` in `loadMyCourses`.

### 10. My Courses Page

Files:
- `my-courses.html`
- `js/main.js`
- `data/my-courses.json`

Tasks:
- Ensure `loadMyCourses()` fetches `data/my-courses.json` and renders:
  - Course title.
  - Progress percentage.
  - Link to `course-view.html?course=slug`.
- (Optional, advanced) Combine with logged-in user:
  - Only show courses where `user_id` matches the “logged in” user.

---

## 🧑‍🤝‍🧑 Suggested Team Split (Collaboration)

If you’re working in a team, split responsibilities:

- **Student A – Courses List**
  - `loadCourses`, `renderCourses`, `setupFilters`.
- **Student B – Course Detail**
  - Slug handling in `course-view.html` and `loadCourseDetails`.
- **Student C – Auth**
  - `validateLogin`, login flow, optional `localStorage`.
- **Student D – Other Pages**
  - Dynamic mentors, blog, testimonials, my courses.

You’ll likely touch some of the same files (e.g. `courses.js`), which is great practice for **merge conflicts**.

---

## 🌿 Git Workflow (Short Version)

1. **Clone** the repo:

```bash
git clone <REPO_URL>
cd <project-folder>
```

2. **Create a branch** for your task:

- **Feature branches**: `feature-{feature-name}`
  - Examples:
    - `feature-courses-list`
    - `feature-course-detail`
    - `feature-auth`
    - `feature-filters`
- **Bugfix branches**: `fix-{what-you-are-fixing}`
  - Examples:
    - `fix-loader-visibility`
    - `fix-course-slug-links`
    - `fix-login-fetch-path`
- **Testing / experiment branches**: `testing-{short-description}`
  - Examples:
    - `testing-new-filter-ui`
    - `testing-course-card-layout`

Create the branch using that naming pattern, for example:

```bash
git checkout -b feature-courses-list
```

3. **Work & commit**:

```bash
git status
git add .
git commit -m "Implement dynamic courses list"
```

4. **Push and open a PR**:

```bash
git push -u origin feature/courses-list
```

Then open a Pull Request on your Git platform and request a review.

5. **Sync with main** regularly:

```bash
git checkout main
git pull origin main
git checkout feature/courses-list
git merge main   # or git rebase main
```

---

## 🏠 Homework Suggestions

If this is used as homework, here are self-contained assignments:

1. **HW 1 – Loader & Errors**
   - Fix the loader on all pages.
   - Remove all console errors.
   - Turn in screenshots of:
     - Before (errors + stuck loader).
     - After (clean console + proper loader behavior).

2. **HW 2 – Dynamic Courses & Filters**
   - Make `courses.html` fully dynamic from `courses.json`.
   - Implement all three filters and slug-based links.
   - Turn in a short writeup explaining:
     - How your filter logic works.
     - How slugs connect list view to detail view.

3. **HW 3 – Detail View & Auth**
   - Finish `loadCourseDetails`.
   - Fix login to use `users.json`.
   - Make `my-courses.html` load from `my-courses.json`.
   - (Optional) Use `localStorage` to show only the logged-in user’s courses.

4. **HW 4 – Git & Collaboration (Pair/Team)**
   - Work in pairs on different features.
   - Each student:
     - Creates their own branch.
     - Opens at least one Pull Request.
     - Reviews their partner’s PR and leaves comments.
   - Turn in:
     - List of branches.
     - Link or screenshot of at least one PR with review comments.

---

## ✅ When You’re Done

You should be able to:
- Navigate through all pages without broken links.
- See **dynamic data** on:
  - Courses list.
  - Course detail.
  - Mentors.
  - Blog.
  - My Courses.
- Log in with a user from `users.json`.
- Use filters on the courses page and see them update the list.

If you want stretch goals, consider:
- Adding a **search** bar for courses.
- Showing **error messages in the UI** (not just console) when `fetch` fails.
- Storing **active filters** in the URL (e.g. `?category=programming&type=short`).

