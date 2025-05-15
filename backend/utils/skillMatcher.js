const trendingSkills = require("./trendingSkills");

function extractSkillsFromText(text) {
  const lowerText = text.toLowerCase();
  return trendingSkills.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );
}

function findSkillGap(userSkills) {
  const lowerUserSkills = userSkills.map((s) => s.toLowerCase());
  return trendingSkills.filter(
    (skill) => !lowerUserSkills.includes(skill.toLowerCase())
  );
}

module.exports = {
  extractSkillsFromText,
  findSkillGap,
};