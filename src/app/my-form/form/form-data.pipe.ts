import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'appFormData' })
export class FormDataPipe implements PipeTransform {
  transform(formData: FormData): { key: string; name: string }[] {
    if (!formData) {
      return [];
    }

    const result: { key: string; name: string }[] = [];
    formData.forEach((value, key) => {
      const { name } = value as File;
      result.push({ key, name });
    });
    return result;
  }
}
