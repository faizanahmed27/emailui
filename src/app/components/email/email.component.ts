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

  flag:boolean=false;

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

    this.flag=true;
    this.email.sendEmail(this.data).subscribe(
      response=>{
        console.log(response);
        this.flag=false;
        this.snack.open("Sent successfully", "OK")
      },
      error=>{
        console.log(error);
        this.flag=false;
        this.snack.open("Error getting", "OK")
      }
    )
  }
}
