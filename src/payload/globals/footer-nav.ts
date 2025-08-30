// globals/FooterNav.ts
import { GlobalConfig } from "payload"
import { MainNav } from "./main-nav"

export const FooterNav: GlobalConfig = {
  slug: "footerNav",
  label: "Footer Navigation",
  fields: MainNav.fields, // reuse same structure
}
