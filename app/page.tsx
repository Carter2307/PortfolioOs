"use client"

import {Dock} from "@/app/ui/Dock/dock";
import {DockApp} from "@/app/ui/Dock/DockApp";
import {DockCard} from "@/app/ui/Dock/DockCard";
import apps from "@/app/data/apps";
import {Header} from "@/app/ui/Header/header";
import {Application, AppT} from "@/app/core/App";
import {processManager} from "@/app/core/processManager";

export default function Page() {
  const magnification = 1;

  const runApp = (app: AppT) => {
    processManager.add(app)
  }

  return (
    <>
      <Header/>
      <Dock magnification={magnification}>
        {apps.map((a, index) => {
          return <DockApp key={index} onClick={() => runApp(a)} app={a}>
            <DockCard src={a.icon}/>
          </DockApp>
        })}
      </Dock>
    </>
  )
}
