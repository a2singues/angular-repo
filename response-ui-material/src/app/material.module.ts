import { NgModule } from  '@angular/core';
import {MatNativeDateModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,} from  '@angular/material';
import {MatDatepickerModule} from  '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
 
@NgModule({
//imports: [MatButtonModule,MatToolbarModule],
imports: [MatNativeDateModule,MatDatepickerModule,MatIconModule,
            MatButtonModule,MatCheckboxModule, MatToolbarModule, ReactiveFormsModule,
            FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule, MatSelectModule,],
exports: [MatNativeDateModule,FormsModule,
    MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule, MatSelectModule,],
     
})
 
export  class  MyMaterialModule { }
