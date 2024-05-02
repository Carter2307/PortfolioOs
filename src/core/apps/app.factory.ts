import {ReactNode} from "react";

export class AppController {
  icon: string;
  name: string;
  component: ReactNode;

  constructor(name: string, icon: string, component: ReactNode ) {
    this.name = name;
    this.icon = icon;
    this.component = component;
  }
}