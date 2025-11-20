"use client"
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Code, User, Mail, Phone, BookOpen, Target, Lock } from 'lucide-react';

export default function HackathonRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    address: '',
    email: '',
    phone: '',
    collegeName: '',
    course: '',
    year: '',
    domain: '',
    skills: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    confirmInfo: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const domains = [
    'Web Development',
    'DSA (Data Structures & Algorithms)'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.domain) newErrors.domain = 'Domain choice is required';
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    if (!formData.confirmInfo) {
      newErrors.confirmInfo = 'You must confirm that the information is correct';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center relative z-10 border-4 border-green-400">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text mb-4">Success!</h2>
          <p className="text-gray-700 text-lg mb-8">Your registration has been submitted successfully. We'll contact you soon with further details!</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '', dob: '', gender: '', address: '', email: '', phone: '',
                collegeName: '', course: '', year: '', domain: '', skills: '',
                username: '', password: '', confirmPassword: '', agreeTerms: false, confirmInfo: false
              });
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-12 relative z-10 border-2 border-purple-300">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text animate-gradient">
              HACKATHON 2025
            </h1>
          </div>
          <p className="text-2xl text-gray-700 font-bold mb-2">Registration Portal</p>
          <p className="text-gray-600">Join the ultimate coding challenge!</p>
          <div className="mt-6 h-1.5 w-40 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div onClick={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-lg">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Personal Information</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white font-medium text-gray-800"
                  />
                  {errors.dob && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white font-medium text-gray-800"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.gender}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                  placeholder="Enter your complete address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-purple-600"/>Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-purple-600"/>Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength="10"
                    className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                    placeholder="10-digit number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border-2 border-pink-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Academic Information</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">College Name *</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                  placeholder="Enter your college name"
                />
                {errors.collegeName && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.collegeName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Course *</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                    placeholder="e.g., B.Tech, BCA, MCA"
                  />
                  {errors.course && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.course}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all duration-200 bg-white font-medium text-gray-800"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                  </select>
                  {errors.year && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.year}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Hackathon Details */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Hackathon Details</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                  <Code className="w-4 h-4 mr-2 text-blue-600"/>Domain Choice *
                </label>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 bg-white font-medium text-gray-800"
                >
                  <option value="">Select Your Domain</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
                {errors.domain && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.domain}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Skills *</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                  placeholder="List your technical skills (e.g., Python, React, DSA)"
                />
                {errors.skills && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.skills}</p>}
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 shadow-lg">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Account Details</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                  placeholder="Choose a username"
                />
                {errors.username && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.username}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                    placeholder="Enter password"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-200 bg-white font-medium text-gray-800 placeholder-gray-400"
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-2 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200 shadow-lg space-y-4">
            <div className="bg-white rounded-xl p-5 border-2 border-yellow-200">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-3 text-base font-bold text-gray-800">
                  I agree to the terms and conditions *
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-sm mt-2 ml-8 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.agreeTerms}</p>}
            </div>

            <div className="bg-white rounded-xl p-5 border-2 border-yellow-200">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="confirmInfo"
                  checked={formData.confirmInfo}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-3 text-base font-bold text-gray-800">
                  I confirm that the information provided is correct *
                </span>
              </label>
              {errors.confirmInfo && <p className="text-red-500 text-sm mt-2 ml-8 font-semibold flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.confirmInfo}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-5 px-8 rounded-2xl font-black text-xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 uppercase tracking-wider"
            >
              Register Now 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}