namespace Frontier {
  interface Theme {
    primary_color?: string;
    secondary_color?: string;
    background_color?: string;
    text_color?: string;
  }

  interface Messages {
    success: string;
  }

  interface JobMeta {
    title: string;
  }

  // Describes the job application UI
  interface Job {
    theme: Theme;
    job: JobMeta;
    messages: Messages;
    sections: Section[];
  }

  // Describes one section of the job application UI
  interface Section {
    title: string;
    id: string; // Unique (slug)
    content: Element[];
  }

  // Describes an individual user input element
  interface Element {
    id: string;
    question_text: string;
    metadata: ElementMeta;
    type:
      | 'boolean' // Yes / No question
      | 'textarea' // Longform text answer
      | 'text' // Text input (with formatting options)
      | 'multichoice'; // Select field with multiple choices available
  }

  interface Option { 
    label: string; 
    value: string 
  }

  // Field metadata objects are different per element, with some shared values.
  // The shared values are non-optional in this interface
  interface ElementMeta {
    required: boolean;
    placeholder?: string;
    options?: Option[];
    format?: 'text' | 'email' | 'number';
    pattern?: string;
    step?: number;
  }
}
