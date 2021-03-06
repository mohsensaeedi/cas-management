import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent} from '@angular/material';
import {FormDataService} from '../../form-data.service';
import {DelegatedForm} from './delegated.form';

@Component({
  selector: 'lib-delegated',
  templateUrl: './delegated.component.html'
})
export class DelegatedComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  delegatedAuthn: string[] = [];

  @ViewChild(MatAutocompleteTrigger, { static: true })
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild('providerInput', { static: true })
  providerInput: ElementRef;

  @Input()
  form: DelegatedForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.autoTrigger.closePanel();
      this.form.allowedProviders.setValue(this.delegatedAuthn);
      this.form.allowedProviders.markAsTouched();
      this.form.allowedProviders.markAsDirty();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(provider: any): void {
    const index = this.delegatedAuthn.indexOf(provider);

    if (index >= 0) {
      this.delegatedAuthn.splice(index, 1);
      this.form.allowedProviders.setValue(this.delegatedAuthn);
      this.form.allowedProviders.markAsTouched();
      this.form.allowedProviders.markAsDirty();
    }
  }

  selection(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.form.allowedProviders.setValue(this.delegatedAuthn);
      this.form.allowedProviders.markAsTouched();
      this.form.allowedProviders.markAsDirty();
    }

    if (this.providerInput) {
      this.providerInput.nativeElement.value = '';
    }
  }
}
