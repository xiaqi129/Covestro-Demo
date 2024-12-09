import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialFormComponent } from '../form/material/material-form.component';
import { FormBase } from './form-base';

const CaseA = {
  definition: {
    template: { label: 'User' },
    children: [
      {
        key: 'personal',
        type: 'group',
        template: { label: 'Personal' },
        children: [
          {
            key: 'name',
            type: 'control',
            template: {
              label: 'Name',
              input: { type: 'textbox', defaultValue: 'Alice' },
            },
          },
          {
            key: 'contact',
            type: 'group',
            template: { label: 'Contact' },
            children: [
              {
                key: 'email',
                type: 'control',
                template: {
                  label: 'Email',
                  input: {
                    type: 'textbox',
                    maskOptions: {
                      alias: 'email',
                    },
                    defaultValue: 'alice@example.com',
                  },
                },
              },
              {
                key: 'phone',
                type: 'control',
                template: {
                  label: 'Phone',
                  input: { type: 'textbox', defaultValue: '1234567890' },
                },
              },
            ],
          },
        ],
      },
      {
        key: 'preferences',
        type: 'group',
        template: { label: 'Preferences' },
        children: [
          {
            key: 'newsletter',
            type: 'control',
            template: {
              label: 'Newsletter',
              input: { type: 'checkbox', defaultValue: true },
            },
          },
          {
            key: 'categories',
            type: 'control',
            template: {
              label: 'Categories',
              input: {
                type: 'select',
                defaultValue: 1,
                options: [
                  { value: 1, label: 'Tech' },
                  { value: 2, label: 'Science' },
                ],
              },
            },
          },
        ],
      },
    ],
    footerActions: [
      {
        id: 'action-submit',
        type: 'button',
        template: { type: 'submit', label: 'Submit' },
        expressions: { disabled: "data.root.status !== 'VALID'" },
      },
    ],
  },
  model: {
    personal: {
      name: 'Alice',
      contact: {
        email: 'alice@example.com',
        phone: '1234567890',
      },
    },
    preferences: {
      newsletter: true,
      categories: 2,
    },
  },
};

