import { STORAGE_KEYS, savePreference } from "./storage.js?v=14";
import { showSaveStatus } from "./ui.js?v=1";
import {
  languageSelect,
  noteComposeInput,
  noteComposeSubmit,
  notesList,
  dashNotesCount,
} from "./elements.js?v=2";
import { translations } from "./i18n.js?v=22";

function getNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.notesCollection);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Load notes failed:", error);
    return [];
  }
}

function saveNotes(notes) {
  showSaveStatus("saving");
  try {
    savePreference(STORAGE_KEYS.notesCollection, JSON.stringify(notes));
    showSaveStatus("saved");
  } catch (error) {
    console.error("Save notes failed:", error);
    showSaveStatus("error");
  }
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  const strings = translations[languageSelect.value] || translations.en;
  return d.toLocaleDateString(strings.dateLocale || "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function renderNotes() {
  if (!notesList) return;
  const strings = translations[languageSelect.value] || translations.en;
  const notes = getNotes();
  notesList.innerHTML = "";

  if (notes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "notes-empty";
    const emptyText = document.createElement("span");
    emptyText.textContent = strings.notesEmpty || "Nothing here yet — write your first note above.";
    empty.append(emptyText);
    const flourish = document.createElement("span");
    flourish.className = "notes-empty-flourish";
    flourish.textContent = strings.notesEmptyFlourish || "";
    empty.append(flourish);
    notesList.append(empty);
  } else {
    [...notes].sort((a, b) => b.date.localeCompare(a.date)).forEach((note) => {
      const item = document.createElement("li");
      const card = document.createElement("article");
      card.className = "note-item summary-card dash-row";
      card.style.borderLeftColor = "var(--accent-purple)";

      const rowText = document.createElement("span");
      rowText.className = "dash-row-text";
      const dateEl = document.createElement("strong");
      dateEl.textContent = formatDate(note.date);
      const textEl = document.createElement("em");
      textEl.textContent = note.text;
      rowText.append(dateEl, textEl);
      card.append(rowText);

      const del = document.createElement("button");
      del.type = "button";
      del.className = "note-delete";
      del.textContent = "×";
      del.setAttribute("aria-label", (strings.deleteNote || "Delete") + ": " + note.date);
      del.addEventListener("click", (e) => { e.stopPropagation(); deleteNote(note.id); });
      card.append(del);

      item.append(card);
      notesList.append(item);
    });
  }

  if (dashNotesCount) dashNotesCount.textContent = String(notes.length);
}

export function addNote() {
  if (!noteComposeInput) return;
  const text = noteComposeInput.value.trim();
  if (!text) return;
  const notes = getNotes();
  notes.push({
    id: crypto.randomUUID(),
    date: new Date().toISOString().slice(0, 10),
    text,
  });
  saveNotes(notes);
  noteComposeInput.value = "";
  renderNotes();
}

function deleteNote(id) {
  const strings = translations[languageSelect.value] || translations.en;
  if (!window.confirm(strings.deleteNote || "Delete?")) return;
  saveNotes(getNotes().filter((n) => n.id !== id));
  renderNotes();
}

if (noteComposeSubmit) noteComposeSubmit.addEventListener("click", addNote);
if (noteComposeInput) {
  noteComposeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      addNote();
    }
  });
}
