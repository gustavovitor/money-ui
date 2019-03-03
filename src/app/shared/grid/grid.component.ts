import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { PaginatorProperties } from '../paginator-properties.class';

export class Column {
  label: string;
  field: string;
  subfield: string;
  header: string;
  styleClass: string[];
  customStyle: any;
  type: any;
  paramx: any;
  paramy: any;
  paramz: any;
}

export class Action {
  key: number;
  icon: string;
  tooltip: string;
  disabled = false;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor() { }

  @Input() paginatorProperties = new PaginatorProperties();
  @Input() data: any;
  @Input() cols: Column[];
  @Input() actions: Action[];

  @Output() pageChange = new EventEmitter();
  @Output() userAction = new EventEmitter();

  ngOnInit() {
  }

  onPageChange(e) {
    this.pageChange.emit(e);
  }

  onUserAction(e) {
    this.userAction.emit(e);
  }

  getData(col: Column, date: any) {
    let d;
    if (col.subfield) {
      d = date[col.field][col.subfield];
    } else {
      d = date[col.field];
    }
    if (col.type) {
      return col.type.transform(d, col.paramx, col.paramy, col.paramz);
    }
    return d;
  }

}
