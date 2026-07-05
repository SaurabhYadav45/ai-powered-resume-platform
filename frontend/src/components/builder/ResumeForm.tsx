import React, { useState } from 'react';
import { ResumeData, Experience, Education, Skill, Project, Achievement } from '../../types/builder';
import { Plus, Trash2, Sparkles, GripVertical, CheckCircle2 } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onAiImprove: (text: string, onComplete: (improved: string) => void) => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const STEPS = [
  'Personal Info', 
  'Education', 
  'Experience', 
  'Projects', 
  'Skills', 
  'Achievements', 
  'Section Order'
];

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, onAiImprove, currentStep, setCurrentStep }) => {
  const [loadingAi, setLoadingAi] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as string);
      const newIndex = data.sectionOrder.indexOf(over.id as string);
      onChange({
        ...data,
        sectionOrder: arrayMove(data.sectionOrder, oldIndex, newIndex),
      });
    }
  };

  const handleAiImprove = (id: string, text: string, updateFn: (improved: string) => void) => {
    setLoadingAi(id);
    onAiImprove(text, (improved) => {
      updateFn(improved);
      setLoadingAi(null);
    });
  };

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  // Helper arrays for simple CRUD operations
  const addEntry = <K extends keyof ResumeData>(key: K, defaultObj: any) => {
    onChange({ ...data, [key]: [...(data[key] as any), { ...defaultObj, id: `${key}-${Date.now()}` }] });
  };
  const updateEntry = <K extends keyof ResumeData>(key: K, index: number, field: string, value: any) => {
    const newArr = [...(data[key] as any)];
    newArr[index] = { ...newArr[index], [field]: value };
    onChange({ ...data, [key]: newArr });
  };
  const removeEntry = <K extends keyof ResumeData>(key: K, index: number) => {
    const newArr = [...(data[key] as any)];
    newArr.splice(index, 1);
    onChange({ ...data, [key]: newArr });
  };

  const renderPersonal = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            value={data.personalInfo.fullName} 
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input 
            type="text" 
            value={data.personalInfo.jobTitle} 
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            value={data.personalInfo.email} 
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input 
            type="text" 
            value={data.personalInfo.phone} 
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            value={data.personalInfo.location} 
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input 
            type="text" 
            value={data.personalInfo.linkedin} 
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <div className="relative">
            <textarea 
              value={data.personalInfo.summary} 
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-black" 
            />
            <button 
              onClick={() => handleAiImprove('summary', data.personalInfo.summary, (improved) => updatePersonalInfo('summary', improved))}
              disabled={loadingAi === 'summary' || !data.personalInfo.summary}
              className="absolute bottom-3 right-3 p-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
              title="Improve with AI"
            >
              {loadingAi === 'summary' ? <span className="animate-spin text-xs">⏳</span> : <Sparkles className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      {data.education.map((edu, index) => (
        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button onClick={() => removeEntry('education', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input type="text" value={edu.degree} onChange={(e) => updateEntry('education', index, 'degree', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input type="text" value={edu.school} onChange={(e) => updateEntry('education', index, 'school', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="text" value={edu.startDate} onChange={(e) => updateEntry('education', index, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="text" value={edu.endDate} onChange={(e) => updateEntry('education', index, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => addEntry('education', { degree: '', school: '', location: '', startDate: '', endDate: '', description: '' })} className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
        <Plus className="w-4 h-4 mr-1" /> Add Education
      </button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button onClick={() => removeEntry('experience', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" value={exp.jobTitle} onChange={(e) => updateEntry('experience', index, 'jobTitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={exp.company} onChange={(e) => updateEntry('experience', index, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="text" value={exp.startDate} onChange={(e) => updateEntry('experience', index, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="text" value={exp.endDate} onChange={(e) => updateEntry('experience', index, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="relative">
                <textarea 
                  value={exp.description} 
                  onChange={(e) => updateEntry('experience', index, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                />
                <button 
                  onClick={() => handleAiImprove(`exp-${exp.id}`, exp.description, (improved) => updateEntry('experience', index, 'description', improved))}
                  disabled={loadingAi === `exp-${exp.id}` || !exp.description}
                  className="absolute bottom-3 right-3 p-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                  title="Improve with AI"
                >
                  {loadingAi === `exp-${exp.id}` ? <span className="animate-spin text-xs">⏳</span> : <Sparkles className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => addEntry('experience', { jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })} className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
        <Plus className="w-4 h-4 mr-1" /> Add Experience
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {data.projects.map((proj, index) => (
        <div key={proj.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button onClick={() => removeEntry('projects', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input type="text" value={proj.title} onChange={(e) => updateEntry('projects', index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input type="text" value={proj.link} onChange={(e) => updateEntry('projects', index, 'link', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
              <input type="text" value={proj.techStack} onChange={(e) => updateEntry('projects', index, 'techStack', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="relative">
                <textarea 
                  value={proj.description} 
                  onChange={(e) => updateEntry('projects', index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                />
                <button 
                  onClick={() => handleAiImprove(`proj-${proj.id}`, proj.description, (improved) => updateEntry('projects', index, 'description', improved))}
                  disabled={loadingAi === `proj-${proj.id}` || !proj.description}
                  className="absolute bottom-3 right-3 p-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                  title="Improve with AI"
                >
                  {loadingAi === `proj-${proj.id}` ? <span className="animate-spin text-xs">⏳</span> : <Sparkles className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => addEntry('projects', { title: '', description: '', link: '', techStack: '' })} className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
        <Plus className="w-4 h-4 mr-1" /> Add Project
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 mb-4">
        {data.skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center bg-white rounded-full px-3 py-1 border border-gray-200 shadow-sm">
            <input 
              type="text" 
              value={skill.name}
              onChange={(e) => updateEntry('skills', index, 'name', e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium w-32 text-black"
            />
            <button onClick={() => removeEntry('skills', index)} className="ml-1 text-gray-400 hover:text-red-500">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => addEntry('skills', { name: '' })} className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
        <Plus className="w-4 h-4 mr-1" /> Add Skill
      </button>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      {data.achievements.map((achieve, index) => (
        <div key={achieve.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <input 
            type="text" 
            value={achieve.description}
            onChange={(e) => updateEntry('achievements', index, 'description', e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium text-black"
            placeholder="E.g. Certified AWS Solutions Architect"
          />
          <button onClick={() => removeEntry('achievements', index)} className="mt-1 text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={() => addEntry('achievements', { description: '' })} className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
        <Plus className="w-4 h-4 mr-1" /> Add Achievement
      </button>
    </div>
  );

  const renderSectionOrder = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <p className="text-sm text-gray-600 mb-6 text-center">
        Drag and drop the blocks below to reorder the sections on your resume.
      </p>
      <div className="max-w-xs mx-auto">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={data.sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            {data.sectionOrder.map((id) => (
              <SortableSection key={id} id={id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPersonal();
      case 1: return renderEducation();
      case 2: return renderExperience();
      case 3: return renderProjects();
      case 4: return renderSkills();
      case 5: return renderAchievements();
      case 6: return renderSectionOrder();
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Step Content */}
      <div className="flex-1 bg-transparent rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{STEPS[currentStep]}</h2>
        {renderCurrentStep()}
      </div>

      {/* Wizard Navigation */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between pb-8">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="cursor-pointer px-6 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
          disabled={currentStep === STEPS.length - 1}
          className="cursor-pointer px-6 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

// Sortable DnD Item Component
const SortableSection = ({ id }: { id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formattedName = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between px-4 py-3 mb-2 rounded-lg border cursor-grab active:cursor-grabbing transition-colors ${
        isDragging ? 'bg-purple-50 border-purple-300 shadow-md z-50 relative' : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <span className="font-semibold text-gray-700">{formattedName}</span>
      <GripVertical className="text-gray-400 w-5 h-5" />
    </div>
  );
};
