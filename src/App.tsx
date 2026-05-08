/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import InteractiveCV from './InteractiveCV';
import PrintableCV from './PrintableCV';

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    // Give React time to render the print version into the DOM
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const wrapper = document.getElementById('cv-wrapper');
    const container = document.getElementById('cv-content');
    if (!wrapper || !container) {
      setIsGenerating(false);
      return;
    }
    
    // Add a class to remove padding since html2pdf margin will handle it
    wrapper.classList.add('generating-pdf');
    
    // Set margin to 0 and rely on CSS padding for better control
    const opt = {
      margin:       0,
      filename:     'Stuart_Crowley_CV.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3, useCORS: true, windowWidth: 794 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'], avoid: ['.role', '.section-title', '.skill-category'] }
    };

    html2pdf().set(opt).from(container).save().then(() => {
      // Restore state
      wrapper.classList.remove('generating-pdf');
      setIsGenerating(false);
    });
  };

  return (
    <>
      <InteractiveCV onDownload={handleDownload} isGenerating={isGenerating} />
      
      {/* Hidden Printable Version */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: 0, 
          width: '794px',
          visibility: isGenerating ? 'visible' : 'hidden',
          display: isGenerating ? 'block' : 'none'
        }}
        aria-hidden="true"
      >
        <PrintableCV />
      </div>
    </>
  );
}
