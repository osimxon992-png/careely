// Editorial career guides. General advice written for the platform — not
// attributed to any real person or organization.
export const ARTICLES = [
  {
    slug: "write-a-resume-that-gets-interviews",
    category: "Resume",
    title: "How to write a resume that gets interviews",
    excerpt:
      "Recruiters skim a resume in seconds. Here's how to structure yours so the important parts are impossible to miss.",
    readMinutes: 6,
    sections: [
      {
        heading: "Lead with impact, not duties",
        body: "Instead of listing what you were responsible for, describe what changed because of your work. \"Reduced page load time by 40%\" says far more than \"Worked on website performance\". Start each bullet with a strong verb and, wherever possible, add a number.",
      },
      {
        heading: "Tailor it to every application",
        body: "Read the job description carefully and mirror its key skills and terminology where they truthfully apply to you. Many employers use applicant tracking systems that filter by keywords, and a human reader will also notice a resume that clearly matches the role.",
      },
      {
        heading: "Keep the layout simple",
        body: "One or two pages, a clean single-column layout, consistent dates and clear section headings: Summary, Experience, Education, Skills. Avoid tables, images of text and unusual fonts, which often break automated parsing.",
      },
      {
        heading: "Proofread — then ask someone else to",
        body: "Typos are one of the most common reasons strong candidates are rejected. Read your resume aloud, check every date and link, and ask a friend to review it with fresh eyes.",
      },
    ],
  },
  {
    slug: "prepare-for-a-job-interview",
    category: "Interview",
    title: "A step-by-step plan to prepare for any interview",
    excerpt:
      "Good interviews are rarely improvised. Use this checklist in the days before your next one.",
    readMinutes: 7,
    sections: [
      {
        heading: "Research the company",
        body: "Understand what the company does, who its customers are and what's happening in its industry. Look at its website, recent news and the job description again. Prepare two or three thoughtful questions to ask at the end.",
      },
      {
        heading: "Use the STAR method",
        body: "For behavioral questions (\"Tell me about a time when…\"), structure your answers as Situation, Task, Action, Result. Prepare five or six stories from your experience that you can adapt to different questions.",
      },
      {
        heading: "Practice out loud",
        body: "Rehearse your introduction and key stories out loud, ideally with a friend or by recording yourself. You'll notice filler words and long-winded answers you'd never catch in your head.",
      },
      {
        heading: "Handle the logistics early",
        body: "Confirm the time, format and location the day before. For online interviews, test your camera, microphone and connection, and choose a quiet, well-lit spot.",
      },
    ],
  },
  {
    slug: "landing-your-first-internship",
    category: "Students",
    title: "Landing your first internship with no experience",
    excerpt:
      "Everyone starts somewhere. Here's how students can stand out before they have a long work history.",
    readMinutes: 5,
    sections: [
      {
        heading: "Show what you've built",
        body: "Course projects, volunteer work, student clubs and personal projects all count. Describe them like jobs: what was the goal, what did you do, and what was the result?",
      },
      {
        heading: "Apply early and widely",
        body: "Many internships are filled months before they start. Make a list of target companies, set reminders and apply consistently rather than waiting for the perfect role.",
      },
      {
        heading: "Write a short, specific cover letter",
        body: "Three paragraphs are enough: why this company, what you can contribute, and a clear closing. Mention one concrete thing about the company that genuinely interests you.",
      },
    ],
  },
  {
    slug: "negotiating-your-salary",
    category: "Salary",
    title: "How to negotiate your salary with confidence",
    excerpt:
      "Negotiation is a normal part of hiring. A little preparation can make a meaningful difference.",
    readMinutes: 6,
    sections: [
      {
        heading: "Know your range",
        body: "Look at salaries for similar roles in your city and industry, and consider your experience level. Decide on a realistic target and a minimum you'd accept before the conversation starts.",
      },
      {
        heading: "Let them make the first offer when possible",
        body: "If asked for your expectations early, you can say you'd like to learn more about the role first, or give a researched range rather than a single number.",
      },
      {
        heading: "Think beyond base salary",
        body: "Bonuses, remote work, training budgets, health insurance and extra vacation days can all be part of the conversation if the base salary is fixed.",
      },
    ],
  },
  {
    slug: "build-a-strong-online-profile",
    category: "Personal brand",
    title: "Building a strong professional profile online",
    excerpt:
      "Employers often look you up before inviting you to interview. Make sure they find something good.",
    readMinutes: 4,
    sections: [
      {
        heading: "Write a clear headline",
        body: "Your headline should say what you do and what you're looking for, e.g. \"Frontend Developer · React · Open to hybrid roles in Tashkent\".",
      },
      {
        heading: "Show your work",
        body: "Link to a portfolio, GitHub profile or case studies. Even two or three well-presented projects are more convincing than a long list of skills.",
      },
      {
        heading: "Keep it current",
        body: "Update your profile whenever you finish a project, learn a new skill or change roles, so it's ready when an opportunity appears.",
      },
    ],
  },
  {
    slug: "switching-careers",
    category: "Career growth",
    title: "Switching careers: a practical roadmap",
    excerpt:
      "Changing fields is easier when you break it into small, deliberate steps.",
    readMinutes: 6,
    sections: [
      {
        heading: "Find your transferable skills",
        body: "Communication, project management, analysis and customer focus are valued almost everywhere. Map what you already do well to what the new field needs.",
      },
      {
        heading: "Fill the gaps deliberately",
        body: "Identify the two or three skills you're missing most and focus on them through online courses, side projects or volunteering.",
      },
      {
        heading: "Start with adjacent roles",
        body: "A role that combines your existing experience with the new field — for example, moving from sales into a product role at the same type of company — is often the smoothest bridge.",
      },
    ],
  },
];

export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug) ?? null;
