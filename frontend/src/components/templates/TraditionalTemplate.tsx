import React from 'react';
import { ResumeData } from './ModernTemplate';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code } from 'lucide-react';

export const TraditionalTemplate = ({ data }: { data: ResumeData }) => {
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
            <li key={index} className="text-sm text-[#1f2937] leading-snug">
              {cleanLine}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="bg-white text-[#000000] p-[15mm] box-border h-full" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '11pt' }}>
      <div className="space-y-3">
        {/* 1. Header */}
        <div className="text-center border-b-2 border-[#1f2937] pb-3">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-1 text-[#000000]">{data.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-[#374151]">
            {data.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {data.email}</span>}
            {data.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {data.phone}</span>}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#1e40af] underline font-semibold">
                <Linkedin className="w-3 h-3"/> LinkedIn
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#1e40af] underline font-semibold">
                <Github className="w-3 h-3"/> GitHub
              </a>
            )}
          </div>
        </div>

        {/* 2. Overview */}
        {data.summaryRaw && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1 text-[#000000]">Overview</h3>
            <p className="text-justify leading-snug text-sm text-[#000000]">{data.summaryRaw}</p>
          </section>
        )}

        {/* 3. Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2 text-[#000000]">Education</h3>
            <div className="space-y-1">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between text-sm text-[#000000]">
                  <div>
                    <span className="font-bold">{edu.institution}</span>
                    {edu.degree && <span className="italic"> — {edu.degree}</span>}
                  </div>
                  <div className="text-right">
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
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1 text-[#000000]">Technical Skills</h3>
            <p className="leading-snug text-sm text-[#000000]">{skillsList.join(" • ")}</p>
          </section>
        )}

        {/* 5. Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2 text-[#000000]">Projects</h3>
            <div className="space-y-3">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-sm text-[#000000]">{proj.title}</span>
                      {proj.techStack && <span className="text-xs italic text-[#4b5563] ml-2">({proj.techStack})</span>}
                    </div>
                    <div className="text-xs font-medium text-[#1e40af] flex gap-3">
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          Live Demo <ExternalLink className="w-3 h-3"/>
                        </a>
                      )}
                      {proj.repo && (
                        <a href={proj.repo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          GitHub <Code className="w-3 h-3"/>
                        </a>
                      )}
                    </div>
                  </div>
                  {/* UPDATED: Uses helper to render list items */}
                  {renderDescription(proj.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2 text-[#000000]">Experience</h3>
            <div className="space-y-3">
              {data.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-sm text-[#000000]">
                    <span>{job.company}</span>
                    <span className="font-normal">{job.date}</span>
                  </div>
                  <p className="italic text-sm mb-1 text-[#000000]">{job.role}</p>
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
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1 text-[#000000]">Achievements</h3>
            <ul className="list-disc list-outside ml-4 text-sm space-y-0.5 text-[#1f2937]">
              {achievementsList.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};