import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { isObject, isArray } from 'lodash';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { DynamicField } from '../interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCollapseModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzButtonModule,
    NzSwitchModule,
  ],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  [x: string]: any;
  @Input() jsonData: any;
  dynamicForm: FormGroup;
  fields: DynamicField[] = [];

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit() {
    if (this.jsonData) {
      const result = this.buildFormAndFields(this.jsonData);
      this.dynamicForm = result.formGroup;
      this.fields = result.fields;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jsonData']) {
      this.dynamicForm.reset();
      this.fields = [];
      this.ngOnInit();
    }
  }

  private buildFormAndFields(
    data: any,
    parentKey: string = ''
  ): { formGroup: FormGroup; fields: DynamicField[] } {
    const formGroup = this.fb.group({});
    const fields: DynamicField[] = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        const fieldKey = parentKey ? `${parentKey}.${key}` : key;

        if (Array.isArray(value)) {
          const arrayControl = this.fb.array([] as AbstractControl[]);

          if (value.every((item) => typeof item === 'string')) {
            fields.push({ key: fieldKey, type: 'array', value });
            value.forEach((item) => arrayControl.push(this.fb.control(item)));
          } else {
            fields.push({ key: fieldKey, type: 'array-object', value });
            value.forEach((item: any) => {
              if (typeof item === 'object') {
                const nested = this.buildFormAndFields(item, fieldKey);
                arrayControl.push(nested.formGroup);
                fields.push(...nested.fields);
              } else {
                arrayControl.push(this.fb.control(item));
              }
            });
          }
          this.addControlToFormGroup(formGroup, fieldKey, arrayControl);
        }

        if (typeof value === 'object') {
          fields.push({ key: fieldKey, type: 'object', value });
          const nested = this.buildFormAndFields(value, fieldKey);
          this.addControlToFormGroup(formGroup, fieldKey, nested.formGroup);
          fields.push(...nested.fields);
        } else {
          const type =
            typeof value === 'string'
              ? 'string'
              : typeof value === 'number'
              ? 'number'
              : 'boolean';
          fields.push({ key: fieldKey, type, value });
          this.addControlToFormGroup(formGroup, fieldKey, this.fb.control(value));
        }
      }
    }
    console.log('fields', fields);
    console.log('formGroup', formGroup);
    return { formGroup, fields };
  }

  private addControlToFormGroup(
    formGroup: FormGroup,
    key: string,
    control: AbstractControl
  ) {
    formGroup.addControl(key, control);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      const formValues = this.dynamicForm.value;
      console.log('Form values:', formValues);
      // You can emit these values to a parent component if needed
    }
  }
}
