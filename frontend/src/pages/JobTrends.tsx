import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { RefreshCw, Share2 } from "lucide-react";

const sectors = [
  { id: 'tech', name: 'Technology' },
  { id: 'finance', name: 'Finance' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'marketing', name: 'Marketing' },
];

const JobTrends = () => {
  const [activeTab, setActiveTab] = useState<'market' | 'skills' | 'salaries'>('market');
  const [selectedSector, setSelectedSector] = useState("tech");
  const [location, setLocation] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] = useState("All");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [marketTrendsData, setMarketTrendsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [topRolesData, setTopRolesData] = useState([]);
  const [hotSkills, setHotSkills] = useState([]);
  const [companiesHiring, setCompaniesHiring] = useState([]);
  const [remoteVsOnsite, setRemoteVsOnsite] = useState([]);
  const [diversityData, setDiversityData] = useState([]);
  const [skillPredictions, setSkillPredictions] = useState([]);
  const [aiCareerPaths, setAiCareerPaths] = useState([]);
  const [skillToRoleMap, setSkillToRoleMap] = useState([]);
  const [salaryGrowthData, setSalaryGrowthData] = useState([]);
  const [personalizedRadar, setPersonalizedRadar] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [userSkills, setUserSkills] = useState(["React.js", "Python", "Cloud"]);

  // Fetch real-time data from APIs
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function fetchData() {
      try {
        async function safeFetch(url: string) {
          if (!url.startsWith("/api/")) {
            throw new Error("Frontend tried to fetch a non-API route: " + url);
          }
          const res = await fetch(url);
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("text/html")) {
            const text = await res.text();
            throw new Error(
              "API endpoint not found or misconfigured. Got HTML instead of JSON. " +
                "Check your backend is running and /api/* routes are correct. " +
                "Response: " +
                text.slice(0, 200)
            );
          }
          if (!res.ok) {
            if (contentType && contentType.includes("application/json")) {
              const err = await res.json();
              throw new Error(err.error || "API error");
            } else {
              const errText = await res.text();
              throw new Error(errText || "API error");
            }
          }
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            const text = await res.text();
            throw new Error("Unexpected response: " + text);
          }
        }

        const marketJson = await safeFetch(`/api/job-trends?sector=${selectedSector}&location=${location}&jobType=${jobType}&experience=${experience}`);
        if (!isMounted) return;
        setMarketTrendsData(marketJson.trends || []);

        const skillsJson = await safeFetch(`/api/skills?sector=${selectedSector}`);
        if (!isMounted) return;
        setSkillsData(skillsJson.skills || []);
        setHotSkills(skillsJson.hotSkills || []);

        const salaryJson = await safeFetch(`/api/salaries?sector=${selectedSector}&location=${location}&experience=${experience}`);
        if (!isMounted) return;
        setSalaryData(salaryJson.salaries || []);

        const rolesJson = await safeFetch(`/api/top-roles?sector=${selectedSector}`);
        if (!isMounted) return;
        setTopRolesData(rolesJson.roles || []);
        if (
          rolesJson.roles &&
          rolesJson.roles.length > 0 &&
          (!selectedRole || !rolesJson.roles.some((r: any) => r.name === selectedRole))
        ) {
          setSelectedRole(rolesJson.roles[0].name);
        }

        const companiesJson = await safeFetch(`/api/companies-hiring?sector=${selectedSector}`);
        if (!isMounted) return;
        setCompaniesHiring(companiesJson.companies || []);

        const remoteJson = await safeFetch(`/api/remote-onsite?sector=${selectedSector}`);
        if (!isMounted) return;
        setRemoteVsOnsite(remoteJson.stats || []);

        const diversityJson = await safeFetch(`/api/diversity?sector=${selectedSector}`);
        if (!isMounted) return;
        setDiversityData(diversityJson.diversity || []);

        const skillPredJson = await safeFetch(`/api/skill-predictions?sector=${selectedSector}`);
        if (!isMounted) return;
        setSkillPredictions(skillPredJson.predictions || []);

        const aiCareerJson = await safeFetch(`/api/ai-career-paths?sector=${selectedSector}&skills=${userSkills.join(",")}`);
        if (!isMounted) return;
        setAiCareerPaths(aiCareerJson.paths || []);

        const skillRoleJson = await safeFetch(`/api/skill-role-map?sector=${selectedSector}&skills=${userSkills.join(",")}`);
        if (!isMounted) return;
        setSkillToRoleMap(skillRoleJson.map || []);

        const radarJson = await safeFetch(`/api/opportunity-radar?sector=${selectedSector}&skills=${userSkills.join(",")}`);
        if (!isMounted) return;
        setPersonalizedRadar(radarJson.radar || []);
      } catch (err: any) {
        if (isMounted) {
          console.error(err);
          alert("Error loading dashboard data: " + err.message);
        }
      }
      if (isMounted) setLoading(false);
    }
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedSector, location, jobType, experience, userSkills, refreshKey]);

  // Fetch salary growth only when selectedRole or selectedSector changes
  useEffect(() => {
    let isMounted = true;
    async function fetchSalaryGrowth() {
      if (!selectedRole) {
        setSalaryGrowthData([]);
        return;
      }
      try {
        async function safeFetch(url: string) {
          if (!url.startsWith("/api/")) throw new Error("Frontend tried to fetch a non-API route: " + url);
          const res = await fetch(url);
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("text/html")) {
            const text = await res.text();
            throw new Error(
              "API endpoint not found or misconfigured. Got HTML instead of JSON. " +
                "Check your backend is running and /api/* routes are correct. " +
                "Response: " +
                text.slice(0, 200)
            );
          }
          if (!res.ok) {
            if (contentType && contentType.includes("application/json")) {
              const err = await res.json();
              throw new Error(err.error || "API error");
            } else {
              const errText = await res.text();
              throw new Error(errText || "API error");
            }
          }
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            const text = await res.text();
            throw new Error("Unexpected response: " + text);
          }
        }
        const salaryGrowthJson = await safeFetch(`/api/salary-growth?role=${selectedRole}&sector=${selectedSector}`);
        if (isMounted) setSalaryGrowthData(salaryGrowthJson.growth || []);
      } catch (err: any) {
        if (isMounted) setSalaryGrowthData([]);
      }
    }
    fetchSalaryGrowth();
    return () => { isMounted = false; };
  }, [selectedRole, selectedSector]);

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  const handleShare = () => {
    alert("Share Insights feature coming soon! (PDF/Email export)");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto pt-24 pb-16 px-4 flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Job & Resume <span className="gradient-text">Trend Insights</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay ahead of the curve with real-time data on job market trends, in-demand skills, and salary benchmarks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <select className="border rounded px-3 py-1 text-sm" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="All">All Locations</option>
              {/* Add dynamic options */}
            </select>
            <select className="border rounded px-3 py-1 text-sm" value={jobType} onChange={e => setJobType(e.target.value)}>
              <option value="All">All Job Types</option>
              {/* Add dynamic options */}
            </select>
            <select className="border rounded px-3 py-1 text-sm" value={experience} onChange={e => setExperience(e.target.value)}>
              <option value="All">All Experience</option>
              {/* Add dynamic options */}
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share Insights
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">Sector Analysis</h2>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <Button
                  key={sector.id}
                  variant={selectedSector === sector.id ? "default" : "outline"}
                  className={selectedSector === sector.id ? "bg-blue-purple-gradient" : ""}
                  onClick={() => setSelectedSector(sector.id)}
                >
                  {sector.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs for Market, Skills, Salaries */}
        <div className="max-w-4xl mx-auto mb-8 flex gap-4">
          <Button variant={activeTab === "market" ? "default" : "outline"} onClick={() => setActiveTab("market")}>
            Market Trends
          </Button>
          <Button variant={activeTab === "skills" ? "default" : "outline"} onClick={() => setActiveTab("skills")}>
            Skills
          </Button>
          <Button variant={activeTab === "salaries" ? "default" : "outline"} onClick={() => setActiveTab("salaries")}>
            Salaries
          </Button>
        </div>

        {/* Real Data Display */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Market Trends */}
          {activeTab === "market" && (
            <div>
              <h3 className="font-semibold mb-3">Job Market Trends ({sectors.find(s => s.id === selectedSector)?.name})</h3>
              {marketTrendsData.length === 0 && <div className="text-gray-400">No data available for this sector.</div>}
              <ul className="space-y-2">
                {marketTrendsData.map((trend: any, i) => (
                  <li key={i} className="border-b py-2 flex justify-between">
                    <span>{trend.name || trend.month || trend.title || `Month ${i+1}`}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {trend.openings ? `Openings: ${trend.openings}` : ""}
                      {trend.applications ? ` | Applications: ${trend.applications}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {activeTab === "skills" && (
            <div>
              <h3 className="font-semibold mb-3">Top Skills ({sectors.find(s => s.id === selectedSector)?.name})</h3>
              {skillsData.length === 0 && <div className="text-gray-400">No data available for this sector.</div>}
              <ul className="space-y-2">
                {skillsData.map((skill: any, i) => (
                  <li key={i} className="flex justify-between border-b py-2">
                    <span>{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {skill.value ? `Jobs: ${skill.value}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Hot Skills */}
              {hotSkills.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Hot Skills</h4>
                  <ul className="flex flex-wrap gap-3">
                    {hotSkills.map((hs: any, i) => (
                      <li key={i} className="px-3 py-1 bg-orange-100 dark:bg-green-900/20 rounded-full text-sm">
                        {hs.skill || hs.name} {hs.growth ? `(+${hs.growth}%)` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Salaries */}
          {activeTab === "salaries" && (
            <div>
              <h3 className="font-semibold mb-3">Salaries ({sectors.find(s => s.id === selectedSector)?.name})</h3>
              {salaryData.length === 0 && <div className="text-gray-400">No data available for this sector.</div>}
              <ul className="space-y-2">
                {salaryData.map((salary: any, i) => (
                  <li key={i} className="flex justify-between border-b py-2">
                    <span>{salary.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {salary.value ? `₹${salary.value.toLocaleString("en-IN")}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Top Roles & Companies */}
        <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Top Roles */}
          <div className="glass-card p-4 rounded-xl flex flex-col">
            <h4 className="font-medium mb-2">Top Roles</h4>
            {topRolesData.length === 0 && <div className="text-gray-400">No data.</div>}
            <ul className="space-y-1">
              {topRolesData.map((role: any, i) => (
                <li key={i} className="flex justify-between">
                  <span>{role.name}</span>
                  <span className="text-xs text-gray-500">{role.jobs ? `${role.jobs} jobs` : ""}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Top Companies */}
          <div className="glass-card p-4 rounded-xl flex flex-col">
            <h4 className="font-medium mb-2">Top Companies</h4>
            {companiesHiring.length === 0 && <div className="text-gray-400">No data.</div>}
            <ul className="space-y-1">
              {companiesHiring.map((comp: any, i) => (
                <li key={i} className="flex justify-between">
                  <span>{comp.company}</span>
                  <span className="text-xs text-gray-500">{comp.jobs ? `${comp.jobs} jobs` : ""}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Remote vs Onsite */}
          <div className="glass-card p-4 rounded-xl flex flex-col">
            <h4 className="font-medium mb-2">Remote vs Onsite</h4>
            {remoteVsOnsite.length === 0 && <div className="text-gray-400">No data.</div>}
            <ul className="space-y-1">
              {remoteVsOnsite.map((stat: any, i) => (
                <li key={i} className="flex justify-between">
                  <span>{stat.type || stat.label}</span>
                  <span className="text-xs text-gray-500">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Diversity */}
          <div className="glass-card p-4 rounded-xl flex flex-col">
            <h4 className="font-medium mb-2">Diversity</h4>
            {diversityData.length === 0 && <div className="text-gray-400">No data.</div>}
            <ul className="space-y-1">
              {diversityData.map((div: any, i) => (
                <li key={i} className="flex justify-between">
                  <span>{div.label || div.type}</span>
                  <span className="text-xs text-gray-500">{div.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Salary Growth */}
        <div className="max-w-4xl mx-auto mb-8">
          <h4 className="font-medium mb-2">Salary Growth for {selectedRole || "Role"}</h4>
          {salaryGrowthData.length === 0 && <div className="text-gray-400">No data.</div>}
          <ul className="space-y-2">
            {salaryGrowthData.map((growth: any, i) => (
              <li key={i} className="flex justify-between border-b py-2">
                <span>{growth.year || growth.label || `Year ${i + 1}`}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {growth.salary ? `₹${growth.salary.toLocaleString("en-IN")}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Predictions and AI Career Paths */}
        <div className="max-w-4xl mx-auto mb-8">
          <h4 className="font-medium mb-2">Skill Predictions (Next 6 months)</h4>
          {skillPredictions.length === 0 && <div className="text-gray-400">No data.</div>}
          <ul className="space-y-2">
            {skillPredictions.map((pred: any, i) => (
              <li key={i}>{typeof pred === "string" ? pred : pred.skill || pred.name}</li>
            ))}
          </ul>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <h4 className="font-medium mb-2">AI Career Paths</h4>
          {aiCareerPaths.length === 0 && <div className="text-gray-400">No data.</div>}
          <ul className="space-y-2">
            {aiCareerPaths.map((path: any, i) => (
              <li key={i}>{typeof path === "string" ? path : path.title || path.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default JobTrends;
