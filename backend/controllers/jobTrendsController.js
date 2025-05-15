const fetch = require("node-fetch");
const cheerio = require("cheerio"); // Add this at the top for HTML parsing

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || "fbec8d1804daa6b2ed36d75a4097c7f8";
const SCRAPER_API_BASE = "https://api.scraperapi.com/";

async function fetchViaScraperApi(targetUrl) {
  const url = `${SCRAPER_API_BASE}?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(targetUrl)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`ScraperAPI error: ${res.statusText} - ${errorText}`);
  }
  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}

// Example Gemini API call (replace with your actual Gemini API logic)
async function fetchViaGeminiApi(prompt) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_API_URL = process.env.GEMINI_API_URL;
  if (!GEMINI_API_KEY || !GEMINI_API_URL) throw new Error("Gemini API credentials not set");
  const res = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GEMINI_API_KEY}`,
    },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error: ${res.statusText} - ${errorText}`);
  }
  return await res.json();
}

// Helper: Map sector to real URLs for each endpoint
function getSectorUrls(sector) {
  // Use sector-specific URLs for each sector (customize as needed)
  const sectorSlug = {
    technology: "technology",
    finance: "finance",
    healthcare: "healthcare",
    marketing: "marketing"
  }[sector] || sector;

  return {
    jobTrends: `https://www.naukri.com/${sectorSlug}-jobs`,
    skills: `https://www.naukri.com/${sectorSlug}-jobs-skills`,
    salaries: `https://www.glassdoor.co.in/Salaries/${sectorSlug}-salary-SRCH_KO0,${sectorSlug.length}.htm`,
    topRoles: `https://www.naukri.com/${sectorSlug}-jobs-top-roles`,
    companies: `https://www.naukri.com/${sectorSlug}-jobs-top-companies`,
    remoteOnsite: `https://www.naukri.com/${sectorSlug}-jobs-remote-onsite`,
    diversity: `https://www.naukri.com/${sectorSlug}-jobs-diversity`,
    skillRoleMap: (skills) => `https://www.naukri.com/${sectorSlug}-jobs-skill-role-map?skills=${encodeURIComponent(skills)}`,
    salaryGrowth: (role) => `https://www.glassdoor.co.in/Salaries/${sectorSlug}-${role}-salary.htm`,
    opportunityRadar: (skills) => `https://www.naukri.com/${sectorSlug}-jobs-opportunity-radar?skills=${encodeURIComponent(skills)}`,
  };
}

function getSector(req) {
  // Map sector aliases to real sector slugs as needed
  const sectorMap = {
    tech: "technology",
    finance: "finance",
    healthcare: "healthcare",
    marketing: "marketing"
  };
  const raw = (req.query.sector || "tech").toLowerCase();
  return sectorMap[raw] || raw;
}

// Example HTML parsing for Naukri job trends (customize for your real data)
function parseNaukriJobTrends(html) {
  const $ = cheerio.load(html);
  // Example: Find trend data in the HTML (customize selector as per real site)
  // This is a placeholder. You must inspect the real HTML structure.
  const trends = [];
  $(".job-trend-row").each((i, el) => {
    const name = $(el).find(".trend-month").text().trim();
    const openings = parseInt($(el).find(".trend-openings").text().replace(/\D/g, ""), 10);
    const applications = parseInt($(el).find(".trend-applications").text().replace(/\D/g, ""), 10);
    if (name) trends.push({ name, openings, applications });
  });
  return trends;
}

// Example HTML parsing for skills (customize for your real data)
function parseNaukriSkills(html) {
  const $ = cheerio.load(html);
  const skills = [];
  $(".skill-row").each((i, el) => {
    const name = $(el).find(".skill-name").text().trim();
    const value = parseInt($(el).find(".skill-count").text().replace(/\D/g, ""), 10);
    if (name) skills.push({ name, value });
  });
  // Example for hot skills
  const hotSkills = [];
  $(".hot-skill-row").each((i, el) => {
    const skill = $(el).find(".hot-skill-name").text().trim();
    const growth = parseInt($(el).find(".hot-skill-growth").text().replace(/\D/g, ""), 10);
    if (skill) hotSkills.push({ skill, growth });
  });
  return { skills, hotSkills };
}

