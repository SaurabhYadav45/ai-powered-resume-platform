import React, { forwardRef } from 'react';
import { ResumeData } from '../../../../types/builder';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  const { personalInfo, experience, education, projects, skills, achievements, sectionOrder } = data;

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <div key="experience" className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-indigo-500 pb-1 mb-3 uppercase tracking-wider">
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{exp.jobTitle}</h3>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2 mt-1">
                <span className="text-xs font-bold text-gray-700">{exp.company}</span>
                <span className="text-xs text-gray-500">{exp.location}</span>
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
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-indigo-500 pb-1 mb-3 uppercase tracking-wider">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-1 mt-1">
                <span className="text-xs font-bold text-gray-700">{edu.school}</span>
                <span className="text-xs text-gray-500">{edu.location}</span>
              </div>
              {edu.description && (
                <p className="text-xs text-gray-700 leading-relaxed mt-1">
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
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-indigo-500 pb-1 mb-3 uppercase tracking-wider">
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

  return (
    <div 
      ref={ref}
      className="bg-white text-black mx-auto flex"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Left Column (Sidebar) */}
      <div className="w-[32%] bg-[#1E293B] text-white p-6 flex flex-col min-h-full">
        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-sm font-bold border-b border-gray-600 pb-1 mb-4 uppercase tracking-wider text-gray-300">
            Contact
          </h2>
          <div className="space-y-3 text-xs text-gray-300">
            {personalInfo.email && (
              <div className="flex items-center break-all">
                <Mail className="w-4 h-4 mr-2 text-indigo-400 shrink-0" /> 
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-indigo-400 shrink-0" /> 
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-indigo-400 shrink-0" /> 
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center break-all">
                <Linkedin className="w-4 h-4 mr-2 text-indigo-400 shrink-0" /> 
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center break-all">
                <Globe className="w-4 h-4 mr-2 text-indigo-400 shrink-0" /> 
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold border-b border-gray-600 pb-1 mb-4 uppercase tracking-wider text-gray-300">
              Skills
            </h2>
            <div className="flex flex-col gap-y-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs font-medium text-gray-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements (Optional on Sidebar) */}
        {achievements && achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold border-b border-gray-600 pb-1 mb-4 uppercase tracking-wider text-gray-300">
              Achievements
            </h2>
            <ul className="list-disc ml-4 space-y-2 text-gray-300 marker:text-indigo-400">
              {achievements.map((achieve) => (
                <li key={achieve.id} className="text-xs font-medium leading-relaxed">
                  {achieve.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column (Main Content) */}
      <div className="w-[68%] p-8 bg-white flex flex-col min-h-full">
        
        {/* Header Name */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900 mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-indigo-600 font-semibold tracking-wide">
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Dynamic Main Sections (Filtering out things handled in sidebar) */}
        {sectionOrder
          ?.filter(id => id === 'experience' || id === 'education' || id === 'projects')
          .map((sectionId) => {
            if (sectionId === 'experience') return renderExperience();
            if (sectionId === 'education') return renderEducation();
            if (sectionId === 'projects') return renderProjects();
            return null;
          })}

      </div>
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';
