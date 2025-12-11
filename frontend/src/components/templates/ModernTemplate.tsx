import React from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code } from 'lucide-react';

// Define the Props type (matches your form data)
export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summaryRaw: string;
  education: {
    institution: string;
    degree: string;
    year: string;
    grade: string;
  }[];
  skillsRaw: string;
  experience: {
    company: string;
    role: string;
    date: string;
    descriptionRaw: string;
  }[];
  projects: {
    title: string;
    techStack: string;
    descriptionRaw: string;
    link: string;
    repo: string;
  }[];
  achievementsRaw: string;
}

interface TemplateStyleProps {
  themeColor?: string;
  fontFamily?: string;
}

export const ModernTemplate = ({ data, themeColor = '#000000', fontFamily = 'Roboto' }: { data: ResumeData } & TemplateStyleProps) => {
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
      <ul className="list-disc list-outside ml-4 space-y-1">
        {lines.map((line, index) => {
          // Remove existing bullet characters if the user/AI added them, to avoid double bullets
          const cleanLine = line.replace(/^[•\-*]\s*/, '').trim();
          return (
            <li key={index} className="text-sm leading-snug" style={{ color: themeColor }}>
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
    <div className="bg-white p-[15mm] box-border h-full" style={{ color: themeColor, fontFamily: `${fontFamily}, sans-serif`, fontSize: `${fontSize}pt` }}>
      <div className="space-y-3">
        {/* 1. Header */}
        <div className="text-center border-b-2 border-[#1f2937] pb-3">
          <h1 className="text-4xl font-bold uppercase tracking-wide mb-1" style={{ color: themeColor }}>{data.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: themeColor }}>
            {data.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4 flex-shrink-0" /> {data.email}</span>}
            {data.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4 flex-shrink-0" /> {data.phone}</span>}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline font-semibold" style={{ color: themeColor }}>
                <Linkedin className="w-4 h-4 flex-shrink-0" /> LinkedIn
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline font-semibold" style={{ color: themeColor }}>
                <Github className="w-4 h-4 flex-shrink-0" /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* 2. Overview */}
        {data.summaryRaw && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1" style={{ color: themeColor }}>Overview</h3>
            <p className="text-justify leading-snug text-sm" style={{ color: themeColor }}>{data.summaryRaw}</p>
          </section>
        )}

        {/* 3. Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2" style={{ color: themeColor }}>Education</h3>
            <div className="space-y-1">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div style={{ color: themeColor }}>
                    <span className="font-bold">{edu.institution}</span>
                    {edu.degree && <span className="italic"> — {edu.degree}</span>}
                  </div>
                  <div className="text-right" style={{ color: themeColor }}>
                    <span>{edu.year}</span>
                    {edu.grade && <span className="ml-2 font-medium">({edu.grade})</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Technical Skills */}
        {skillsList.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1" style={{ color: themeColor }}>Technical Skills</h3>
            <p className="leading-snug text-sm" style={{ color: themeColor }}>{skillsList.join(" • ")}</p>
          </section>
        )}

        {/* 5. Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2" style={{ color: themeColor }}>Projects</h3>
            <div className="space-y-3">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-sm" style={{ color: themeColor }}>{proj.title}</h4>
                    <div className="text-xs font-medium flex gap-3">
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: themeColor }}>
                          Live Demo <ExternalLink className="w-3 h-3 flex-shrink-0"/>
                        </a>
                      )}
                      {proj.repo && (
                        <a href={proj.repo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: themeColor }}>
                          GitHub <Code className="w-3 h-3 flex-shrink-0"/>
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.techStack && <div>
                    <p className="text-xs font-bold" style={{ color: themeColor }}>Tech Stack: <span className='text-xs italic font-normal'>{proj.techStack}</span></p>
                  </div>}
                  {renderDescription(proj.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2" style={{ color: themeColor }}>Experience</h3>
            <div className="space-y-3">
              {data.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-sm">
                    <span style={{ color: themeColor }}>{job.company}</span>
                    <span className="font-normal" style={{ color: themeColor }}>{job.date}</span>
                  </div>
                  <p className="italic text-sm mb-1" style={{ color: themeColor }}>{job.role}</p>
                  {/* UPDATED: Uses helper to render list items */}
                  {renderDescription(job.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Achievements */}
        {achievementsList.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1" style={{ color: themeColor }}>Achievements</h3>
            <ul className="list-disc list-outside ml-4 text-sm space-y-0.5">
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