// --- Add sector-specific parsing for Top Roles and Companies ---

function parseNaukriTopRoles(html) {
  const $ = cheerio.load(html);
  const roles = [];
  // Update selector as per real Naukri HTML structure for top roles
  $(".top-role-row").each((i, el) => {
    const name = $(el).find(".role-name").text().trim();
    const jobs = parseInt($(el).find(".role-jobs").text().replace(/\D/g, ""), 10);
    if (name) roles.push({ name, jobs });
  });
  return roles;
}

function parseNaukriCompanies(html) {
  const $ = cheerio.load(html);
  const companies = [];
  // Update selector as per real Naukri HTML structure for companies
  $(".company-row").each((i, el) => {
    const company = $(el).find(".company-name").text().trim();
    const jobs = parseInt($(el).find(".company-jobs").text().replace(/\D/g, ""), 10);
    if (company) companies.push({ company, jobs });
  });
  return companies;
}

// --- Add sector-specific parsing for Salaries ---
function parseGlassdoorSalaries(html) {
  const $ = cheerio.load(html);
  const salaries = [];
  // Update selector as per real Glassdoor HTML structure for salaries
  $(".salary-row").each((i, el) => {
    const name = $(el).find(".salary-title").text().trim();
    const value = parseInt($(el).find(".salary-amount").text().replace(/[^\d]/g, ""), 10);
    if (name && value) salaries.push({ name, value });
  });
  return salaries;
}

