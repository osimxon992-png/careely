import { supabase, isSupabaseConfigured } from "./supabase";

const daysAgo = (n) => new Date(Date.now() - 1000 * 60 * 60 * 24 * n).toISOString();

// Clearly labeled demo data used only when Supabase is not configured or the
// jobs table is empty. Never presented to the user as real employer data.
export const DEMO_JOBS = [
  {
    id: "demo-1",
    title: "Frontend Developer (React)",
    company_name: "Demo Tech LLC",
    location: "Tashkent, Uzbekistan",
    work_arrangement: "hybrid",
    employment_type: "full_time",
    experience_level: "mid",
    salary_min: 8000000,
    salary_max: 14000000,
    skills: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
    description:
      "We are looking for a Frontend Developer to build fast, accessible user interfaces for our products used by thousands of customers.",
    responsibilities:
      "Build and maintain React components and pages\nCollaborate with designers to turn mockups into polished UI\nWrite clean, tested and reusable code\nImprove performance and accessibility",
    qualifications:
      "2+ years of experience with React\nStrong JavaScript (ES6+) and CSS skills\nExperience consuming REST APIs\nGit and code-review workflow",
    benefits: "Hybrid schedule\nAnnual learning budget\nHealth insurance\nModern equipment",
    created_at: daysAgo(2),
  },
  {
    id: "demo-2",
    title: "Marketing Intern",
    company_name: "Demo Growth Agency",
    location: "Remote",
    work_arrangement: "remote",
    employment_type: "internship",
    experience_level: "entry",
    salary_min: null,
    salary_max: null,
    skills: ["Social Media", "Content Writing", "Canva"],
    description:
      "Join our marketing team as an intern and learn digital marketing fundamentals on real client campaigns.",
    responsibilities:
      "Help plan and publish social media content\nWrite short-form copy for campaigns\nTrack campaign metrics and prepare weekly reports",
    qualifications:
      "Student or recent graduate\nGood written Uzbek and English\nCuriosity and willingness to learn",
    benefits: "Mentorship from senior marketers\nFlexible hours\nCertificate on completion",
    is_internship: true,
    created_at: daysAgo(5),
  },
  {
    id: "demo-3",
    title: "Backend Engineer (Node.js)",
    company_name: "Demo Fintech",
    location: "Tashkent, Uzbekistan",
    work_arrangement: "on_site",
    employment_type: "full_time",
    experience_level: "senior",
    salary_min: 15000000,
    salary_max: 25000000,
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    description:
      "Design and maintain scalable backend services for our payments platform.",
    responsibilities:
      "Design reliable APIs and background services\nOwn database schema and query performance\nMentor mid-level engineers\nParticipate in on-call rotation",
    qualifications:
      "5+ years of backend experience\nDeep knowledge of PostgreSQL\nExperience with cloud infrastructure (AWS)\nUnderstanding of security best practices",
    benefits: "Competitive salary\nPerformance bonus\nPrivate health insurance",
    created_at: daysAgo(1),
  },
  {
    id: "demo-4",
    title: "UI/UX Designer",
    company_name: "Demo Studio",
    location: "Tashkent, Uzbekistan",
    work_arrangement: "hybrid",
    employment_type: "full_time",
    experience_level: "mid",
    salary_min: 9000000,
    salary_max: 15000000,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    description:
      "Shape the experience of web and mobile products from research to pixel-perfect handoff.",
    responsibilities:
      "Run user interviews and usability tests\nCreate wireframes, prototypes and final UI\nMaintain our design system in Figma",
    qualifications: "3+ years in product design\nStrong portfolio\nExcellent Figma skills",
    benefits: "Hybrid work\nConference budget\nTop-tier hardware",
    created_at: daysAgo(3),
  },
  {
    id: "demo-5",
    title: "Financial Analyst",
    company_name: "Demo Capital",
    location: "Tashkent, Uzbekistan",
    work_arrangement: "on_site",
    employment_type: "full_time",
    experience_level: "mid",
    salary_min: 10000000,
    salary_max: 16000000,
    skills: ["Excel", "Financial Modeling", "IFRS", "Power BI"],
    description:
      "Support investment decisions with financial models, reporting and market analysis.",
    responsibilities:
      "Build and maintain financial models\nPrepare monthly management reports\nAnalyze market and competitor data",
    qualifications: "Degree in Finance or Economics\n2+ years of analyst experience\nAdvanced Excel",
    benefits: "Annual bonus\nCFA/ACCA sponsorship",
    created_at: daysAgo(4),
  },
  {
    id: "demo-6",
    title: "Sales Manager (B2B)",
    company_name: "Demo Trade Group",
    location: "Samarkand, Uzbekistan",
    work_arrangement: "on_site",
    employment_type: "full_time",
    experience_level: "mid",
    salary_min: 7000000,
    salary_max: 12000000,
    skills: ["B2B Sales", "Negotiation", "CRM"],
    description:
      "Grow our corporate client base across the Samarkand region.",
    responsibilities:
      "Find and qualify new corporate clients\nNegotiate and close contracts\nKeep the CRM up to date",
    qualifications: "2+ years in B2B sales\nFluent Uzbek and Russian\nDriving license",
    benefits: "Base salary + commission\nCompany car\nMobile allowance",
    created_at: daysAgo(6),
  },
  {
    id: "demo-7",
    title: "English Teacher",
    company_name: "Demo Learning Center",
    location: "Bukhara, Uzbekistan",
    work_arrangement: "on_site",
    employment_type: "part_time",
    experience_level: "entry",
    salary_min: 4000000,
    salary_max: 6000000,
    skills: ["IELTS", "Teaching", "Communication"],
    description:
      "Teach General English and IELTS preparation courses to teenagers and adults.",
    responsibilities: "Lead group lessons\nPrepare lesson plans and materials\nTrack student progress",
    qualifications: "IELTS 7.0+ or equivalent\nTeaching experience is a plus",
    benefits: "Flexible schedule\nTeacher training program",
    created_at: daysAgo(7),
  },
  {
    id: "demo-8",
    title: "Data Analyst Intern",
    company_name: "Demo Telecom",
    location: "Tashkent, Uzbekistan",
    work_arrangement: "hybrid",
    employment_type: "internship",
    experience_level: "entry",
    salary_min: 3000000,
    salary_max: 4000000,
    skills: ["SQL", "Python", "Excel"],
    description:
      "A paid 3-month internship working with real customer data alongside our analytics team.",
    responsibilities: "Write SQL queries and build dashboards\nClean and prepare datasets\nPresent findings to the team",
    qualifications: "Final-year student in a quantitative field\nBasic SQL and Python",
    benefits: "Paid internship\nMentor assigned\nPossible full-time offer",
    is_internship: true,
    created_at: daysAgo(2),
  },
  {
    id: "demo-9",
    title: "Registered Nurse",
    company_name: "Demo Medical Clinic",
    location: "Tashkent, Uzbekistan",
    work_arrangement: "on_site",
    employment_type: "full_time",
    experience_level: "mid",
    salary_min: 6000000,
    salary_max: 9000000,
    skills: ["Patient Care", "First Aid", "Medical Records"],
    description: "Provide high-quality patient care in a modern private clinic.",
    responsibilities: "Assist doctors during examinations\nAdminister medications\nMaintain patient records",
    qualifications: "Nursing diploma\nValid license\n1+ year of clinical experience",
    benefits: "Shift allowance\nFree medical services for family",
    created_at: daysAgo(8),
  },
  {
    id: "demo-10",
    title: "Mobile Developer (Flutter)",
    company_name: "Demo Tech LLC",
    location: "Remote",
    work_arrangement: "remote",
    employment_type: "contract",
    experience_level: "senior",
    salary_min: 18000000,
    salary_max: 28000000,
    skills: ["Flutter", "Dart", "Firebase", "CI/CD"],
    description: "Lead development of our cross-platform consumer mobile app.",
    responsibilities: "Architect and build features in Flutter\nSet up release pipelines\nReview code and mentor",
    qualifications: "4+ years of mobile development\nPublished apps on App Store and Google Play",
    benefits: "Fully remote\n6-month contract with extension",
    created_at: daysAgo(1),
  },
  {
    id: "demo-11",
    title: "Civil Engineer",
    company_name: "Demo Construction",
    location: "Namangan, Uzbekistan",
    work_arrangement: "on_site",
    employment_type: "full_time",
    experience_level: "senior",
    salary_min: 12000000,
    salary_max: 18000000,
    skills: ["AutoCAD", "Project Management", "Structural Design"],
    description: "Oversee residential construction projects from design to delivery.",
    responsibilities: "Review structural drawings\nSupervise construction sites\nEnsure compliance with safety codes",
    qualifications: "Degree in Civil Engineering\n5+ years of site experience",
    benefits: "Housing allowance\nTransport provided",
    created_at: daysAgo(9),
  },
  {
    id: "demo-12",
    title: "Freelance Copywriter",
    company_name: "Demo Growth Agency",
    location: "Remote",
    work_arrangement: "remote",
    employment_type: "freelance",
    experience_level: "mid",
    salary_min: null,
    salary_max: null,
    skills: ["Copywriting", "SEO", "Uzbek", "Russian"],
    description: "Write landing pages, ads and blog posts for our clients on a per-project basis.",
    responsibilities: "Write and edit copy to brief\nOptimize content for SEO",
    qualifications: "Portfolio of published work\nExcellent Uzbek and Russian",
    benefits: "Flexible, project-based work",
    created_at: daysAgo(10),
  },
].map((job) => ({
  currency: "UZS",
  is_internship: false,
  is_demo: true,
  ...job,
}));

