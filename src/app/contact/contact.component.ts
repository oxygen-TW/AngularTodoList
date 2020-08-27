import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";

function customValidator(c: AbstractControl){
  if(c.value == "777") {
    return { "nogood": true };
  }
  return null;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  // formData = new FormGroup({
  //   name: new FormControl("", [Validators.required]),
  //   email: new FormControl("", [Validators.required]),
  //   shipping: new FormGroup({
  //     city: new FormControl("", [Validators.required]),
  //     address: new FormControl("", [Validators.required])
  //   })
  // });

  constructor(private fb: FormBuilder) {
    //this.formData.get("shipping.city").valueChanges
   }

  formData = this.fb.group({
    name: ["", [Validators.required, customValidator]],
    email: [{value: "", disabled: true}],
    shipping: this.fb.group({
      city: "",
      address: ""
    })
  });

  ngOnInit(): void {
    this.formData.controls.name.valueChanges.subscribe({
      next: value=>{
        if(value !== ""){
          this.formData.controls.email.enable();
        }else{
          this.formData.controls.email.disable();
        }
      }
    });
  }

}
