import JSZip from 'jszip';

export async function extractFileContent(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  
  if (ext === 'pptx') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      const slideFiles = Object.keys(zip.files).filter((name) =>
        /^ppt\/slides\/slide\d+\.xml$/.test(name)
      );

      // Sort slides numerically: slide1, slide2, slide3...
      slideFiles.sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)\.xml/)?.[1] || '0', 10);
        const numB = parseInt(b.match(/slide(\d+)\.xml/)?.[1] || '0', 10);
        return numA - numB;
      });

      const slides = [];
      for (let i = 0; i < slideFiles.length; i++) {
        const slideName = slideFiles[i];
        const xml = await zip.files[slideName].async('text');
        
        // Extract all text inside <a:t>...</a:t> tags
        const textMatches = [...xml.matchAll(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g)];
        const textPieces = textMatches
          .map((m) =>
            m[1]
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&apos;/g, "'")
              .trim()
          )
          .filter(Boolean);

        if (textPieces.length > 0) {
          const title = textPieces[0] || `Slide ${i + 1}`;
          const content = textPieces.length > 1 ? textPieces.slice(1).join('\n') : textPieces[0];
          slides.push({
            item_index: i + 1,
            title,
            content,
          });
        }
      }

      if (slides.length > 0) return slides;
    } catch (e) {
      console.warn('PPTX zip parsing error:', e);
    }
  } else if (ext === 'docx') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      if (zip.files['word/document.xml']) {
        const xml = await zip.files['word/document.xml'].async('text');
        const textMatches = [...xml.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)];
        const text = textMatches.map((m) => m[1]).join(' ');
        if (text.trim()) {
          return [{
            item_index: 1,
            title: file.name.replace(/\.[^/.]+$/, ''),
            content: text.trim(),
          }];
        }
      }
    } catch (e) {
      console.warn('DOCX zip parsing error:', e);
    }
  }

  // Fallback for text files or basic readable text
  try {
    const raw = await file.text();
    const clean = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').trim();
    if (clean.length > 30) {
      return [{
        item_index: 1,
        title: file.name.replace(/\.[^/.]+$/, ''),
        content: clean.slice(0, 8000),
      }];
    }
  } catch {}

  return [{
    item_index: 1,
    title: file.name.replace(/\.[^/.]+$/, ''),
    content: `Document: ${file.name}`,
  }];
}