export async function fetchJobs(filters = {}) {
  if (!isSupabaseConfigured) {
    return { jobs: sortJobs(filterDemoJobs(filters), filters.sort), isDemo: true };
  }

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (filters.keyword) {
    query = query.ilike("title", `%${filters.keyword}%`);
  }
  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }
  if (filters.employmentType) {
    query = query.eq("employment_type", filters.employmentType);
  }
  if (filters.workArrangement) {
    query = query.eq("work_arrangement", filters.workArrangement);
  }
  if (filters.experienceLevel) {
    query = query.eq("experience_level", filters.experienceLevel);
  }
  if (filters.internshipsOnly) {
    query = query.eq("is_internship", true);
  }

  const { data, error } = await query;
  if (error || !data || data.length === 0) {
    return { jobs: sortJobs(filterDemoJobs(filters), filters.sort), isDemo: true };
  }
  return { jobs: sortJobs(data, filters.sort), isDemo: false };
}

export async function fetchJobById(id) {
  if (isSupabaseConfigured && !String(id).startsWith("demo-")) {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();
    if (!error && data) return { job: data, isDemo: false };
  }
  return {
    job: DEMO_JOBS.find((j) => j.id === id) ?? null,
    isDemo: true,
  };
}

// Groups the given jobs by company so the Companies page can be built from
// whatever job data is available (real or demo).
export function groupByCompany(jobs) {
  const map = new Map();
  for (const job of jobs) {
    const entry = map.get(job.company_name) ?? {
      name: job.company_name,
      locations: new Set(),
      jobs: [],
    };
    entry.locations.add(job.location);
    entry.jobs.push(job);
    map.set(job.company_name, entry);
  }
  return [...map.values()]
    .map((c) => ({ ...c, locations: [...c.locations] }))
    .sort((a, b) => b.jobs.length - a.jobs.length);
}

function sortJobs(jobs, sort) {
  const list = [...jobs];
  if (sort === "salary") {
    list.sort((a, b) => (b.salary_max ?? b.salary_min ?? 0) - (a.salary_max ?? a.salary_min ?? 0));
  } else {
    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  return list;
}

function filterDemoJobs(filters) {
  const keyword = filters.keyword?.toLowerCase();
  return DEMO_JOBS.filter((job) => {
    if (
      keyword &&
      ![job.title, job.company_name, ...(job.skills || [])].some((s) =>
        s.toLowerCase().includes(keyword)
      )
    )
      return false;
    if (
      filters.location &&
      !job.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    if (filters.employmentType && job.employment_type !== filters.employmentType)
      return false;
    if (filters.workArrangement && job.work_arrangement !== filters.workArrangement)
      return false;
    if (filters.experienceLevel && job.experience_level !== filters.experienceLevel)
      return false;
    if (filters.internshipsOnly && !job.is_internship) return false;
    return true;
  });
}
