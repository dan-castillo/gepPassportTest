import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { ButtonRendererComponent } from './button-rendered/button-renderer.component';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss'],
})

export class AuthorizationComponent implements OnInit {
    frameworkComponents: { buttonRenderer: any; };
    public resources: any = {
        created_date: '',
        created_by: '',
        last_modified_by: '',
        last_modified_date: '',
        resource_name: '',
        roles: [],
        components: [],
    };
    public columnDefs: any;
    public rowData: any;
    public deleteById: any;
    public rowdata1: any;
    public allRowData: any;
    public gridApi: any;
    public gridColumnApi: any;
    params: any;
    btnClickedHandler: any;
    defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; };
    public colDefs: any = [
        { headerName: 'Screen_Name', field: 'resource_name' },
        { headerName: 'Roles', field: 'roles' },
        // {
        //     headerName: 'Action',
        //     width: 100,
        //     cellRenderer: 'buttonRenderer',
        //     editable: false,
        //     sortable: false,
        //     filter: false,
        //     cellRendererParams: {
        //       onClick: this.GpDelete.bind(this)
        //     }
        // }
    ];
    paginationPageSize:any = 10;
    page: any = 1;
    public getAllRowData: any[] = [];
    public myForm: FormGroup | any;
    public roles = [ "admin", "user", "guest", "developer" ];
    public selected = [];

    constructor(
        private authorizationService: AuthorizationService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };
        this.columnDefs = [
            { 
                field: 'resources_name',
                headerName: 'Component_field',
                width: 250, 
            },
            { 
                field: 'roles',
                headerName: 'Roles',
                width: 450,
            },
            {
                headerName: 'Action',
                width: 100,
                cellRenderer: 'buttonRenderer',
                editable: false,
                sortable: false,
                filter: false,
                cellRendererParams: {
                  onClick: this.removeRow.bind(this)
                }
            }
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

    ngOnInit() {
        this.myForm = this.fb.group({
            roles: this.fb.array([])
          });
        this.resources.created_by = sessionStorage.getItem('email');
        this.GpGetAllValues();
    }

    public gridOptions = {
        rowSelection: 'multiple',
        groupSelectsChildren: true,
        groupSelectsFiltered: true,
        suppressAggFuncInHeader: true,
        suppressRowClickSelection: true,
        pagination:true,
        autoGroupColumnDef: {
            headerName: "Roles", field: "roles", width: 200,
            cellRenderer:'agGroupCellRenderer',
            cellRendererParams: {
                checkbox: true
            }
        },
        getNodeChildDetails: function getNodeChildDetails(rowItem:any) {
            console.log("check with",rowItem);
          if (rowItem.participants) {
            return {
              group: true,
              // open C be default
              expanded: rowItem.group === 'Group C',
              // provide ag-Grid with the children of this group
              children: rowItem.participants,
              // the key is used by the default group cellRenderer
              key: rowItem.group
            };
          } else {
            return null;
          }
        },
        onGridReady: function (params:any) {
        }
    };

    GpUpdate() {
        console.log('get an update', this.resources);
        this.authorizationService.GpUpdate(this.resources).subscribe((data:any) => {
            this.resources.name = '';
            this.resources.description = '';
            this.resources.itemtag = [];
        },
        (error:Error) => {
                console.log('Error', error);
            });
    }

    GpDelete(e:any) {
        const rows = e.rowData;
        const selectedData = [
          rows
        ];
        const res = this.gridApi.updateRowData({ remove: selectedData });
        console.log('delete a data', rows);
        let deleteData = rows._id;
        console.log('get an delete', this.resources, this.deleteById);
        this.authorizationService.GpDelete(deleteData).subscribe((data:any) => {
            this.resources.name = '';
            this.resources.description = '';
            this.resources.itemtag = [];
            this.ngOnInit();
        },
            (error:Error) => {
                console.log('Error', error);
        });
    }

    onCellValueChanged(event:any) {
        const rowIndex = event.rowIndex;
        const currentEntity:any = [];
        this.gridApi.forEachNode(function (node: { data: { name: any; }; }, nodIndex: any) {
          if (nodIndex !== rowIndex) {
            currentEntity.push(node.data.name);
          }
        });
    }
    
    removeRow(e:any) {
        const rows = e.rowData;
        const selectedData = [
          rows
        ];
        const res = this.gridApi.updateRowData({ remove: selectedData });
      }

    GpCreate() {
        this.gridApi.forEachNode((node: { data: any; }) => this.rowdata1.push(node.data));
        console.log('row data', this.rowdata1);
        this.resources.component = this.rowdata1;
        this.resources.roles = this.selected;
        console.log('final', this.resources);
        this.authorizationService.GpCreate(this.resources).subscribe(data => {
            this.resources.resource_name = '';
            this.resources.roles = [];
            this.resources.component = [];
            this.rowData = [];
            this.ngOnInit();
        },
            error => {
                console.log('Error', error);
            });
    }

    // oncheckRoles(role: string, isChecked: boolean | null | undefined){
    //     const roleFormArray = <FormArray>this.myForm.controls.roles;
        
    //     if (isChecked) {
    //       roleFormArray.push(new FormControl(role));
    //     } else {
    //       let index = roleFormArray.controls.findIndex(x => x.value == role)
    //       roleFormArray.removeAt(index);
    //     }
    //     let rolesArray = this.myForm.value.roles;
    //     console.log('roles data ', rolesArray);
    // }

    onRowClick(event: any): void {
        console.log(event.rowIndex);
        let Indexdata = this.getAllRowData[event.rowIndex];
        this.GpRoute(Indexdata._id);
        console.log(Indexdata);
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
    onDeleteRow() {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
    }

    GpGetAllValues() {
        this.authorizationService.GpGetAllValues().subscribe(data => {
            this.getAllRowData = data;
            console.log('getalldata', this.getAllRowData);
        },
            error => {
                console.log('Error', error);
            });
    }

    onSelectionChanged(values:any) {
        console.log('getbyid', values._id);
        this.deleteById = values._id;
        this.GpRoute(values._id);
    }

    GpRoute(queryId:any) {
        console.log('update data', queryId);
        this.router.navigate(['./updateauthorization'], { queryParams: { 'id': queryId } });
    }

}
