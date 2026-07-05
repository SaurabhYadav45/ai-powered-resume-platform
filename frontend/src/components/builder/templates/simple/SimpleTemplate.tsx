import React, { forwardRef } from 'react';
import { ResumeData } from '../../../../types/builder';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const SimpleTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  const { personalInfo, experience, education, projects, skills, achievements, sectionOrder } = data;

  const formatDescription = (text: string | undefined) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    return (
      <div className="text-sm text-gray-800 leading-relaxed">
        {lines.map((line, i) => {
          const isBullet = /^[•\-\*]\s*/.test(line.trim());
          if (isBullet) {
            return (
              <div key={i} className="flex items-start mb-1 w-full">
                <span className="mr-2 mt-[1px] font-bold">•</span>
                <span className="flex-1">{line.replace(/^[•\-\*]\s*/, '')}</span>
              </div>
            );
          }
          return <div key={i} className="mb-1 w-full">{line}</div>;
        })}
      </div>
    );
  };

  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    return (
      <div key="summary" className="mb-3">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-900 pb-1 mb-2 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <div key="experience" className="mb-3">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-900 pb-1 mb-2 uppercase tracking-wide">
          Experience
        </h2>
        <div className="space-y-3">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{exp.jobTitle}</h3>
                <span className="text-sm font-medium text-gray-700">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-gray-800">{exp.company}</span>
                <span className="text-sm text-gray-600 italic">{exp.location}</span>
              </div>
              <div className="mt-1">
                {formatDescription(exp.description)}
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
      <div key="education" className="mb-3">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-900 pb-1 mb-2 uppercase tracking-wide">
          Education
        </h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                <span className="text-sm font-medium text-gray-700">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-gray-800">{edu.school}</span>
                <span className="text-sm text-gray-600 italic">{edu.location}</span>
              </div>
              {edu.description && (
                <div className="mt-1">
                  {formatDescription(edu.description)}
                </div>
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
      <div key="projects" className="mb-3">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-900 pb-1 mb-2 uppercase tracking-wide">
          Projects
        </h2>
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-gray-900">
                  {proj.title}
                  {proj.techStack && <span className="font-normal text-gray-700"> | {proj.techStack}</span>}
                </h3>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline shrink-0 ml-2">
                    Live Demo
                  </a>
                )}
              </div>
              <div className="mt-1">
                {formatDescription(proj.description)}
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
      <div key="skills" className="mb-3">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-900 pb-1 mb-2 uppercase tracking-wide">
          Skills
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {skills.map((skill) => (
            <span key={skill.id} className="text-sm text-gray-800 font-medium">
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
      <div key="achievements" className="mb-3">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-900 pb-1 mb-2 uppercase tracking-wide">
          Achievements
        </h2>
        <ul className="list-disc ml-4 space-y-1">
          {achievements.map((achieve) => (
            <li key={achieve.id} className="text-sm text-gray-800 font-medium">
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
      className="bg-white text-black p-8 mx-auto"
      style={{
        width: '210mm',
        minHeight: '297mm', // A4 aspect ratio
        fontFamily: "'Times New Roman', Times, serif"
      }}
    >
      {/* Header / Personal Info (Always at the top) */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider mb-2 text-gray-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-700">
          {personalInfo.email && (
            <span className="flex items-center">
              <Mail className="w-3 h-3 mr-1" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              <Phone className="w-3 h-3 mr-1" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center">
              <Globe className="w-3 h-3 mr-1" /> {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center">
              <Linkedin className="w-3 h-3 mr-1" /> {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Sections Based on sectionOrder */}
      {sectionOrder && sectionOrder.map((sectionId) => sectionMap[sectionId]?.())}
      
    </div>
  );
});

SimpleTemplate.displayName = 'SimpleTemplate';
