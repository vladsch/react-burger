import React from "react";
import pagesStyles from "./pages.module.css";
import ProfileMenu from "../components/profile-menu/profile-menu";

export default function ProfileOrdersPage() {
  return (
      <section className={pagesStyles.page}>
          <ProfileMenu />
          <div className="ml-15">
              <div className={pagesStyles.form}>
                  <p className="text text_type_main-large mb-20">Страница в разработке</p>
              </div>
          </div>
      </section>
  );
}