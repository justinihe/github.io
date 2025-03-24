"use strict";


import { LoadHeader } from "./header.js";

type RouteMap = {[key: string]: string};
export class Router{

    private routes: RouteMap;
    constructor(routes:RouteMap){
        this.routes = routes;
        this.init();
    }

    init(){

        window.addEventListener("DOMContentLoaded", ():void => {
            const path = location.hash.slice(1) || "/";
            console.log(`[INFO] Initial Page Load ${path}`);
            this.loadRoute(path);
        })
        window.addEventListener("popstate", ():void=> {
            console.log(`[INFO] Navigating to: ${location.hash.slice(1)}`);
            this.loadRoute(location.hash.slice(1));
        })
        ///TODO
    }

    navigate(path:string):void{
        location.hash = path;
        ///TODO
    }

    loadRoute(path:string):void{
        console.log(`[INFO] loading route: ${path}`);

        //basepath="/edit#contact_121344"
        const basePath:string = path.split("#")[0];
        if(!this.routes[basePath]){
            console.log(`[WARNING] Route not found ${basePath}, redirecting to 404`);
            location.hash = "/404";
            path = "/404";
        }

        fetch(this.routes[basePath])
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${this.routes[basePath]}`);
                return response.text();
            })
            .then(html => {
                (document.querySelector("main") as HTMLElement).innerHTML = html;

                // Ensure the for example the header is "reloaded" in "every" page change
                LoadHeader().then(()=>{
                    document.dispatchEvent(new CustomEvent('routeLoaded', {detail:basePath}));
                })
            })
            .catch(error => {console.error("[ERROR] Error loading page;", error);
            })
    }
}