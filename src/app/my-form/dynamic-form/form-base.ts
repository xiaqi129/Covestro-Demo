import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { FormData } from '../form/form-data';
import { FormSubmitBase } from '../form/form-submit-base';

export abstract class FormBase extends FormSubmitBase {
//   readonly data$: Observable<FormData>;

  constructor(
    protected override dialog: MatDialog,
  ) {
    super(dialog);
    // this.data$ = this.route.data.pipe(map(data => this.mapData(data)));
  }

  private mapData(data: Data): FormData {
    const definition = data['definition'];
    const model = data['model'] || {};
    return { definition, model };
  }
}
