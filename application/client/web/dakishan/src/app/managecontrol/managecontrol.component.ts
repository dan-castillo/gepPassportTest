import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managecontrol',
  templateUrl: './managecontrol.component.html',
  styleUrls: ['./managecontrol.component.scss']
})
export class ManagecontrolComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
