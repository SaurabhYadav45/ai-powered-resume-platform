import React from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code } from 'lucide-react';
import { ResumeData } from './ModernTemplate'; // Reuse the interface

export const CreativeTemplate = ({ data }: { data: ResumeData }) => {
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
            <li key={index} className="text-sm text-[#000000] leading-relaxed">
              {cleanLine}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-[#000000] p-[15mm] box-border h-full" style={{ fontFamily: 'Segoe UI, sans-serif', fontSize: '11pt' }}>
      {/* Creative Header with colored background */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 mb-6 -mt-6 -mx-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.fullName || "Your Name"}</h1>
            <p className="text-indigo-100 text-lg">Creative Professional</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">
                <Mail className="w-4 h-4"/> Email
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">
                <Phone className="w-4 h-4"/> Call
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">
                <Linkedin className="w-4 h-4"/> LinkedIn
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">
                <Github className="w-4 h-4"/> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary with creative styling */}
        {data.summaryRaw && (
          <section className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Professional Summary
            </h3>
            <p className="leading-relaxed text-[#000000]">{data.summaryRaw}</p>
          </section>
        )}

        {/* Skills with visual representation */}
        {skillsList.length > 0 && (
          <section className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience with creative cards */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Work Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((job, i) => (
                <div key={i} className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100 hover:shadow-md transition">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-[#000000]">{job.role}</h4>
                    <span className="text-indigo-600 font-medium">{job.date}</span>
                  </div>
                  <p className="italic text-[#000000] mb-3">{job.company}</p>
                  {renderDescription(job.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects with creative cards */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.map((proj, i) => (
                <div key={i} className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#000000]">{proj.title}</h4>
                    <div className="flex gap-2">
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800">
                          <ExternalLink className="w-4 h-4"/>
                        </a>
                      )}
                      {proj.repo && (
                        <a href={proj.repo} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800">
                          <Code className="w-4 h-4"/>
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.techStack && <p className="text-xs text-indigo-600 mb-3">{proj.techStack}</p>}
                  {renderDescription(proj.descriptionRaw)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between flex-wrap text-[#000000] pb-2 border-b border-gray-100 last:border-0 last:pb-0">
                  <div>
                    <span className="font-bold">{edu.institution}</span>
                    {edu.degree && <span className="italic block">{edu.degree}</span>}
                  </div>
                  <div className="text-right">
                    <span>{edu.year}</span>
                    {edu.grade && <span className="block">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievementsList.length > 0 && (
          <section className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Achievements
            </h3>
            <ul className="list-disc list-outside ml-5 space-y-2">
              {achievementsList.map((ach, i) => (
                <li key={i} className="text-[#000000]">{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};