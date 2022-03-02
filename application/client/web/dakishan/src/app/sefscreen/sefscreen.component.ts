import { Component, OnInit } from '@angular/core';
import { SefscreenService } from './sefscreen.service';
// @ts-ignore
import grapesjs from 'grapesjs';
// @ts-ignore
import * as  Highcharts from 'highcharts';
// @ts-ignore
import faker from 'faker';


@Component({
  selector: 'app-sefscreen',
  templateUrl: './sefscreen.component.html',
  styleUrls: ['./sefscreen.component.scss'],
})

export class SefscreenComponent implements OnInit {
    public User = {
        created_date: '',
        created_by: '',
        last_modified_by: '',
        last_modified_date: '',
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phonenumber: '',
        avatar: '',
        Idtoken: '',
        loggedinDate: '',
        loggedoutDate: '',
        role: '',
        org: '',
        org_country: '',
        org_sub1: '',
        org_sub2: '',
        org_sub3: '',
    }

    public url: any = '';
    public firstName = '';
    public lastName = '';
    public Id: any;
    public Image: any;
    public changeName: any;
    public open: any;
    public close: any;

    constructor (
        private sefscreenService: SefscreenService,
    ) { }

    ngOnInit() {
        this.User.created_by = sessionStorage.getItem('email') || ''; 
            this.Id = sessionStorage.getItem('Id');
            this.Image = sessionStorage.getItem('Image');

                    this.sefscreenService.GpSEF(this.Id).subscribe(logindetails => {
                        this.firstName = logindetails.firstname;
 	 	this.lastName = logindetails.lastname;});
                                const colors = ['#006400', '#B22222'];

                                this.sefscreenService.getChartData(this.Id).subscribe(getCharts => {
                                // tslint:disable-next-line:radix
                                this.open = getCharts.data1;
                                console.log(this.open);
                                // tslint:disable-next-line:radix
                                this.close = getCharts.data2;
                                console.log(this.close);

                                
                    });
                

    }
}