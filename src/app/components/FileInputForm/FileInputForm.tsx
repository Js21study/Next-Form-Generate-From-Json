'use client';
import React, { ChangeEvent, useState } from 'react';
import { GeneratedForm } from '../GeneratedForm';

export const FileInputForm = () => {
  const [fields, setFields] = useState([]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFields([]);
    const file = event.target.files && event.target.files[0];
    if (file) {
      const text = await file.text();
      const json = JSON.parse(text);
      setFields(json);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="bg-slate-600 hover:bg-slate-800 text-white"
      />
      {fields.length > 0 && <GeneratedForm fields={fields} />}
    </div>
  );
};
