import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent implements OnInit{

  data={
    to:"",
    subject:"",
    message:""
  }

  constructor(private email:EmailService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    
  }

  doSubmitForm(){
    console.log("Try to submit form");
    console.log("DATA ", this.data);

    // Check data is null OR blank
    if(this.data.to=='' || this.data.subject=='' || this.data.message==''){

      this.snack.open("Fields can not be empty OR blank!!", "OK");
      return;
    }

    this.email.sendEmail(this.data).subscribe(
      response=>{
        console.log(response);

      },
      error=>{
        console.log(error);
      }
    )
  }
}
