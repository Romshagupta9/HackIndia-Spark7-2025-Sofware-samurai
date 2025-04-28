
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Search, Filter } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

const JobTrends = () => {
  const [activeTab, setActiveTab] = useState<'market' | 'skills' | 'salaries'>('market');
  const [selectedSector, setSelectedSector] = useState("tech");

  // Mock data for charts
  const marketTrendsData = [
    { name: 'Jan', openings: 4000, applications: 2400 },
    { name: 'Feb', openings: 3000, applications: 1398 },
    { name: 'Mar', openings: 2000, applications: 9800 },
    { name: 'Apr', openings: 2780, applications: 3908 },
    { name: 'May', openings: 1890, applications: 4800 },
    { name: 'Jun', openings: 2390, applications: 3800 },
  ];

  const skillsData = [
    { name: 'React', value: 90 },
    { name: 'Python', value: 85 },
    { name: 'Data Science', value: 70 },
    { name: 'Cloud', value: 65 },
    { name: 'AI/ML', value: 60 }
  ];

  const salaryData = [
    { name: 'Junior', value: 50000 },
    { name: 'Mid-level', value: 85000 },
    { name: 'Senior', value: 120000 },
    { name: 'Lead', value: 150000 }
  ];

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  const sectors = [
    { id: 'tech', name: 'Technology' },
    { id: 'finance', name: 'Finance' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'marketing', name: 'Marketing' },
  ];

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

        {/* Sector selector */}
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

        {/* Tab navigation */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              className={`px-4 py-3 font-medium flex items-center ${
                activeTab === "market"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("market")}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Market Trends
            </button>
            <button
              className={`px-4 py-3 font-medium flex items-center ${
                activeTab === "skills"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              In-Demand Skills
            </button>
            <button
              className={`px-4 py-3 font-medium flex items-center ${
                activeTab === "salaries"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("salaries")}
            >
              <Filter className="h-5 w-5 mr-2" />
              Salary Benchmarks
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          {activeTab === "market" && (
            <div className="animate-fade-in">
              <h3 className="font-semibold text-lg mb-4">Job Market Trends in {sectors.find(s => s.id === selectedSector)?.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Analysis of job openings versus applications over the past 6 months.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={marketTrendsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="openings" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="applications" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Key Insights:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>Job openings decreased by 15% in April but are now showing recovery</li>
                  <li>Application competition is highest in March, with 4.9 applications per opening</li>
                  <li>Remote job opportunities increased by 22% compared to last quarter</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="animate-fade-in">
              <h3 className="font-semibold text-lg mb-4">Most In-Demand Skills in {sectors.find(s => s.id === selectedSector)?.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Analysis of skills mentioned most frequently in job descriptions.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Emerging Skills:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>AI/ML skills demand grew 45% year-over-year</li>
                  <li>Cloud computing specialists are sought after in 62% of tech job postings</li>
                  <li>Data visualization is now mentioned in 38% of analyst positions</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "salaries" && (
            <div className="animate-fade-in">
              <h3 className="font-semibold text-lg mb-4">Salary Benchmarks in {sectors.find(s => s.id === selectedSector)?.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Average compensation by experience level in this sector.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={salaryData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Compensation Trends:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>Senior-level salaries grew by 8.5% compared to last year</li>
                  <li>Companies are offering 15% higher compensation for remote roles</li>
                  <li>Tech specialists command a 22% premium over generalist positions</li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button className="bg-blue-purple-gradient">
              Generate Custom Industry Report
            </Button>
          </div>
        </div>

        {/* Additional resources */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Resume Keywords</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Optimize your resume with the most impactful keywords for your industry.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Keyword Analysis
            </Button>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Trending Certifications</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Discover which credentials employers value most in your field.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Certification Guide
            </Button>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Company Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Research hiring trends for specific companies in your target list.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Company Database
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobTrends;
