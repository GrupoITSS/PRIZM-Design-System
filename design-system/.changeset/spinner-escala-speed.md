---
"@grupoitss/prizm-ui": minor
---

**Spinner: escala do Figma, speed, nome em português e movimento reduzido**

- **Spinner** ganha a escala do Figma: `xs` 12px, `sm` 16px, `md` 20px, `lg` 24px e `xl` 32px. O **Dropzone** passa a usar `lg`, sem `className`.
- **Spinner** ganha a prop `speed` (`slow`, `normal`, `fast`). `degree` continua aceita até a próxima versão, com o mesmo efeito.
- **Spinner** aplica sempre a velocidade: `normal` passa a ser 600ms por volta, como estava documentado. Antes, o `normal` não era aplicado e o spinner girava em 1s, mais devagar que o `slow` (800ms).
- **Spinner** tem nome padrão "Carregando", e não mais "Loading" (WCAG 3.1.2). Com `aria-hidden`, não recebe `role` nem nome.
- **Spinner** gira a 1,5s por volta com `prefers-reduced-motion`, sem parar.

**Quebra:** `size="lg"` passa de 32px para 24px. Para manter os 32px, use `size="xl"`.
