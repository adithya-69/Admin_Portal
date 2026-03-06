/* =======================
   INITIAL JOBS
   ======================= */
export const initialJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description:
      'We are seeking an experienced Frontend Developer to join our team. You will be responsible for building responsive web applications using modern frameworks.',
    requirements: 'React, TypeScript, 5+ years experience',
    postedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems Ltd',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description:
      'Join our backend team to build scalable APIs and microservices. Work with cutting-edge technologies in a collaborative environment.',
    requirements: 'Node.js, PostgreSQL, AWS, 3+ years experience',
    postedDate: '2024-01-18',
    status: 'active'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Creative Studios',
    location: 'Austin, TX',
    type: 'Contract',
    salary: '$80,000 - $100,000',
    description:
      'Design beautiful and intuitive user experiences for our web and mobile applications. Collaborate with developers and product managers.',
    requirements: 'Figma, User Research, Portfolio required',
    postedDate: '2024-01-20',
    status: 'active'
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'StartupHub',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    description:
      'Build end-to-end features for our SaaS platform. Work with React, Node.js, and cloud technologies.',
    requirements: 'React, Node.js, MongoDB, 4+ years experience',
    postedDate: '2024-01-22',
    status: 'active'
  }
];

/* =======================
   INITIAL USERS
   ======================= */
export const initialUsers = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    blocked: false,

    /* PROFILE MUST EXIST AND MATCH SHAPE */
    profile: {
      name: 'John Doe',
      phone: '+1 234 567 8900',
      location: 'San Francisco, CA',
      experience: '5 years',
      skills: 'React, JavaScript, CSS',

      /* RESUME MUST BE OBJECT OR NULL */
      resume: null
    }
  },

  /* =======================
     ADMIN ACCOUNT
     ======================= */
  {
    id: 2,
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    blocked: false,

    /* ADMIN DOES NOT NEED PROFILE */
    profile: null
  }
];
