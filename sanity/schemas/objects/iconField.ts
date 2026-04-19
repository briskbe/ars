import { defineType } from "sanity";
import { ICON_NAMES } from "../../lib/iconList";

export const iconField = defineType({
  name: "iconName",
  title: "Icoon",
  type: "string",
  options: {
    list: ICON_NAMES.map((n) => ({ title: n, value: n })),
    layout: "dropdown",
  },
});
