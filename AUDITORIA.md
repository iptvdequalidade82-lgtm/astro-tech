# Auditoria de conformidade — Astro Tech Energia Solar
Data: 31/10/2026

## 1. Implementado
- Projeto React 19 + Vite + TS, Tailwind, GSAP/ScrollTrigger, Lucide; seções comerciais completas; links WhatsApp por segmento; formulário WhatsApp sem back-end; simulador editável no navegador; páginas legais; FAQ com controle de expansão; navegação mobile; imagens WebP; estilos responsivos; classes de foco e redução de movimento; dados estruturados SEO; scripts de teste unitário; instruções de publicação.
- Números usados: dados de um único projeto informado pelo cliente (Londrina). Nenhum testemunho, preço, marca, número de clientes, prêmio ou garantia inventados.
- Seis imagens fornecidas. Onde a foto não é da obra específica, rótulo "Imagem ilustrativa". Bateria/carport/recarga: cards apenas com ícone.

## 2. Pendências [PREENCHER] / revisão com cliente
- Razão social e CNPJ; responsável pelo canal LGPD/encarregado se aplicável.
- Política real de prazo de armazenamento e descarte dos dados e conversas; provedor de hospedagem definitivo.
- Domínio e links definitivos (canonical, sitemap, robots); logo oficial; arquivo/imagem oficial da obra em Londrina.
- Autorizações/licenças comerciais das 6 fotografias.
- Verificação de potência: **8 × 520 W = 4.160 Wp = 4,16 kWp**; briefing informa 4 kWp. Corrigir documentação, referência numérica e o coeficiente do simulador antes de usar comercialmente.

## 3. Scripts e armazenamento
- Vite/React/GSAP locais após build; nenhuma API externa chamada pelo simulador e formulário.
- `localStorage.astro-tech-consent-v1`: registra preferências do usuário.
- GA4 opcional apenas com variável `VITE_GA_MEASUREMENT_ID`, depois de consentimento de analytics. Consent Mode v2 com `denied` por padrão. Sem Meta Pixel, Google Tag Manager ou tags de publicidade.
- Links externos: WhatsApp (Meta) e Instagram; navegação externa apenas ao clicar.

## 4. Origem e licenças das fotos
Veja `public/assets/photos/CREDITOS-E-LICENCAS.json` (nome original e finalidade de cada foto). Todos os arquivos vieram do usuário; as licenças comerciais **não foram comprovadas** e devem ser documentadas. Uso comercial em produção está pendente.

## 5. Riscos
**ALTO:** licenças dos arquivos; documentos legais publicados com placeholders; promessas numéricas sem validação e discrepância 4 vs 4,16 kWp.
**MÉDIO:** modelo didático da economia 80–90% não contempla todas as situações tarifárias, Fio B e ICMS; controle de dados realizado no WhatsApp precisa de rotina operacional real; ausência de testes empíricos de acessibilidade/Lighthouse.
**BAIXO:** logos e imagens ilustrativas provisórias; dados estruturados/canonical dependem do domínio e precisam de inspeção em produção.

## 6. Jurídico
Os textos legais são **modelos iniciais** e devem ser revisados por advogado(a) antes da publicação. A adequação à LGPD depende de procedimentos operacionais, contratos, segurança e políticas internas — não apenas de uma página de privacidade.

## Validação técnica nesta sessão
- Foi executada uma verificação de sintaxe TypeScript/TSX em todos os 9 arquivos aplicáveis com `typescript.transpileModule`: **0 erros de sintaxe**.
- A folha CSS foi analisada com `postcss.parse`: **sem erro de sintaxe**.
- O arquivo ZIP final foi submetido a verificação de integridade.
- Não foi possível completar `npm install` (timeout de acesso ao registro de pacotes), portanto ainda não foram executados `vite build`, `vitest`, teste visual integrado de React ou auditoria Lighthouse. O projeto fonte está entregue, mas a compilação, as metas de desempenho e a conformidade WCAG **não estão certificadas**; execute os comandos do README em ambiente conectado.
