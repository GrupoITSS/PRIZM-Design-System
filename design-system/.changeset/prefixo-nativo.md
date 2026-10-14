---
"@grupoitss/prizm-tokens": major
---

**Prefixo `prizm` também no Android e no iOS**, onde o nome é compartilhado com o app inteiro (o CSS já o tinha desde a 3.0.0).

- **Android:** os recursos passam a `prizm_color_primary`, `prizm_radius_md`, `prizm_font_sans`… e os arquivos a `prizm_colors.xml`, `prizm_tokens.xml` e `prizm_platform.xml`. Antes, copiar a pasta para `res/` sobrescrevia o `colors.xml` do app. Uso: `@color/prizm_color_primary`.
- **iOS:** os enums passam a `PrizmDocnixLight`, `PrizmDocnixDark`, `PrizmDocnixMobile` e `PrizmDocnixDesktop` (e os arquivos `.swift` com o mesmo nome). As propriedades não mudam (`colorPrimary`).

Não mudam: o CSS, o preset do Tailwind, o TypeScript (`ts/<tema>` e `ts/vars`) e os valores de qualquer token.
