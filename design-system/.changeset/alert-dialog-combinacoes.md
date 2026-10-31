---
"@grupoitss/prizm-ui": patch
---

**AlertDialog: combinações inválidas da API por props**

- **`onCancel` no Esc**: antes, só o clique em Cancelar chamava `onCancel`; o Esc fechava o diálogo sem chamá-lo. Agora os dois chamam.
- **`trigger` exige `title`**: com `trigger`, o TypeScript passa a exigir `title`. Sem ele, o diálogo abria sem nome acessível (WCAG 4.1.2).
- **Aviso no console**: com `trigger` ou `title`, a API por props monta o diálogo e `children` não é desenhado. Agora há um aviso em desenvolvimento.
- **Quebra:** `<AlertDialog trigger={…} />` sem `title` deixa de compilar. Passe `title`.
