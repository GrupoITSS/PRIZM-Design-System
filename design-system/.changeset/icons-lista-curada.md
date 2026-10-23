---
"@grupoitss/prizm-ui": minor
---

**Icons: sem nomes antigos do Lucide, importação única e ícones próprios acessíveis (22/10/2026)**

- **Saem os nomes antigos do Lucide** que duplicavam um ícone da lista: `AlertCircle`, `AlertTriangle`, `CheckCircle`, `HelpCircle`, `XCircle`, `MoreHorizontal`, `Loader2` e `Layout`. Fica o nome atual de cada um.
- **Entram 13 ícones**, que os componentes e as stories já usavam importando `lucide-react` direto: `CircleAlert`, `CircleCheckBig`, `PanelsTopLeft`, `Calendar`, `GripVertical`, `FileImage`, `FileSpreadsheet`, `ArrowUp`, `Maximize2`, `Minimize2`, `Tag`, `Inbox` e `ShieldAlert`. A lista passa a 138 ícones.
- **Importação única.** Os componentes do prizm-ui importam de `../icons` e as stories de `@grupoitss/prizm-ui/icons`; nenhum arquivo importa `lucide-react` direto (o teste `icons.test.tsx` confere). O Spinner usa `LoaderCircle` como ícone padrão (o mesmo desenho do `Loader2Icon`).
- **`FileCsv`, `FileDoc` e `FilePdf` saem com `aria-hidden="true"`** quando são decorativos, como os do Lucide (WCAG 1.1.1), e aceitam `size` e `color`. Antes, eram lidos pelo leitor de tela como uma imagem sem nome, e `size` ia parar como atributo inválido no `<svg>`.
- **Na raiz do pacote**, `Calendar` continua sendo o componente e `Tag` o tipo da tabela. Os ícones com esses nomes saem por `@grupoitss/prizm-ui/icons`.

**Quebra:** troque o nome antigo pelo atual, no import e no uso.

| Antes | Depois |
| --- | --- |
| `AlertCircle` | `CircleAlert` |
| `AlertTriangle` | `TriangleAlert` |
| `CheckCircle` | `CircleCheckBig` |
| `HelpCircle` | `CircleQuestionMark` |
| `XCircle` | `CircleX` |
| `MoreHorizontal` | `Ellipsis` |
| `Loader2` | `LoaderCircle` |
| `Layout` | `PanelsTopLeft` |

O desenho de cada ícone não muda. Quem importa de `lucide-react` direto não é afetado, mas deve passar a importar de `@grupoitss/prizm-ui/icons`.
