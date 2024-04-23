import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"librarte-2d551","appId":"1:1070856115793:web:08c069ca52611b10430a70","storageBucket":"librarte-2d551.appspot.com","apiKey":"AIzaSyC565fIPZ2kjyd5fe3i1pGHnry4AAZFDLQ","authDomain":"librarte-2d551.firebaseapp.com","messagingSenderId":"1070856115793"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
