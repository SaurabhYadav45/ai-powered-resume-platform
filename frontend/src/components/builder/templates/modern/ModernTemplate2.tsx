import React, { forwardRef } from 'react';
import { ResumeData } from '../../../../types/builder';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate2 = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  const { personalInfo, experience, education, projects, skills, achievements, sectionOrder } = data;

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <div key="experience" className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{exp.jobTitle}</h3>
                <span className="text-xs font-semibold text-indigo-700">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-gray-700">{exp.company}</span>
                <span className="text-xs text-gray-500 italic">{exp.location}</span>
              </div>
              <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed ml-4 list-disc marker:text-indigo-400">
                {exp.description}
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
        <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">{edu.degree}</h3>
              <div className="text-xs font-bold text-gray-700 mb-0.5">{edu.school}</div>
              <div className="text-xs text-indigo-700 font-semibold mb-1">
                {edu.startDate} - {edu.endDate}
              </div>
              {edu.description && (
                <p className="text-xs text-gray-600 leading-relaxed">
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
        <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
          Projects
        </h2>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-gray-900">
                  {proj.title} {proj.link && <a href={proj.link} className="font-normal text-indigo-600 hover:underline">({proj.link})</a>}
                </h3>
              </div>
              {proj.techStack && (
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Stack: <span className="font-normal text-gray-500">{proj.techStack}</span>
                </p>
              )}
              <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed ml-4 list-disc marker:text-indigo-400">
                {proj.description}
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
        <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="text-xs font-medium bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded">
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
        <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
          Achievements
        </h2>
        <ul className="list-disc ml-4 space-y-2 text-gray-700 text-xs marker:text-indigo-400">
          {achievements.map((achieve) => (
            <li key={achieve.id} className="leading-relaxed">
              {achieve.description}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div 
      ref={ref}
      className="bg-white text-black mx-auto flex flex-col"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top Header */}
      <div className="bg-indigo-900 text-white p-8">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-indigo-300 font-medium tracking-widest uppercase mb-4">
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        
        {/* Contact Strip */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-indigo-100">
          {personalInfo.email && (
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1.5 text-indigo-400" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1.5 text-indigo-400" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-indigo-400" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center">
              <Linkedin className="w-4 h-4 mr-1.5 text-indigo-400" /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center">
              <Globe className="w-4 h-4 mr-1.5 text-indigo-400" /> {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* Main Body (2 Columns) */}
      <div className="flex flex-1">
        {/* Main Content (Left, 65%) */}
        <div className="w-[65%] p-8 bg-white border-r border-gray-100">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Professional Summary
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Dynamic Main Sections */}
          {sectionOrder
            ?.filter(id => id === 'experience' || id === 'projects')
            .map((sectionId) => {
              if (sectionId === 'experience') return renderExperience();
              if (sectionId === 'projects') return renderProjects();
              return null;
            })}
        </div>

        {/* Sidebar (Right, 35%) */}
        <div className="w-[35%] p-8 bg-gray-50">
          {/* Dynamic Sidebar Sections */}
          {sectionOrder
            ?.filter(id => id === 'education' || id === 'skills' || id === 'achievements')
            .map((sectionId) => {
              if (sectionId === 'education') return renderEducation();
              if (sectionId === 'skills') return renderSkills();
              if (sectionId === 'achievements') return renderAchievements();
              return null;
            })}
        </div>
      </div>
    </div>
  );
});

ModernTemplate2.displayName = 'ModernTemplate2';
