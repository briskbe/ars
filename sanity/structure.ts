import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      S.listItem()
        .title("Site-instellingen")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("Homepagina")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Contactpagina")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.listItem()
        .title("Vacaturepagina")
        .id("vacaturesPage")
        .child(
          S.document().schemaType("vacaturesPage").documentId("vacaturesPage"),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Diensten"),
      S.documentTypeListItem("vacature").title("Vacatures"),
    ]);
