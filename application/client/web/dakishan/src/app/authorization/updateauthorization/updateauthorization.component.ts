import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ButtonRendererComponent } from '../button-rendered/button-renderer.component';

@Component({
  selector: 'app-updateauthorization',
  templateUrl: './updateauthorization.component.html',
  styleUrls: ['./updateauthorization.component.scss']
})
export class UpdateauthorizationComponent implements OnInit {

  frameworkComponents: { buttonRenderer: any; };
    public resources: any = {
      _id: '',
      created_date: '',
      created_by: '',
      last_modified_by: '',
      last_modified_date: '',
      resource_name: '',
      roles: [],
      components: [],
    };
    queryId: any;
    public columnDefs: any;
    public rowData: any;
    public componentKeys: any;
    public componentValues: any;
    public deleteById: any;
    public rowdata1: any;
    public allRowData: any;
    public gridApi: any;
    public gridColumnApi: any;
    params: any;
    btnClickedHandler: any;
    defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; };
    public colDefs: any = [
        { headerName: 'Screen_name', field: 'resource_name' },
        { headerName: 'Roles', field: 'roles' }
    ];
    paginationPageSize:any = 10;
    page: any = 1;
    public getAllRowData: any;
    public roles = [ "admin", "user", "guest", "developer" ];
    public selected = [];



    constructor(
        private authorizationService: AuthorizationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };
        this.columnDefs = [
            { 
                field: 'componentTagName',
                headerName: 'Component_Field',
                width: 250, 
            },
            { 
                field: 'componentTagAccess',
                headerName: 'Roles',
                width: 450,
            },
            // {
            //     headerName: 'Action',
            //     width: 100,
            //     cellRenderer: 'buttonRenderer',
            //     editable: false,
            //     sortable: false,
            //     filter: false,
            //     cellRendererParams: {
            //       onClick: this.removeRow.bind(this),
            //       label: 'Remove'
            //     }
            // }
        ];
        this.rowData = [];
        this.getAllRowData = [];
        this.rowdata1 = [];
        this.allRowData = [];
        this.defaultColDef = {
            editable: true,
            sortable: true,
            filter: true
        };
    }

    ngOnInit(): void {
      this.resources.created_by = sessionStorage.getItem('email');
          // this.GpGetAllValues();
          this.activatedRoute.queryParams.subscribe((params:any) => { 
              this.queryId = params.id;
              this.GpGetNounById();
          });
    }


    onCellValueChanged(event:any) {
        const rowIndex = event.rowIndex;
        this.gridApi.forEachNode( (node: { data: { name: any; }; }, nodIndex: any) => {
          if (nodIndex !== rowIndex) {
            this.rowData.push(node.data.name);
          }
        });
    }
    
    removeRow(e:any) {
        const rows = e.rowData;
        console.log('rowdata', rows);
        const selectedData = [
          rows
        ];
        console.log('slectedrow', selectedData);
        const res = this.gridApi.updateRowData({ remove: selectedData });
        console.log('changerow', res, this.rowData);
    }

    onDeleteRow() {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi = params.columnApi;
    }

    AddRows() {
        const rowta = {};
        this.gridApi.addItems([rowta]);
        this.gridApi.refreshView();

    }


    GpGetNounById() {
        console.log('data come from gpid', this.queryId);
        this.authorizationService.GpGetNounById(this.queryId).subscribe((data:any) => {
            this.resources._id = data._id;
            this.resources.resource_name = data.resource_name;
            this.selected = data.roles;
            this.resources.components = data.components
            let componentData = data.components[0];
            this.componentKeys = Object.keys(componentData);
            this.componentValues = Object.values(componentData);
            let tagComponent: any[] = [];
            for(let i = 0; i<this.componentKeys.length; i++){
                let values = this.componentValues[i].roles;
                var json = {
                    "componentTagName": `${this.componentKeys[i]}`,
                    "componentTagAccess": `${values}`
                }
                tagComponent.push(json);
            }
            this.rowData = tagComponent;
        },
        (error:any) => {
            console.log('Error', error);
        });
    }

    async GpUpdate() {
        let updateRowData: any[] = [];
        await this.gridApi.forEachNode((node:any) => {
            let Rvalue = node.data.componentTagAccess.split(',');
            node.data.componentTagAccess = Rvalue;
            updateRowData.push(node.data);
        });
        let json = this.resources.components[0];
        for(let i = 0; i<updateRowData.length; i++) {
            let valueAdd = Object.keys(json);
            let keyData = updateRowData[i].componentTagName;
            if(valueAdd[i] === keyData) {
                delete json[valueAdd[i]].roles;
                json[valueAdd[i]].roles = updateRowData[i].componentTagAccess;
            }
        }
        this.resources.roles = this.selected;
        console.log('get an update----------', this.resources);
        this.authorizationService.GpUpdate(this.resources).subscribe((data:any) => {
            this.selected = [];
            this.resources.resource_name = '';
            this.resources.roles = [];
            this.resources.component = []
            this.rowData = [];
            this.router.navigate(['./authorization']);
        },
            (error:any) => {
                console.log('Error', error);
            });
    }

}
