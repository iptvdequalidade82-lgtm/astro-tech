# Astro Tech Energia Solar

Site institucional de página principal + páginas legais para Astro Tech Energia Solar, no Norte do Paraná. Direção visual escura, fotografias reais fornecidas para o briefing, cor laranja de marca, React + Vite + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + Lucide.

## Instalação e execução

Requisitos: Node.js 20.19+ (ou 22+) e npm. Dentro da pasta do projeto:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra o endereço local informado pelo Vite (em geral `http://localhost:5173`). Para publicação:

```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

A pasta de build é `dist/`. Na Vercel, importe o repositório GitHub, mantenha `Framework Preset: Vite`, `Build Command: npm run build` e `Output Directory: dist`. O arquivo `vercel.json` inclui fallback das rotas SPA e cabeçalhos básicos. HTTPS deve ser usado em produção.

### Configure antes do deploy

1. Substitua `VITE_SITE_URL=https://seu-dominio.com.br` pelo domínio real (ex.: `https://www.exemplo.com.br`). Não publique domínio fictício.
2. Atualize `public/sitemap.xml`, `public/robots.txt`, metadados e URLs de imagens sociais para o domínio final.
3. Confirme razão social, CNPJ, canal LGPD/encarregado aplicável e critérios reais de retenção. Substitua `[PREENCHER]` nas páginas legais.
4. Substitua o **logo provisório** em `BrandMark` e `public/favicon.svg` pelo SVG oficial. Há instruções em `public/assets/brand/LEIA-ME.txt`.
5. Obtenha comprovação de **licença/autorização comercial de todas as fotografias** em `public/assets/photos/CREDITOS-E-LICENCAS.json` ou troque os arquivos por fotos licenciadas. Fotos de bateria/carport/recarga não foram fornecidas; esses serviços usam ícones.
6. Confirme os dados do projeto de Londrina: 8 × 520 W = **4,16 kWp** de potência DC nominal, não 4,00 kWp. A interface usa ≈ 4 kWp enquanto a discrepância não for esclarecida. Fotos do projeto estão marcadas como **ilustrativas**.
7. Revise o simulador com profissional técnico e tarifa real. Não o utilize como proposta financeira ou promessa de economia.
8. Revise os modelos de documentos legais com advogado(a) e valide práticas reais de tratamento de dados antes de publicar.

### Analytics e cookies

Por padrão, não há rastreamento: `VITE_GA_MEASUREMENT_ID` está vazio. Para ativar GA4, configure um ID `G-XXXXXXXXXX` depois de validar as políticas. `src/lib/consent.ts` utiliza **modo básico de consentimento**: não carrega GA4 antes de aceitar estatísticas; Consent Mode v2 parte de `denied`. O usuário pode rejeitar, personalizar e revogar escolhas pelo rodapé. A preferência é gravada somente em `localStorage` (`astro-tech-consent-v1`). O código não inclui Meta Pixel, GTM ou cookies de marketing. Se instalar tags novas, documente e implemente consentimento adequado antes de colocá-las em produção.

### Simulador

Cálculo **ilustrativo**, só no navegador: consumo = conta ÷ tarifa; subtrai disponibilidade de 30/50/100 kWh; fator didático 80–90% para economia compensável; potência preliminar em kWp a partir de 585 kWh/mês ÷ 4 kWp informados; painéis de 520 W arredondados para cima. Não equivale a cálculo regulatório individual ou a uma previsão confiável de faturamento. Conexões em alta tensão requerem estudo específico. O fator 80–90% **não é alíquota legal do Fio B**; a Lei 14.300 tem cronograma próprio de aplicação e depende do enquadramento.

### Arquivos principais

```
src/App.tsx                    Rotas, metadados e dados estruturados
src/pages/Home.tsx             Seções da página e formulários
src/pages/Legal.tsx            Privacidade, termos, cookies e 404
src/components/Shared.tsx      Header, footer, botões, preferências
src/lib/estimate.ts            Fórmulas do simulador
src/lib/consent.ts             Consentimento e GA4 opcional
src/data/site.ts               Dados, serviços, FAQ e WhatsApp
src/styles/main.css            Design system e responsividade
public/assets/photos/         Imagens WebP e licenças pendentes
tests/estimate.test.ts         Testes unitários do simulador
```

### SEO, acessibilidade e desempenho

Implementado: tags básicas e Open Graph; `title`/descrições por rota; canonical condicionada à variável de ambiente válida; JSON-LD LocalBusiness + Service + FAQPage; `robots.txt` e sitemap de base para domínio real; alt descritivo, atributos de dimensão, lazy load abaixo da primeira dobra; skip link, landmarks, `lang=pt-BR`, foco visível, accordion com atributos ARIA, formulários com erros inline, suporte a teclado, `prefers-reduced-motion`. Sem bloqueio de rolagem por animações, exceto menu mobile aberto.

**Importante:** não há certificação automática de WCAG 2.2 AA ou Lighthouse. Antes da produção, execute auditorias de acessibilidade, desempenho, contraste, zoom 200%, dispositivos 360/390/768/1024/1440 px e validação manual de teclado/leitor de tela em um ambiente com dependências instaladas e navegador disponível.

## Fontes técnicas e regulatórias

- Lei 14.300/2022 (fonte oficial): https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14300.htm
- LGPD atualizada: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
- ANPD — incidentes: https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis

Código-fonte para personalização. Verifique as autorizações dos materiais fotográficos antes de qualquer uso comercial.
