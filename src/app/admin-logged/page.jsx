"use client";

import React, { useState, useEffect } from "react";
import { Plus, Users, ClipboardCheck, Award, Loader2, Trash2, ArrowRight } from "lucide-react";

/* ---------------- UI Components ---------------- */

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", size = "md", icon: Icon, ...props }) => {
  const styles = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${styles[variant]} ${sizes[size]} rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    small: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    major: "bg-purple-50 text-purple-700 border-purple-200",
    points: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, iconBg }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    <h2 className="text-3xl font-semibold text-gray-900">{value}</h2>
  </Card>
);

/* ---------------- Main Dashboard ---------------- */

export default function AdminDashboard() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loadingAmbassadors, setLoadingAmbassadors] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [selectedAmbassador, setSelectedAmbassador] = useState(null); // For modal

  const [form, setForm] = useState({
    title: "",
    desc: "",
    level: "",
    points: "",
    assignedTo: "",
  });

  const [errors, setErrors] = useState({});

  /* ------ MOCK DATA ------ */
  useEffect(() => {
    setTimeout(() => {
      setAmbassadors([
        { _id: "a1", name: "Lucky Shaikh", email: "lucky@gmail.com", phone: "+91 9876543210", points: 170, college: "ABC University" },
        { _id: "a2", name: "Noorul Haque", email: "noorul@gmail.com", phone: "+91 9123456780", points: 85, college: "XYZ College" },
        { _id: "a3", name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 9988776655", points: 240, college: "LMN Institute" },
      ]);
      setLoadingAmbassadors(false);

      setTasks([
        {
          _id: "t1",
          title: "Share Event Poster",
          desc: "Share the hackathon poster on Instagram",
          level: "small",
          points: 20,
          assignedTo: "Lucky Shaikh",
        },
        {
          _id: "t2",
          title: "Campus Meetup",
          desc: "Organize a promotional meetup",
          level: "major",
          points: 120,
          assignedTo: "Priya Sharma",
        },
      ]);
      setLoadingTasks(false);
    }, 600);
  }, []);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Task title is required";
    if (!form.level) newErrors.level = "Please select difficulty level";
    if (!form.points) newErrors.points = "Points are required";
    if (!form.assignedTo) newErrors.assignedTo = "Please assign to an ambassador";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitTask = () => {
    if (!validateForm()) {
      showNotification("Please fill all required fields");
      return;
    }
    const newTask = { ...form, _id: `t${Date.now()}` };
    setTasks([...tasks, newTask]);
    showNotification("Task assigned successfully!");
    setForm({ title: "", desc: "", level: "", points: "", assignedTo: "" });
    setErrors({});
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t._id !== taskId));
    showNotification("Task deleted successfully");
  };

  const totalPoints = tasks.reduce((sum, task) => sum + parseInt(task.points || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Manage ambassadors, assign tasks, and track performance
            </p>
          </div>
          <Button variant="primary" icon={Plus}>
            Quick Actions
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard
            icon={Users}
            label="Total Ambassadors"
            value={ambassadors.length}
            iconBg="bg-blue-100 text-blue-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 

          {/* Right Column - Ambassadors List */}
          <div className="lg:col-span-1">
            <Card>
              <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Ambassadors</h2>
              </div>

              <div className="p-6">
                {loadingAmbassadors ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin w-6 h-6 text-gray-400" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {ambassadors.map((ambassador) => (
                      <div
                        key={ambassador._id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all"
                        onClick={() => setSelectedAmbassador(ambassador)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {ambassador.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{ambassador.name}</h4>
                            <p className="text-xs text-gray-600 truncate">{ambassador.email}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs text-gray-600">Total Points</span>
                          <Badge variant="points">{ambassador.points} pts</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Ambassador Detail Modal */}
      {selectedAmbassador && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedAmbassador(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedAmbassador.name}</h2>
            <p className="text-sm text-gray-600 mb-1">Email: <span className="font-medium">{selectedAmbassador.email}</span></p>
            <p className="text-sm text-gray-600 mb-1">Phone: <span className="font-medium">{selectedAmbassador.phone}</span></p>
            <p className="text-sm text-gray-600 mb-1">College: <span className="font-medium">{selectedAmbassador.college}</span></p>
            <p className="text-sm text-gray-600 mb-1">Points: <span className="font-medium">{selectedAmbassador.points}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
