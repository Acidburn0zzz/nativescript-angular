import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, COMPONENTS } from "./app.routing";
import { AppComponent } from "./app.component";

import { DataService } from "./data.service";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { NSLocationStrategy } from "nativescript-angular/router/ns-location-strategy";


class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log("### ErrorHandler Error: " + error.toString());
        console.log("### ErrorHandler Stack: " + error.stack);
    }
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ...COMPONENTS
    ],
    providers: [
        DataService,
        { provide: ErrorHandler, useClass: MyErrorHandler }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { 
    constructor(router: Router, location: NSLocationStrategy) {
        router.events.subscribe(e =>{ 
            console.log("[ROUTER]: " + e.toString());

            if (e instanceof NavigationEnd) {
                console.log("[ROUTER] NAVIGATION END. Location history:");
                location._getStates().forEach(state => {
                    console.log(`[page: ${state.isPageNavigation}] ${state.url}`);
                });
            }
        })
    }
}