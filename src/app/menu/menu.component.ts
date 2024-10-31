import { Component ,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TabMenuModule,RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Dashboard', icon: 'pi pi-home', routerLink:['/home']},
          { label: 'Doctores', icon: 'pi pi-chart-line', routerLink:['/doctor']},
          { label: 'Especialidades', icon: 'pi pi-list', routerLink:['/especialidad'] },
          { label: 'Messages', icon: 'pi pi-inbox'}
      ]
  }
}
