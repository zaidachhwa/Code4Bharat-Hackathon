"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Circle, TrendingUp, ListTodo, Award } from "lucide-react";

/* ------------------ UI Primitive Components ------------------- */

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };

  return (
    <button
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

/* Badge Styles */
const Badge = ({ type, children, className = "" }) => {
  const colors = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-blue-50 text-blue-700 border-blue-200",
    major: "bg-purple-50 text-purple-700 border-purple-200",
    small: "bg-gray-50 text-gray-700 border-gray-200",
    points: "bg-gray-50 text-gray-900 border-gray-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border font-medium ${colors[type] || ""} ${className}`}>
      {children}
    </span>
  );
};

/* ---------------------- Main Component ------------------------- */

export default function AmbassadorDashboard() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Temporary mock backend data
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          _id: "1",
          title: "Share Event Poster",
          desc: "Share the hackathon event poster on Instagram and tag us.",
          status: false,
          points: 20,
          level: "small",
        },
        {
          _id: "2",
          title: "WhatsApp Promotion",
          desc: "Forward registration link to 10 WhatsApp groups.",
          status: true,
          points: 50,
          level: "medium",
        },
        {
          _id: "3",
          title: "Campus Meetup",
          desc: "Conduct a small in-person promotion meetup in your college.",
          status: false,
          points: 120,
          level: "major",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const toggleStatus = async (taskId) => {
    const updated = tasks.map((t) =>
      t._id === taskId ? { ...t, status: !t.status } : t
    );

    setTasks(updated);
  };

  const totalPoints = tasks.reduce((a, b) => a + (b.status ? b.points : 0), 0);
  const completedTasks = tasks.filter(t => t.status).length;
  const pendingTasks = tasks.filter(t => !t.status).length;

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-medium">Loading dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Ambassador Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                Track your progress, complete assigned tasks, and earn rewards to advance through ambassador levels.
              </p>
            </div>
            <Badge type="points" className="text-base px-4 py-2">
              <Award className="w-4 h-4 inline mr-1.5" />
              {totalPoints} Points
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Points</p>
            <h2 className="text-3xl font-semibold text-gray-900">{totalPoints}</h2>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
            <h2 className="text-3xl font-semibold text-gray-900">{completedTasks}</h2>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-amber-700" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
            <h2 className="text-3xl font-semibold text-gray-900">{pendingTasks}</h2>
          </Card>
        </div>

        {/* Task List */}
        <Card>
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Assigned Tasks</h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete tasks to earn points and unlock new opportunities
            </p>
          </div>

          <div className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListTodo className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm font-medium">No tasks assigned yet</p>
                <p className="text-gray-500 text-sm mt-1">Check back later for new assignments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="group relative border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {task.status ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-gray-900 text-base">
                            {task.title}
                          </h3>
                          <Button
                            onClick={() => toggleStatus(task._id)}
                            variant={task.status ? "success" : "secondary"}
                            className="flex-shrink-0"
                          >
                            {task.status ? "Completed" : "Mark as Done"}
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {task.desc}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge type={task.level}>
                            {task.level.charAt(0).toUpperCase() + task.level.slice(1)}
                          </Badge>
                          <Badge type={task.status ? "completed" : "pending"}>
                            {task.status ? "Completed" : "In Progress"}
                          </Badge>
                          <Badge type="points">
                            <Award className="w-3 h-3 inline mr-1" />
                            {task.points} pts
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}