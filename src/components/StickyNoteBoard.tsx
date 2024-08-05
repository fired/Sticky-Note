'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Note {
  _id: string;
  header: string;
  text: string;
  color: string;
}

interface GroupedNotes {
  [header: string]: Note[];
}

const StickyNoteBoard: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>(['To Do', 'In Progress', 'Done']);
  const [notes, setNotes] = useState<GroupedNotes>({});
  const [newHeader, setNewHeader] = useState<string>('');
  const [newNote, setNewNote] = useState<string>('');
  const [activeHeader, setActiveHeader] = useState<string | null>(null);
  const [noteColor, setNoteColor] = useState<string>('#ffff88');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:9000/api/notes');
      const data: Note[] = await response.json();
      
      const groupedNotes = data.reduce<GroupedNotes>((acc, note) => {
        if (!acc[note.header]) acc[note.header] = [];
        acc[note.header].push(note);
        return acc;
      }, {});

      setNotes(groupedNotes);
      setHeaders(Object.keys(groupedNotes));
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addHeader = (): void => {
    if (newHeader.trim() !== '') {
      setHeaders(prevHeaders => [...prevHeaders, newHeader.trim()]);
      setNotes(prevNotes => ({ ...prevNotes, [newHeader.trim()]: [] }));
      setNewHeader('');
    }
  };

  const removeHeader = async (headerToRemove: string): Promise<void> => {
    const updatedHeaders = headers.filter(header => header !== headerToRemove);
    const updatedNotes = { ...notes };
    delete updatedNotes[headerToRemove];
    setHeaders(updatedHeaders);
    setNotes(updatedNotes);
    if (activeHeader === headerToRemove) {
      setActiveHeader(null);
    }
    // Delete all notes under this header
    for (const note of notes[headerToRemove]) {
      try {
        await fetch(`http://localhost:9000/api/notes/${note._id}`, { method: 'DELETE' });
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const addNote = async (): Promise<void> => {
    if (newNote.trim() !== '' && activeHeader) {
      try {
        const response = await fetch('http://localhost:9000/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ header: activeHeader, text: newNote, color: noteColor }),
        });
        const newNoteData: Note = await response.json();
        setNotes(prevNotes => ({
          ...prevNotes,
          [activeHeader]: [...(prevNotes[activeHeader] || []), newNoteData],
        }));
        setNewNote('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const removeNote = async (header: string, noteId: string): Promise<void> => {
    try {
      await fetch(`http://localhost:9000/api/notes/${noteId}`, { method: 'DELETE' });
      setNotes(prevNotes => ({
        ...prevNotes,
        [header]: prevNotes[header].filter(note => note._id !== noteId),
      }));
    } catch (error) {
      console.error('Error removing note:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sticky Note Board</h1>
      <div className="mb-4 flex space-x-2">
        <Input
          type="text"
          value={newHeader}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHeader(e.target.value)}
          placeholder="New Header"
          className="w-64"
        />
        <Button onClick={addHeader}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Header
        </Button>
      </div>
      <div className="flex space-x-4 mb-4 overflow-x-auto items-start">
        {headers.map((header, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg w-64 flex-shrink-0 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{header}</h2>
              <Button variant="ghost" size="sm" onClick={() => removeHeader(header)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {notes[header]?.map((note) => (
                <div
                  key={note._id}
                  className="p-2 mb-2 rounded relative break-words"
                  style={{ backgroundColor: note.color }}
                >
                  {note.text}
                  <button
                    onClick={() => removeNote(header, note._id)}
                    className="absolute top-1 right-1 text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            {activeHeader === header ? (
              <div className="mt-2">
                <Textarea
                  value={newNote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote(e.target.value)}
                  placeholder="New Note"
                  className="mb-2 w-full resize-none"
                  rows={3}
                />
                <Input
                  type="color"
                  value={noteColor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNoteColor(e.target.value)}
                  className="mb-2 w-full"
                />
                <Button onClick={addNote} className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Note
                </Button>
              </div>
            ) : (
              <Button onClick={() => setActiveHeader(header)} className="w-full mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> New Note
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNoteBoard;