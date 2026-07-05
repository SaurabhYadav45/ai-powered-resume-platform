import React, { forwardRef } from 'react';
import { ResumeData } from '../../types/builder';
import { ModernTemplate } from './templates/modern/ModernTemplate';
import { ModernTemplate2 } from './templates/modern/ModernTemplate2';
import { SimpleTemplate } from './templates/simple/SimpleTemplate';
import { CenteredSimpleTemplate } from './templates/simple/CenteredSimpleTemplate';
import { CreativeTemplate } from './templates/creative/CreativeTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  templateId?: string | null;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, templateId }, ref) => {
  // Route to the correct template based on templateId
  switch (templateId) {
    case 'modern-2':
      return <ModernTemplate2 data={data} ref={ref} />;
    case 'modern-1':
      return <ModernTemplate data={data} ref={ref} />;
    case 'creative-1':
      return <CreativeTemplate data={data} ref={ref} />;
    case 'simple-2':
      return <CenteredSimpleTemplate data={data} ref={ref} />;
    case 'simple-1':
    default:
      // Default to simple if nothing matches
      return <SimpleTemplate data={data} ref={ref} />;
  }
});

ResumePreview.displayName = 'ResumePreview';
