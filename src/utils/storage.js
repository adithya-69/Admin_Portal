/* ===============================
   LOCAL STORAGE UTILITIES
   =============================== */
export const storage = {
  /* ---------- JOBS ---------- */
  getJobs() {
    try {
      const jobs = localStorage.getItem('jobs');
      return jobs ? JSON.parse(jobs) : null;
    } catch {
      return null;
    }
  },

  setJobs(jobs) {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  },

  /* ---------- USERS ---------- */
  getUsers() {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : null;
    } catch {
      return null;
    }
  },

  setUsers(users) {
    if (!Array.isArray(users)) return;

    /* ✅ ENSURE ADMIN IS NEVER REMOVED */
    const adminExists = users.some(u => u.role === 'admin');

    if (!adminExists) {
      users.push({
        id: Date.now(),
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
        blocked: false,
        profile: null
      });
    }

    localStorage.setItem('users', JSON.stringify(users));
  },

  /* ---------- APPLICATIONS ---------- */
  getApplications() {
    try {
      const apps = localStorage.getItem('applications');
      return apps ? JSON.parse(apps) : [];
    } catch {
      return [];
    }
  },

  setApplications(apps) {
    localStorage.setItem('applications', JSON.stringify(apps));
  },

  /* ---------- CURRENT USER ---------- */
  getCurrentUser() {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },

  /* ---------- FULL RESET (OPTIONAL) ---------- */
  clearAll() {
    localStorage.removeItem('jobs');
    localStorage.removeItem('users');
    localStorage.removeItem('applications');
    localStorage.removeItem('currentUser');
  }
};
