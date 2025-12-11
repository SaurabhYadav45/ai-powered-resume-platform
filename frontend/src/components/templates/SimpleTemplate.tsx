import React from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code } from 'lucide-react';
import { ResumeData } from './ModernTemplate';

interface TemplateStyleProps {
  themeColor?: string;
  fontFamily?: string;
}

export const SimpleTemplate = ({ data, themeColor = '#000000', fontFamily = 'Roboto' }: { data: ResumeData } & TemplateStyleProps) => {
  // Helper to parse skills from comma-separated string
  const skillsList = data.skillsRaw ? data.skillsRaw.split(',').map(s => s.trim()) : [];
  
  // Helper to parse achievements from new lines
  const achievementsList = data.achievementsRaw ? data.achievementsRaw.split('\n').filter(a => a.trim()) : [];

  // Helper to render description text as a list
  const renderDescription = (description: string) => {
    if (!description) return null;
    
    // Split by new line to separate points
    const lines = description.split('\n').filter(line => line.trim().length > 0);

    return (
      <ul className="list-disc list-outside ml-5 space-y-1">
        {lines.map((line, index) => {
          // Remove existing bullet characters if the user/AI added them, to avoid double bullets
          const cleanLine = line.replace(/^[•\-*]\s*/, '').trim();
          return (
            <li key={index} className="text-sm leading-relaxed" style={{ color: themeColor }}>
              {cleanLine}
            </li>
          );
        })}
      </ul>
    );
  };

  // Use a fixed font size since we're removing the font size functionality
  const fontSize = 16;

  return (
    <div className="bg-white p-[15mm] box-border h-full" style={{ color: themeColor, fontFamily: `${fontFamily}, Helvetica, sans-serif`, fontSize: `${fontSize}pt` }}>
      {/* Simple Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-1" style={{ color: themeColor }}>{data.fullName || "Your Name"}</h1>
        <div className="text-sm flex flex-wrap gap-4 mt-2" style={{ color: themeColor }}>
          {data.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4 flex-shrink-0" /> {data.email}</span>}
          {data.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4 flex-shrink-0" /> {data.phone}</span>}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: themeColor }}>
              <Linkedin className="w-4 h-4 flex-shrink-0" /> LinkedIn
            </a>
          )}
          {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: themeColor }}>
              <Github className="w-4 h-4 flex-shrink-0" /> GitHub
            </a>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Summary */}
        {data.summaryRaw && (
          <section>
            <h3 className="text-lg font-bold mb-2 border-b border-[#d1d5db] pb-1" style={{ color: themeColor }}>Summary</h3>
            <p className="leading-relaxed" style={{ color: themeColor }}>{data.summaryRaw}</p>
          </section>
        )}

        {/* Skills */}
        {skillsList.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-2 border-b border-[#d1d5db] pb-1" style={{ color: themeColor }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, i) => (
                <span key={i} className="text-sm px-2 py-1 rounded" style={{ backgroundColor: '#f3f4f6', color: themeColor }}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-2 border-b border-[#d1d5db] pb-1" style={{ color: themeColor }}>Experience</h3>
            <div className="space-y-4">
              {data.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between flex-wrap">
                    <h4 className="font-bold" style={{ color: themeColor }}>{job.role}</h4>
                    <span style={{ color: themeColor }} className="text-sm">{job.date}</span>
                  </div>
                  <p className="italic text-sm mb-2" style={{ color: themeColor }}>{job.company}</p>
                  {renderDescription(job.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-2 border-b border-[#d1d5db] pb-1" style={{ color: themeColor }}>Projects</h3>
            <div className="space-y-4">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between flex-wrap mb-1">
                    <h4 className="font-bold" style={{ color: themeColor }}>{proj.title}</h4>
                    <div className="text-xs flex gap-3">
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: themeColor }}>
                          Live <ExternalLink className="w-3 h-3 flex-shrink-0"/>
                        </a>
                      )}
                      {proj.repo && (
                        <a href={proj.repo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: themeColor }}>
                          Code <Code className="w-3 h-3 flex-shrink-0"/>
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.techStack && <p className="text-xs" style={{ color: themeColor }}>{proj.techStack}</p>}
                  {renderDescription(proj.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-2 border-b border-[#d1d5db] pb-1" style={{ color: themeColor }}>Education</h3>
            <div className="space-y-2">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between flex-wrap text-sm">
                  <div style={{ color: themeColor }}>
                    <span className="font-bold">{edu.institution}</span>
                    {edu.degree && <span className="italic"> — {edu.degree}</span>}
                  </div>
                  <div style={{ color: themeColor }}>
                    <span>{edu.year}</span>
                    {edu.grade && <span className="ml-2">({edu.grade})</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievementsList.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-2 border-b border-[#d1d5db] pb-1" style={{ color: themeColor }}>Achievements</h3>
            <ul className="list-disc list-outside ml-5 text-sm space-y-1">
              {achievementsList.map((ach, i) => (
                <li key={i} style={{ color: themeColor }}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};