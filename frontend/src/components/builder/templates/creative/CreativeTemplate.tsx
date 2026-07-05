import React, { forwardRef } from 'react';
import { ResumeData } from '../../../types/builder';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  const { personalInfo, experience, education, projects, skills, achievements, sectionOrder } = data;

  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    return (
      <div key="summary" className="mb-6">
        <h2 className="text-lg font-extrabold text-pink-600 mb-2 uppercase tracking-wide">
          Profile
        </h2>
        <div className="border-l-4 border-pink-500 pl-4 py-1">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
            {personalInfo.summary}
          </p>
        </div>
      </div>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <div key="experience" className="mb-6">
        <h2 className="text-lg font-extrabold text-pink-600 mb-4 uppercase tracking-wide flex items-center">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full mr-3 text-sm">Exp</span> 
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-gray-900">{exp.jobTitle}</h3>
                <span className="text-xs font-bold text-pink-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">{exp.company}</span>
                <span className="text-xs text-gray-500 italic">{exp.location}</span>
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed ml-2 list-none space-y-1">
                {exp.description.split('\n').map((point, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-pink-500 mr-2 font-bold">»</span>
                    <span>{point.replace(/^[-*•\d.]+\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (education.length === 0) return null;
    return (
      <div key="education" className="mb-6">
        <h2 className="text-lg font-extrabold text-pink-600 mb-4 uppercase tracking-wide flex items-center">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full mr-3 text-sm">Edu</span> 
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                <span className="text-xs font-bold text-pink-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-700">{edu.school}</span>
                <span className="text-xs text-gray-500">{edu.location}</span>
              </div>
              {edu.description && (
                <p className="text-sm text-gray-600 leading-relaxed mt-2 italic">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <div key="projects" className="mb-6">
        <h2 className="text-lg font-extrabold text-pink-600 mb-4 uppercase tracking-wide flex items-center">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full mr-3 text-sm">Pro</span> 
          Projects
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                {proj.title}
              </h3>
              {proj.link && (
                <a href={proj.link} className="text-xs font-medium text-pink-600 hover:underline mb-2 block truncate">
                  {proj.link}
                </a>
              )}
              {proj.techStack && (
                <p className="text-xs font-bold text-gray-800 mb-2">
                  <span className="text-pink-500">Stack:</span> {proj.techStack}
                </p>
              )}
              <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed line-clamp-4">
                {proj.description.replace(/^[-*•]\s*/gm, '')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    if (skills.length === 0) return null;
    return (
      <div key="skills" className="mb-6">
        <h2 className="text-lg font-extrabold text-pink-600 mb-4 uppercase tracking-wide flex items-center">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full mr-3 text-sm">Skl</span> 
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="text-xs font-bold px-3 py-1.5 bg-gray-900 text-white rounded-md shadow-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    if (!achievements || achievements.length === 0) return null;
    return (
      <div key="achievements" className="mb-6">
        <h2 className="text-lg font-extrabold text-pink-600 mb-4 uppercase tracking-wide flex items-center">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full mr-3 text-sm">Ach</span> 
          Achievements
        </h2>
        <div className="space-y-2">
          {achievements.map((achieve) => (
            <div key={achieve.id} className="flex items-start">
              <span className="text-pink-500 mr-2 font-bold">★</span>
              <span className="text-sm font-medium text-gray-800">{achieve.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    skills: renderSkills,
    achievements: renderAchievements,
  };

  return (
    <div 
      ref={ref}
      className="bg-white text-black p-8 mx-auto border-t-8 border-pink-500"
      style={{
        width: '210mm',
        minHeight: '297mm', // A4 aspect ratio
        fontFamily: "'Outfit', 'Inter', sans-serif"
      }}
    >
      {/* Header / Personal Info */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-gray-100 pb-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-pink-600 font-bold tracking-wide uppercase">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-y-1 text-sm text-gray-600 font-medium mt-4 md:mt-0 text-right">
          {personalInfo.email && (
            <span className="flex items-center">
              {personalInfo.email} <Mail className="w-4 h-4 ml-2 text-pink-400" />
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              {personalInfo.phone} <Phone className="w-4 h-4 ml-2 text-pink-400" />
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              {personalInfo.location} <MapPin className="w-4 h-4 ml-2 text-pink-400" />
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center">
              {personalInfo.linkedin} <Linkedin className="w-4 h-4 ml-2 text-pink-400" />
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Sections Based on sectionOrder */}
      {sectionOrder && sectionOrder.map((sectionId) => sectionMap[sectionId]?.())}
      
    </div>
  );
});

CreativeTemplate.displayName = 'CreativeTemplate';
