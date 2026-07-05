import React, { forwardRef } from 'react';
import { ResumeData } from '../../../types/builder';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CenteredSimpleTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  const { personalInfo, experience, education, projects, skills, achievements, sectionOrder } = data;

  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    return (
      <div key="summary" className="mb-6">
        <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 pb-1 mb-3 uppercase tracking-wider text-center">
          Professional Summary
        </h2>
        <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap text-center max-w-3xl mx-auto">
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <div key="experience" className="mb-6">
        <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 pb-1 mb-3 uppercase tracking-wider text-center">
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-col items-center mb-2">
                <h3 className="text-sm font-bold text-gray-900">{exp.jobTitle}</h3>
                <div className="text-xs font-semibold text-gray-800 my-0.5">
                  {exp.company} <span className="font-normal text-gray-500 italic mx-1">|</span> {exp.location}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed list-disc mx-auto max-w-3xl">
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
        <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 pb-1 mb-3 uppercase tracking-wider text-center">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex flex-col items-center mb-1">
                <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                <div className="text-xs font-semibold text-gray-800 my-0.5">
                  {edu.school} <span className="font-normal text-gray-500 italic mx-1">|</span> {edu.location}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.description && (
                <p className="text-xs text-gray-800 leading-relaxed mt-1 text-center max-w-3xl mx-auto">
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
        <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 pb-1 mb-3 uppercase tracking-wider text-center">
          Projects
        </h2>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex flex-col items-center mb-2">
                <h3 className="text-sm font-bold text-gray-900">
                  {proj.title} {proj.link && <a href={proj.link} className="font-normal text-blue-600 hover:underline ml-1">({proj.link})</a>}
                </h3>
                {proj.techStack && (
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">
                    Stack: <span className="font-normal">{proj.techStack}</span>
                  </p>
                )}
              </div>
              <div className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed list-disc mx-auto max-w-3xl">
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
        <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 pb-1 mb-3 uppercase tracking-wider text-center">
          Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-3xl mx-auto">
          {skills.map((skill) => (
            <span key={skill.id} className="text-xs text-gray-800 font-medium">
              • {skill.name}
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
        <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 pb-1 mb-3 uppercase tracking-wider text-center">
          Achievements
        </h2>
        <ul className="list-disc space-y-1 mx-auto max-w-2xl text-left">
          {achievements.map((achieve) => (
            <li key={achieve.id} className="text-xs text-gray-800 font-medium">
              {achieve.description}
            </li>
          ))}
        </ul>
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
      className="bg-white text-black p-10 mx-auto"
      style={{
        width: '210mm',
        minHeight: '297mm', // A4 aspect ratio
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header / Personal Info (Always at the top) */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-widest mb-1 text-gray-900 uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-widest">
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center">
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              <span className="mx-2 text-gray-300">|</span>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              <span className="mx-2 text-gray-300">|</span>
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center">
              <span className="mx-2 text-gray-300">|</span>
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center">
              <span className="mx-2 text-gray-300">|</span>
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Sections Based on sectionOrder */}
      {sectionOrder && sectionOrder.map((sectionId) => sectionMap[sectionId]?.())}
      
    </div>
  );
});

CenteredSimpleTemplate.displayName = 'CenteredSimpleTemplate';
