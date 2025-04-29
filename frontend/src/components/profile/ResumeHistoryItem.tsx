
import React from "react";
import { FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeHistoryItemProps {
  id: string;
  name: string;
  date: string;
  score: number;
  improvements: string[];
  improvement?: number;
}

const ResumeHistoryItem = ({ 
  id, 
  name, 
  date, 
  score, 
  improvements,
  improvement 
}: ResumeHistoryItemProps) => {
  return (
    <div className="bg-white dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="flex items-center mb-2 md:mb-0">
          <FileText className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-medium">{name}</h3>
        </div>
        <div className="text-sm text-gray-500">Uploaded on {date}</div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Resume Score</span>
          <span className="text-sm font-medium">{score}/100</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="h-full rounded-full" 
            style={{ 
              width: `${score}%`,
              backgroundColor: score > 80 ? '#22c55e' : score > 60 ? '#f59e0b' : '#ef4444'
            }}
          ></div>
        </div>
      </div>
      
      <h4 className="text-sm font-medium mb-2">Improvements Made:</h4>
      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 pl-5 list-disc">
        {improvements.map((improvement, index) => (
          <li key={index}>{improvement}</li>
        ))}
      </ul>
      
      {improvement && (
        <div className="mt-3 flex items-center text-green-600 dark:text-green-400">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">+{improvement}% improvement from previous version</span>
        </div>
      )}
      
      <div className="mt-4 flex space-x-3">
        <Button variant="outline" size="sm">View Report</Button>
        <Button variant="ghost" size="sm">Download PDF</Button>
      </div>
    </div>
  );
};

export default ResumeHistoryItem;
