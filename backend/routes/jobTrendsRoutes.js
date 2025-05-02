const express = require("express");
const router = express.Router();
const jobTrendsController = require("../controllers/jobTrendsController");

// 1. Job Market Trends
router.get("/job-trends", jobTrendsController.getJobTrends);
// 2. Skills & Hot Skills
router.get("/skills", jobTrendsController.getSkills);
// 3. Salaries
router.get("/salaries", jobTrendsController.getSalaries);
// 4. Top Roles
router.get("/top-roles", jobTrendsController.getTopRoles);
// 5. Companies Hiring
router.get("/companies-hiring", jobTrendsController.getCompaniesHiring);
// 6. Remote vs Onsite
router.get("/remote-onsite", jobTrendsController.getRemoteVsOnsite);
// 7. Diversity
router.get("/diversity", jobTrendsController.getDiversity);
// 8. Skill Predictions
router.get("/skill-predictions", jobTrendsController.getSkillPredictions);
// 9. Future Trends
// router.get("/future-trends", jobTrendsController.getFuturePredictions);
// 10. AI Career Paths
router.get("/ai-career-paths", jobTrendsController.getAiCareerPaths);
// 11. Skill-to-Role Map
router.get("/skill-role-map", jobTrendsController.getSkillRoleMap);
// 12. Salary Growth
router.get("/salary-growth", jobTrendsController.getSalaryGrowth);
// 13. Opportunity Radar
router.get("/opportunity-radar", jobTrendsController.getOpportunityRadar);

module.exports = router;
