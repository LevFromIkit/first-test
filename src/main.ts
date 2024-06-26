import routeConfig from './app/routes';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
  providers: [
      //provideProtractorTestingSupport(),
      provideRouter(routeConfig),
  ],
}).catch((err) => console.error(err));
