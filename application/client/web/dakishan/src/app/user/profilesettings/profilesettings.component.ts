import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { LoginService } from '../../login/login.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.scss']
})
export class ProfilesettingsComponent implements OnInit {
  

  constructor(private router: ActivatedRoute, private sharedService: SharedService, private loginservice: LoginService, private profileservice: UserService, private route: Router) { }
  public datas:any
  public value:any
  public values:any
  public data:any;
  public id: any;
  public x:any;
  public default:any;
  public selectedFiles:any;
  public currentFileUpload:any;
  public img:any;
  public profileImg:any;
  public Userobject = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'role': {},
    'id': '',
    'username': '',
    'avatar': '',
  };
  public userDefault = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'role': {},
    'id': '',
    'username': '',
    'avatar': '',
  };
  public roles: any[] = [];
  public rolechange: any;
  public defaultUserRole: any;
  public defaultRole!: {};
  public save:any;
  public  updaterole:any;

  ngOnInit() {
    this.Queryparams();
  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
      this.data = params['data'];
      this.datas = params['datas'];
      this.value = params['value'];
      this.values = params['values']
    });
    this.Userdetails();
  }

  Userdetails() {
    this.profileservice.Getuser(this.id).subscribe(data => {
      this.defaultRole = data.role.role;
      const user = data;
      this.Userobject.firstname = user.firstname;
      this.Userobject.lastname = user.lastname;
      this.Userobject.email = user.email;
      this.Userobject.username = user.username;
      this.Userobject.role = user.role.role;
      this.Userobject.password = user.password;
      this.Userobject.avatar = user.avatar;

      this.profileservice.Getroles().subscribe(roledata => {
        this.roles = roledata;
        this.defaultUserRole = this.Userobject.role;
        console.log('--------',this.defaultUserRole);
        this.default = this.defaultUserRole;
        const index = this.roles.findIndex(x => x.role === this.Userobject.role);
      });
    }, error => {
      console.error('error:', error);
     }
     );
  }

  onChange(event:any) {
    this.rolechange = '';
     const updaterole = this.roles.find(x => x.role ===  event.target.value);
     console.log(updaterole)
    this.rolechange = updaterole;
  }
  cancle() {
    this.route.navigate(['usermanagement'])
  }

  async Updateuser() {
    var imgJson = {                       
      avatar: this.img,                         
      id: this.id                           
    }
    await this.profileservice.UpdateUserImg(imgJson).subscribe((response) => {
      console.log(response)
    })
    
    this.Userobject.role = this.rolechange.role;
    this.Userobject.id = this.id;
    this.Userobject.firstname = this.data;
    this.Userobject.lastname = this.datas;
    this.Userobject.email = this.value;
    this.Userobject.username = this.Userobject.email;
    const userRole = sessionStorage.getItem('Access');

    if (this.Userobject.role === null || this.Userobject.role === undefined) {
      // console.log('ifcondtion---->>>>>', this.defaultRole);
      this.userDefault.firstname = this.Userobject.firstname;
      this.userDefault.lastname = this.Userobject.lastname;
      this.userDefault.email = this.Userobject.email;
      this.userDefault.role = this.defaultRole;
      this.userDefault.id = this.Userobject.id;
      this.userDefault.username = this.Userobject.username;
      this.profileservice.Updateuser(this.userDefault).subscribe(data => {
         this.route.navigate(['usermanagement']);
      }, error => {
        console.log("error",error);
      });
    } else{
      this.profileservice.Updateuser(this.Userobject).subscribe(data => {
         this.route.navigate(['usermanagement']);
      }, error => {
        console.log("error",error);
      });
    }
  }

  onFileSelected(event:any) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.gepfileToUpload(this.currentFileUpload);
  }
  
  //gepfilemanager
  public resultId: any;
  gepfileToUpload(fileToUpload: File){
  const endpoint = this.loginservice.uploadImgFile();
  const formData: FormData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
    fetch(endpoint, {
        method: 'POST',
        body: formData
    }).then( res => res.json()
    ).then((resultData) => {
        let dynamic_Ipdata = `${this.sharedService.UPLOAD_API}/${resultData}`;
        this.img = dynamic_Ipdata;
        console.log(this.img);
    })
  }

}

