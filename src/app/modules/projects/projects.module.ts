import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TagInputModule } from 'ngx-chips';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProjectsLogbookComponent } from './projects-logbook/projects-logbook.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    ProjectsLogbookComponent,
    
  ],
  imports: [
    CommonModule,
    CoreModule,
    ColorPickerModule,
    ProjectsRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    TagInputModule,
    MatMenuModule,
    MatSnackBarModule,
  ]
})
export class ProjectsModule { }
