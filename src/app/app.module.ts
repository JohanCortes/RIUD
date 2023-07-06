import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HelpComponent } from './help/help.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaComponent } from './consulta/consulta.component';
import { FooterComponent } from './footer/footer.component';
import { ItemComponent } from './item/item.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { ConsultaResultadosComponent } from './consulta-resultados/consulta-resultados.component';
import { FormHelpComponent } from './form-help/form-help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateComponent,
    UpdateComponent,
    HelpComponent,
    ConsultaComponent,
    FooterComponent,
    LoginComponent,
    ItemComponent,
    ConsultaResultadosComponent,
    FormHelpComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserModule,    
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgbModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'updateComp', component: UpdateComponent },
      { path: 'itemComp', component: ItemComponent },
      { path: 'createComp', component: CreateComponent },
      { path: 'helpComp', component: HelpComponent },
      { path: 'consulComp', component: ConsultaComponent },
      { path: 'logComp', component: LoginComponent },
      { path: 'conComp', component: ConsultaComponent },
      { path: 'conReComp', component: ConsultaResultadosComponent },

    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
