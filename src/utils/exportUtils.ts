import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (element: HTMLElement, filename: string = 'invoice') => {
  try {
    // Ensure white background and black text for export
    const originalStyles = element.style.cssText;
    element.style.backgroundColor = '#ffffff';
    element.style.color = '#000000';
    
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
    
    // Restore original styles
    element.style.cssText = originalStyles;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export PDF');
  }
};

export const exportToPNG = async (element: HTMLElement, filename: string = 'invoice') => {
  try {
    // Ensure white background and black text for export
    const originalStyles = element.style.cssText;
    element.style.backgroundColor = '#ffffff';
    element.style.color = '#000000';
    
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    // Restore original styles
    element.style.cssText = originalStyles;
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    throw new Error('Failed to export PNG');
  }
};

export const exportToJPG = async (element: HTMLElement, filename: string = 'invoice') => {
  try {
    // Ensure white background and black text for export
    const originalStyles = element.style.cssText;
    element.style.backgroundColor = '#ffffff';
    element.style.color = '#000000';
    
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const link = document.createElement('a');
    link.download = `${filename}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
    
    // Restore original styles
    element.style.cssText = originalStyles;
  } catch (error) {
    console.error('Error exporting to JPG:', error);
    throw new Error('Failed to export JPG');
  }
};