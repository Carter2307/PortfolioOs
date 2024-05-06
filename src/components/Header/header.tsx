import {Logo} from "../Logo/logo.tsx";
import "./header.css";

export function Header() {
  return <header className={"header"}>
    <div className={"header-menu-bar header-left-menu-bar"}>
      <Logo/>
    </div>
    <div className={"island rounded-[1.25rem] h-12 w-48 absolute left-[50%] bg-black translate-x-[-50%]"}></div>
    <div className={"header-menu-bar header-right-menu-bar"}>
      <span className={""}>
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M6.24488 19.3511C2.58112 17.8518 0 14.2513 0 10.0479C0 4.49858 4.49858 0 10.0479 0C15.5971 0 20.0957 4.49858 20.0957 10.0479C20.0957 15.1246 16.3306 19.322 11.4404 20L7.89648 13.1842C8.50832 13.6047 9.24935 13.8508 10.0479 13.8508C12.1482 13.8508 13.8508 12.1482 13.8508 10.0479C13.8508 7.94753 12.1482 6.24488 10.0479 6.24488C7.96076 6.24488 6.26635 7.92615 6.24508 10.0082L6.24488 10.0078V10.0479V19.3511Z"
              fill="white"/>
</svg>

</span>
      <span className={"font-medium"}>Mon 12:30</span>
    </div>
  </header>
}
