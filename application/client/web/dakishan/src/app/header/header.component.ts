import { Component, OnInit, Inject } from '@angular/core';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { SharedService } from '../../shared/shared.service';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';
import { BroadcastService } from '../auth/broadcast.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
    private jwtToken: String='';
public isAdminUser = false;
public UserName:any = '';
public images:any;
public url:any = '';
mysubscription: any;
public authArray: any;
public userId: string | null = '';
public currentLanguage: String = '';
public confirmLangChangeModal: String = 'none';
public language = 'en';
public languages = ['en', 'ta', 'es']
    constructor (
@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
private router: Router,
private loginService: LoginService,
public broadcastService: BroadcastService,
private sharedService: SharedService,
public userService: UserService
) {
	this.broadcastService.currentUserName.subscribe(headerPermission => {
        this.authArray = [];
        if (headerPermission !== undefined) {
            //   console.log('Headerpermission------->>>', headerPermission);
            for (let role in headerPermission) {
                console.log('-------role----', headerPermission[role])
                if (headerPermission[role].length >= 1) {
                    this.authArray = headerPermission[role];
                }
            }
        }
    });
	this.mysubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.router.navigated = false;
        }
    })
	this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }
	 this.authArray.find((access:any) => access === 'admin' ? this.isAdminUser = true : false);
}

    ngOnInit() {
        this.userId = sessionStorage.getItem('Id') || '{}';
    }
onSelectFile(event:any) {
		
		let image = event.target.files[0];
		
		if (event.target.files && event.target.files[0]) {
			
		let formData = new FormData();
			
		var reader = new FileReader();
			
		reader.readAsDataURL(event.target.files[0]); // read file as data url
			
		reader.onload = (event:any) => { // called once readAsDataURL is completed
				
		this.url = event.target.result;
                
		}
                
		}
                
		if(image){
                    
		alert('* confirm u can upload click ok');
                    
		const endpoint = this.loginService.uploadImgFile();
                    
		const formData: FormData = new FormData();
                    
		formData.append('fileKey', image, image.name);
                    
		fetch(endpoint, {
                        
		method: 'POST',
                        
		body: formData
                        
		}).then( res => res.json() ).then((resultData:any) => {
                            
		let userImage = `${this.sharedService.UPLOAD_API}/${resultData}`;
                            
		var imgJson = {
                                
		avatar: userImage,
                                
		id: sessionStorage.getItem('Id')
                                
		}
                                
		this.userService.UpdateUserImg(imgJson).subscribe((response) => {
                                    
		sessionStorage.removeItem('Image');
                                    
		sessionStorage.setItem('Image', response.avatar); 
                                    
		this.ngOnInit();
                                    
		})
                                    
		})
                                    
		}
                                    
		}
private updateState(lang: string) {
		this.language = lang;
		}
changeLanguage(lang:any) {
		if (lang !== this.i18NextService.language) {
		this.i18NextService.changeLanguage(lang).then(x => {
		this.updateState(lang);
		});
		}
		this.userId = sessionStorage.getItem('Id') || '{}';
		if (this.userId !== null) {
		this.logout();
		} else {
		document.location.reload();
		}
		}
onCloseHandled() {
		this.confirmLangChangeModal = 'none';
		}
confirmLangChange() {
		this.changeLanguage(this.currentLanguage);
		this.onCloseHandled();
		}
confirmLangModel(lang:any) {
		this.userId= sessionStorage.getItem('Id') || '{}';
		if (this.userId !== null) {
		this.confirmLangChangeModal = 'block';
		this.currentLanguage = lang;
		} else {
		this.changeLanguage(lang);
		this.onCloseHandled();
		}
		}
isApplicable(value:any) {
		if (this.authArray !== undefined) {
			return this.authArray.filter((routename: any) => routename == value).length > 0;
		}
        return false;
    }
 logout() {
		const temp = {
			 id: sessionStorage.getItem('Id')
		};
		this.loginService.Logout(temp).subscribe(data => {
			sessionStorage.clear();
		this.userId = sessionStorage.getItem('Id') || '{}';
		this.router.navigate(['']);
		}, error => {
			console.error('error:', error);
		});
		}
}