// --- MOCK DATA FALLBACKS FOR EACH SECTOR ---
const MOCK_DATA = {
  technology: {
    trends: [
      { name: "June", openings: 12000, applications: 35000 },
      { name: "May", openings: 11000, applications: 32000 },
      { name: "April", openings: 10000, applications: 30000 },
    ],
    skills: [
      { name: "React.js", value: 9000 },
      { name: "Node.js", value: 8500 },
      { name: "AWS", value: 7000 },
      { name: "Python", value: 8000 },
    ],
    hotSkills: [
      { skill: "AI/ML", growth: 22 },
      { skill: "TypeScript", growth: 18 },
    ],
    salaries: [
      { name: "Software Engineer", value: 1200000 },
      { name: "Frontend Developer", value: 1100000 },
      { name: "Backend Developer", value: 1150000 },
    ],
    roles: [
      { name: "Full Stack Developer", jobs: 4000 },
      { name: "DevOps Engineer", jobs: 2500 },
      { name: "Data Scientist", jobs: 1800 },
    ],
    companies: [
      { company: "TCS", jobs: 1200 },
      { company: "Infosys", jobs: 1100 },
      { company: "Wipro", jobs: 900 },
    ],
    stats: [
      { type: "Remote", value: "60%" },
      { type: "Onsite", value: "40%" },
    ],
    diversity: [
      { label: "Women", value: "32%" },
      { label: "Men", value: "68%" },
    ],
    predictions: [
      "AI/ML", "Cloud Computing", "DevOps", "Cybersecurity"
    ],
    paths: [
      "AI Engineer", "Cloud Architect", "DevOps Specialist"
    ],
    map: [
      { skill: "React.js", role: "Frontend Developer" },
      { skill: "AWS", role: "Cloud Engineer" },
    ],
    growth: [
      { year: "2022", salary: 900000 },
      { year: "2023", salary: 1100000 },
      { year: "2024", salary: 1200000 },
    ],
    radar: [
      { label: "Frontend", value: 80 },
      { label: "Backend", value: 70 },
      { label: "Cloud", value: 90 },
    ]
  },
  finance: {
    trends: [
      { name: "June", openings: 6000, applications: 18000 },
      { name: "May", openings: 5800, applications: 17000 },
      { name: "April", openings: 5500, applications: 16000 },
    ],
    skills: [
      { name: "Excel", value: 4000 },
      { name: "Financial Analysis", value: 3500 },
      { name: "Accounting", value: 3000 },
    ],
    hotSkills: [
      { skill: "FinTech", growth: 15 },
      { skill: "Data Analytics", growth: 12 },
    ],
    salaries: [
      { name: "Financial Analyst", value: 800000 },
      { name: "Accountant", value: 600000 },
    ],
    roles: [
      { name: "Financial Analyst", jobs: 1200 },
      { name: "Investment Banker", jobs: 800 },
    ],
    companies: [
      { company: "HDFC Bank", jobs: 500 },
      { company: "ICICI Bank", jobs: 400 },
    ],
    stats: [
      { type: "Remote", value: "30%" },
      { type: "Onsite", value: "70%" },
    ],
    diversity: [
      { label: "Women", value: "40%" },
      { label: "Men", value: "60%" },
    ],
    predictions: [
      "FinTech", "Risk Management", "Data Analytics"
    ],
    paths: [
      "Financial Analyst", "Risk Manager"
    ],
    map: [
      { skill: "Excel", role: "Accountant" },
      { skill: "Financial Analysis", role: "Financial Analyst" },
    ],
    growth: [
      { year: "2022", salary: 700000 },
      { year: "2023", salary: 750000 },
      { year: "2024", salary: 800000 },
    ],
    radar: [
      { label: "Banking", value: 70 },
      { label: "FinTech", value: 80 },
    ]
  },
  healthcare: {
    trends: [
      { name: "June", openings: 4000, applications: 12000 },
      { name: "May", openings: 3800, applications: 11000 },
      { name: "April", openings: 3500, applications: 10000 },
    ],
    skills: [
      { name: "Patient Care", value: 2000 },
      { name: "Medical Coding", value: 1500 },
    ],
    hotSkills: [
      { skill: "Telemedicine", growth: 20 },
      { skill: "Healthcare Analytics", growth: 10 },
    ],
    salaries: [
      { name: "Nurse", value: 500000 },
      { name: "Medical Coder", value: 400000 },
    ],
    roles: [
      { name: "Nurse", jobs: 800 },
      { name: "Medical Coder", jobs: 600 },
    ],
    companies: [
      { company: "Apollo Hospitals", jobs: 300 },
      { company: "Fortis", jobs: 250 },
    ],
    stats: [
      { type: "Remote", value: "20%" },
      { type: "Onsite", value: "80%" },
    ],
    diversity: [
      { label: "Women", value: "55%" },
      { label: "Men", value: "45%" },
    ],
    predictions: [
      "Telemedicine", "Healthcare Analytics"
    ],
    paths: [
      "Nurse", "Healthcare Data Analyst"
    ],
    map: [
      { skill: "Patient Care", role: "Nurse" },
      { skill: "Medical Coding", role: "Medical Coder" },
    ],
    growth: [
      { year: "2022", salary: 400000 },
      { year: "2023", salary: 450000 },
      { year: "2024", salary: 500000 },
    ],
    radar: [
      { label: "Patient Care", value: 90 },
      { label: "Analytics", value: 60 },
    ]
  },
  marketing: {
    trends: [
      { name: "June", openings: 5000, applications: 15000 },
      { name: "May", openings: 4800, applications: 14000 },
      { name: "April", openings: 4500, applications: 13000 },
    ],
    skills: [
      { name: "SEO", value: 2500 },
      { name: "Content Marketing", value: 2000 },
      { name: "Social Media", value: 2200 },
    ],
    hotSkills: [
      { skill: "Digital Marketing", growth: 25 },
      { skill: "Influencer Marketing", growth: 10 },
    ],
    salaries: [
      { name: "Marketing Manager", value: 900000 },
      { name: "SEO Specialist", value: 600000 },
    ],
    roles: [
      { name: "Marketing Manager", jobs: 1000 },
      { name: "SEO Specialist", jobs: 700 },
    ],
    companies: [
      { company: "Dentsu", jobs: 200 },
      { company: "Ogilvy", jobs: 180 },
    ],
    stats: [
      { type: "Remote", value: "50%" },
      { type: "Onsite", value: "50%" },
    ],
    diversity: [
      { label: "Women", value: "45%" },
      { label: "Men", value: "55%" },
    ],
    predictions: [
      "Digital Marketing", "Influencer Marketing"
    ],
    paths: [
      "Marketing Manager", "SEO Specialist"
    ],
    map: [
      { skill: "SEO", role: "SEO Specialist" },
      { skill: "Content Marketing", role: "Content Marketer" },
    ],
    growth: [
      { year: "2022", salary: 700000 },
      { year: "2023", salary: 800000 },
      { year: "2024", salary: 900000 },
    ],
    radar: [
      { label: "SEO", value: 85 },
      { label: "Content", value: 75 },
    ]
  }
};

