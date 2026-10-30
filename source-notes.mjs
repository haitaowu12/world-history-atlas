// Source descriptions stay frozen in their original English. Chinese translations
// are an additive local overlay shared by story, map, route, people and reference views.
const chineseNotes = new Map();
export function installSourceNoteTranslations(chunks) {
  const merged = new Map();
  for (const chunk of chunks) for (const [original, translation] of Object.entries(chunk)) {
    if (typeof translation !== 'string' || !translation.trim()) throw new Error('Invalid source description translation');
    if (merged.has(original) && merged.get(original) !== translation) throw new Error('Conflicting source description translations');
    merged.set(original, translation);
  }
  chineseNotes.clear();
  for (const [original, translation] of merged) chineseNotes.set(original, translation);
  return chineseNotes.size;
}
export function localizedSourceNote(source, language) {
  const original = typeof source?.evidenceNote === 'string' ? source.evidenceNote : '';
  if (!original) return {text:'', original:'', translated:false, missing:false};
  if (language !== 'zh') return {text:original, original, translated:false, missing:false};
  if (typeof source.evidenceNoteZh === 'string' && source.evidenceNoteZh.trim())
    return {text:source.evidenceNoteZh, original, translated:true, machine:false, missing:false};
  const translated = chineseNotes.get(original);
  if (translated) return {text:translated, original, translated:true, machine:true, missing:false};
  if (/[\u3400-\u9fff]/u.test(original)) return {text:original, original:'', translated:false, missing:false};
  return {text:original, original:'', translated:false, missing:true};
}
export function sourceNoteHTML(source, language, escape) {
  const note = localizedSourceNote(source, language);
  if (!note.text) return '';
  if (language !== 'zh') return `<small class="source-evidence-note">${escape(note.text)}</small>`;
  if (note.missing) return `<small class="source-evidence-note" lang="en">${escape(note.text)}</small><small class="source-translation-status">暂无中文译文</small>`;
  if (!note.translated) return `<small class="source-evidence-note" lang="zh">${escape(note.text)}</small>`;
  const label=note.machine?'机器辅助翻译 · 查看英文原文':'查看英文原文';
  return `<small class="source-evidence-note" lang="zh">${escape(note.text)}</small><details class="source-original"><summary>${label}</summary><small lang="en">${escape(note.original)}</small></details>`;
}