const CaseB = {
  definition: {
    template: { className: 'grid', label: 'User Information  ' },
    children: [
      {
        key: 'name',
        type: 'control',
        template: {
          label: 'Name',
          input: { type: 'textbox', defaultValue: 'John Doe' },
        },
      },
      {
        key: 'age',
        type: 'control',
        template: {
          label: 'Age',
          input: { type: 'numberbox', defaultValue: '30' },
        },
      },
      {
        key: 'contact',
        type: 'group',
        template: { label: 'Contact' },
        children: [
          {
            key: 'email',
            type: 'control',
            template: {
              label: 'Email',
              input: {
                type: 'textbox',
                defaultValue: 'john.doe@example.com',
                maskOptions: {
                  alias: 'email',
                },
              },
            },
          },
          {
            key: 'phone',
            type: 'control',
            template: {
              label: 'Phone',
              input: { type: 'textbox', defaultValue: '123-456-7890' },
            },
          },
          {
            key: 'address',
            type: 'group',
            template: { label: 'Address' },
            children: [
              {
                key: 'street',
                type: 'control',
                template: {
                  label: 'Street',
                  input: { type: 'textbox', defaultValue: '123 Elm Street' },
                },
              },
              {
                key: 'city',
                type: 'control',
                template: {
                  label: 'City',
                  input: { type: 'textbox', defaultValue: 'Springfield' },
                },
              },
              {
                key: 'state',
                type: 'control',
                template: {
                  label: 'State',
                  input: { type: 'textbox', defaultValue: 'IL' },
                },
              },
              {
                key: 'zipcode',
                type: 'control',
                template: {
                  label: 'Zipcode',
                  input: { type: 'textbox', defaultValue: '62701' },
                },
              },
            ],
          },
          {
            key: 'preferences',
            type: 'group',
            template: { label: 'Preferences' },
            children: [
              {
                key: 'notifications',
                type: 'group',
                children: [
                  {
                    key: 'email',
                    type: 'control',
                    template: {
                      label: 'Email',
                      input: {
                        type: 'checkbox',
                        defaultValue: true,
                        maskOptions: {
                          alias: 'email',
                        },
                      },
                    },
                  },
                  {
                    key: 'sms',
                    type: 'control',
                    template: {
                      label: 'SMS',
                      input: { type: 'checkbox', defaultValue: false },
                    },
                  },
                ],
              },
              {
                key: 'theme',
                type: 'control',
                template: {
                  label: 'Theme',
                  input: { type: 'textbox', defaultValue: 'dark' },
                },
              },
            ],
          },
          {
            key: 'skills',
            type: 'array',
            template: { label: 'Skills' },
            defaultValue: [
              {
                name: 'JavaScript',
                level: 'Advanced',
              },
              {
                name: 'Python',
                level: 'Intermediate',
              },
            ],
            definitionTemplate: {
              type: 'group',
              template: {
                className: 'row',
                classNameLabel: 'col-12',
              },
              expressions: {
                label: "(data.index + 1) + '. Skill'",
              },
              children: [
                {
                  key: 'name',
                  type: 'control',
                  template: {
                    className: 'col-6',
                    label: 'Name',
                    input: {
                      type: 'textbox',
                      placeholder: 'Enter Skill Name',
                    },
                  },
                },
                {
                  key: 'level',
                  type: 'control',
                  template: {
                    className: 'col-6',
                    label: 'Level',
                    input: {
                      type: 'textbox',
                      placeholder: 'Enter Skill Level',
                    },
                    validation: {
                      required: true,
                    },
                  },
                },
              ],
            },
          },
          {
            key: 'projects',
            type: 'group',
            template: { label: 'Projects' },
            children: [
              {
                key: 'title',
                type: 'group',
                template: {
                  label: '1. Project',
                },
                children: [
                  {
                    key: 'title',
                    type: 'control',
                    template: {
                      label: 'Title',
                      input: {
                        type: 'textbox',
                        defaultValue: 'Dynamic Form Builder',
                      },
                    },
                  },
                  {
                    key: 'status',
                    type: 'control',
                    template: {
                      label: 'Status',
                      input: {
                        type: 'radio',
                        defaultValue: 2,
                        options: [
                          {
                            value: 1,
                            label: 'Pending',
                          },
                          {
                            value: 2,
                            label: 'In Progress',
                          },
                          {
                            value: 3,
                            label: 'Completed',
                          },
                        ],
                      },
                    },
                  },
                  {
                    key: 'details',
                    type: 'group',
                    template: { label: 'Details' },
                    children: [
                      {
                        key: 'teamSize',
                        type: 'control',
                        template: {
                          label: 'Team Size',
                          input: { type: 'numberbox', defaultValue: 5 },
                        },
                      },
                      {
                        key: 'duration',
                        type: 'control',
                        template: {
                          label: 'Duration',
                          input: { type: 'textbox', defaultValue: '3 months' },
                        },
                      },
                      {
                        key: 'tools',
                        type: 'control',
                        template: {
                          label: 'Tools',
                          input: {
                            type: 'select',
                            placeholder: 'Select tools',
                            multiple: true,
                            defaultValue: [1, 2, 3],
                            options: [
                              { value: 1, label: 'Angular' },
                              { value: 2, label: 'TypeScript' },
                              { value: 3, label: 'Node.js' },
                              { value: 4, label: 'React' },
                              { value: 5, label: 'Spring Boot' },
                              { value: 6, label: 'PostgreSQL' },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                key: 'projects',
                type: 'group',
                template: { label: '2. Project' },
                children: [
                  {
                    key: 'title',
                    type: 'control',
                    template: {
                      label: 'Title',
                      input: {
                        type: 'textbox',
                        defaultValue: 'E-commerce Platform',
                      },
                    },
                  },
                  {
                    key: 'status',
                    type: 'control',
                    template: {
                      label: 'Status',
                      input: {
                        type: 'radio',
                        defaultValue: 3,
                        options: [
                          {
                            value: 1,
                            label: 'Pending',
                          },
                          {
                            value: 2,
                            label: 'In Progress',
                          },
                          {
                            value: 3,
                            label: 'Completed',
                          },
                        ],
                      },
                    },
                  },
                  {
                    key: 'details',
                    type: 'group',
                    template: { label: 'Details' },
                    children: [
                      {
                        key: 'teamSize',
                        type: 'control',
                        template: {
                          label: 'Team Size',
                          input: { type: 'numberbox', defaultValue: 5 },
                        },
                      },
                      {
                        key: 'duration',
                        type: 'control',
                        template: {
                          label: 'Duration',
                          input: { type: 'textbox', defaultValue: '3 months' },
                        },
                      },
                      {
                        key: 'tools',
                        type: 'control',
                        template: {
                          label: 'Tools',
                          input: {
                            type: 'select',
                            placeholder: 'Select tools',
                            multiple: true,
                            defaultValue: [4, 5],
                            options: [
                              { value: 1, label: 'Angular' },
                              { value: 2, label: 'TypeScript' },
                              { value: 3, label: 'Node.js' },
                              { value: 4, label: 'React' },
                              { value: 5, label: 'Spring Boot' },
                              { value: 6, label: 'PostgreSQL' },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            key: 'meta',
            type: 'group',
            template: { label: 'Meta' },
            children: [
              {
                key: 'createdBy',
                type: 'control',
                template: {
                  label: 'Created By',
                  input: { type: 'textbox', defaultValue: 'admin' },
                },
              },
              {
                key: 'createdAt',
                type: 'control',
                template: {
                  label: 'Created At',
                  input: {
                    type: 'datepicker',
                    defaultValue: '2024-11-01',
                  },
                },
              },
              {
                key: 'updatedBy',
                type: 'control',
                template: {
                  label: 'Updated By',
                  input: { type: 'textbox', defaultValue: 'editor' },
                },
              },
              {
                key: 'updatedAt',
                type: 'control',
                template: { label: 'Updated At', input: { type: 'datepicker', defaultValue: '2024-11-15' } },
              },
            ],
          },
        ],
      },
    ],
    footerActions: [
      {
        id: 'action-submit',
        type: 'button',
        template: { type: 'submit', label: 'Submit' },
        expressions: { disabled: "data.root.status !== 'VALID'" },
      },
    ],
  },
  model: {
    name: 'John Doe',
    age: 30,
    contact: {
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: {
        street: '123 Elm Street',
        city: 'Springfield',
        state: 'IL',
        zipcode: '62701',
      },
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
      },
      theme: 'dark',
    },
    skills: [
      {
        name: 'JavaScript',
        level: 'Advanced',
      },
      {
        name: 'Python',
        level: 'Intermediate',
      },
    ],
    projects: [
      {
        title: 'Dynamic Form Builder',
        status: 'Completed',
        details: {
          teamSize: 5,
          duration: '3 months',
          tools: ['Angular', 'TypeScript', 'Node.js'],
        },
      },
      {
        title: 'E-commerce Platform',
        status: 'In Progress',
        details: {
          teamSize: 8,
          duration: '6 months',
          tools: ['React', 'Spring Boot', 'PostgreSQL'],
        },
      },
    ],
    meta: {
      createdBy: 'admin',
      createdAt: '2024-11-01T10:00:00Z',
      updatedBy: 'editor',
      updatedAt: '2024-11-15T15:30:00Z',
    },
  },
};

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialFormComponent],
})
export class DynamicFormComponent extends FormBase implements OnChanges {
  @Input() selectedForm: any;
  jsonData: any;

  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder, protected override dialog: MatDialog) {
    super(dialog);
    this.dynamicForm = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedForm']) {
      if (this.selectedForm === 'a') {
        this.jsonData = CaseA;
      } else if (this.selectedForm === 'b') {
        this.jsonData = CaseB;
      }
    }
  }
}