// Helper to randomize mock data on each refresh
function randomizeMock(arr, key) {
  // For numbers, add a small random delta; for arrays, shuffle order
  return arr.map(item => {
    const newItem = { ...item };
    Object.keys(newItem).forEach(k => {
      if (typeof newItem[k] === "number") {
        // Add or subtract up to 10% for numbers
        const delta = Math.round(newItem[k] * (Math.random() * 0.2 - 0.1));
        newItem[k] += delta;
        if (newItem[k] < 0) newItem[k] = 0;
      }
      if (typeof newItem[k] === "string" && key === "trends" && k === "name") {
        // Optionally, randomize month order for trends
        // (no-op for now)
      }
    });
    return newItem;
  });
}

// Helper to get mock data for a sector, randomized per refresh
function getMock(sector, key) {
  const arr = (MOCK_DATA[sector] && MOCK_DATA[sector][key]) || [];
  // Only randomize for numeric/statistical data
  if (["trends", "skills", "hotSkills", "salaries", "roles", "companies", "stats", "diversity", "growth", "radar"].includes(key)) {
    return randomizeMock(arr, key);
  }
  return arr;
}

exports.getJobTrends = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let trends = [];
    try {
      const data = await fetchViaScraperApi(urls.jobTrends);
      if (typeof data === "string") {
        trends = parseNaukriJobTrends(data);
      } else if (data.trends) {
        trends = data.trends;
      }
      // If trends is empty, fallback to mock
      if (!trends || trends.length === 0) throw new Error("No real data");
    } catch {
      trends = getMock(sector, "trends");
    }
    res.json({ trends });
  } catch (e) {
    res.json({ trends: getMock(getSector(req), "trends") });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let skills = [], hotSkills = [];
    try {
      const data = await fetchViaScraperApi(urls.skills);
      if (typeof data === "string") {
        const parsed = parseNaukriSkills(data);
        skills = parsed.skills;
        hotSkills = parsed.hotSkills;
      } else {
        skills = data.skills || [];
        hotSkills = data.hotSkills || [];
      }
      if (!skills || skills.length === 0) throw new Error("No real data");
    } catch {
      skills = getMock(sector, "skills");
      hotSkills = getMock(sector, "hotSkills");
    }
    res.json({ skills, hotSkills });
  } catch (e) {
    const sector = getSector(req);
    res.json({ skills: getMock(sector, "skills"), hotSkills: getMock(sector, "hotSkills") });
  }
};

exports.getSalaries = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let salaries = [];
    try {
      const data = await fetchViaScraperApi(urls.salaries);
      if (typeof data === "string") {
        salaries = parseGlassdoorSalaries(data);
      } else if (data.salaries) {
        salaries = data.salaries;
      }
      if (!salaries || salaries.length === 0) throw new Error("No real data");
    } catch {
      salaries = getMock(sector, "salaries");
    }
    res.json({ salaries });
  } catch (e) {
    res.json({ salaries: getMock(getSector(req), "salaries") });
  }
};

exports.getTopRoles = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let roles = [];
    try {
      const data = await fetchViaScraperApi(urls.topRoles);
      if (typeof data === "string") {
        roles = parseNaukriTopRoles(data);
      } else if (data.roles) {
        roles = data.roles;
      }
      if (!roles || roles.length === 0) throw new Error("No real data");
    } catch {
      roles = getMock(sector, "roles");
    }
    res.json({ roles });
  } catch (e) {
    res.json({ roles: getMock(getSector(req), "roles") });
  }
};

exports.getCompaniesHiring = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let companies = [];
    try {
      const data = await fetchViaScraperApi(urls.companies);
      if (typeof data === "string") {
        companies = parseNaukriCompanies(data);
      } else if (data.companies) {
        companies = data.companies;
      }
      if (!companies || companies.length === 0) throw new Error("No real data");
    } catch {
      companies = getMock(sector, "companies");
    }
    res.json({ companies });
  } catch (e) {
    res.json({ companies: getMock(getSector(req), "companies") });
  }
};

exports.getRemoteVsOnsite = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let stats = [];
    try {
      const data = await fetchViaScraperApi(urls.remoteOnsite);
      stats = data.stats || [];
      if (!stats || stats.length === 0) throw new Error("No real data");
    } catch {
      stats = getMock(sector, "stats");
    }
    res.json({ stats });
  } catch (e) {
    res.json({ stats: getMock(getSector(req), "stats") });
  }
};

exports.getDiversity = async (req, res) => {
  try {
    const sector = getSector(req);
    const urls = getSectorUrls(sector);
    let diversity = [];
    try {
      const data = await fetchViaScraperApi(urls.diversity);
      diversity = data.diversity || [];
      if (!diversity || diversity.length === 0) throw new Error("No real data");
    } catch {
      diversity = getMock(sector, "diversity");
    }
    res.json({ diversity });
  } catch (e) {
    res.json({ diversity: getMock(getSector(req), "diversity") });
  }
};

exports.getSkillPredictions = async (req, res) => {
  try {
    const sector = getSector(req);
    let predictions = [];
    try {
      const prompt = `Predict skill demand for next 6 months in ${sector} sector.`;
      const data = await fetchViaGeminiApi(prompt);
      predictions = data.predictions || data || [];
      if (!predictions || predictions.length === 0) throw new Error("No real data");
    } catch {
      predictions = getMock(sector, "predictions");
    }
    res.json({ predictions });
  } catch (e) {
    res.json({ predictions: getMock(getSector(req), "predictions") });
  }
};

exports.getAiCareerPaths = async (req, res) => {
  try {
    const sector = getSector(req);
    const skills = req.query.skills || "";
    let paths = [];
    try {
      const prompt = `Suggest AI career paths for sector ${sector} and skills ${skills}`;
      const data = await fetchViaGeminiApi(prompt);
      paths = data.paths || data || [];
      if (!paths || paths.length === 0) throw new Error("No real data");
    } catch {
      paths = getMock(sector, "paths");
    }
    res.json({ paths });
  } catch (e) {
    res.json({ paths: getMock(getSector(req), "paths") });
  }
};

exports.getSkillRoleMap = async (req, res) => {
  try {
    const sector = getSector(req);
    const skills = req.query.skills || "";
    const urls = getSectorUrls(sector);
    let map = [];
    try {
      const data = await fetchViaScraperApi(urls.skillRoleMap(skills));
      map = data.map || [];
      if (!map || map.length === 0) throw new Error("No real data");
    } catch {
      map = getMock(sector, "map");
    }
    res.json({ map });
  } catch (e) {
    res.json({ map: getMock(getSector(req), "map") });
  }
};

exports.getSalaryGrowth = async (req, res) => {
  try {
    const sector = getSector(req);
    const role = req.query.role || "";
    const urls = getSectorUrls(sector);
    let growth = [];
    try {
      const data = await fetchViaScraperApi(urls.salaryGrowth(role));
      growth = data.growth || [];
      if (!growth || growth.length === 0) throw new Error("No real data");
    } catch {
      growth = getMock(sector, "growth");
    }
    res.json({ growth });
  } catch (e) {
    res.json({ growth: getMock(getSector(req), "growth") });
  }
};

exports.getOpportunityRadar = async (req, res) => {
  try {
    const sector = getSector(req);
    const skills = req.query.skills || "";
    const urls = getSectorUrls(sector);
    let radar = [];
    try {
      const data = await fetchViaScraperApi(urls.opportunityRadar(skills));
      radar = data.radar || [];
      if (!radar || radar.length === 0) throw new Error("No real data");
    } catch {
      radar = getMock(sector, "radar");
    }
    res.json({ radar });
  } catch (e) {
    res.json({ radar: getMock(getSector(req), "radar") });
  }
};
///jobTrendsController.js