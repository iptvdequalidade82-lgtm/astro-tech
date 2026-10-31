export const BRAND = {
  name: 'Astro Tech Energia Solar',
  shortName: 'Astro Tech',
  slogan: 'Adicionando energia verde à sua vida',
  region: 'Todo o Norte do Paraná',
  phoneLabel: '(43) 98813-0712',
  phone: '5543988130712',
  instagram: 'https://www.instagram.com/astrotech_solar/',
  legalName: '[PREENCHER — RAZÃO SOCIAL]',
  cnpj: '[PREENCHER — CNPJ]',
  privacyContact: 'WhatsApp (43) 98813-0712',
}
export const PHOTO = {
  hero: '/assets/photos/usina-por-do-sol.webp',
  roof: '/assets/photos/telhado-solar.webp',
  ground: '/assets/photos/usina-solo.webp',
  install: '/assets/photos/instalacao-tecnicos.webp',
  worker: '/assets/photos/tecnico-usina.webp',
  aerial: '/assets/photos/vista-aerea-rural.webp',
}
export const IMAGE_SIZE: Record<string, {width:number;height:number}> = {
  [PHOTO.hero]: {width:736,height:743},
  [PHOTO.roof]: {width:564,height:752},
  [PHOTO.ground]: {width:736,height:981},
  [PHOTO.install]: {width:668,height:1000},
  [PHOTO.worker]: {width:736,height:981},
  [PHOTO.aerial]: {width:736,height:1104},
}
export function whatsapp(message = 'Olá! Vim pelo site e quero um orçamento de energia solar.') {
  return `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(message)}`
}
export const services = [
  { id:'residencial',title:'RESIDENCIAL',sub:'Mais controle sobre o gasto da sua casa.', image:PHOTO.roof,alt:'Módulos fotovoltaicos instalados sobre um telhado',num:'01' },
  { id:'empresarial',title:'EMPRESARIAL',sub:'Energia que acompanha o ritmo do seu negócio.', image:PHOTO.ground,alt:'Painéis fotovoltaicos organizados em uma usina de solo',num:'02' },
  { id:'industrial',title:'INDUSTRIAL',sub:'Projeto dimensionado para grandes consumos.', image:PHOTO.install,alt:'Profissionais instalando um módulo de energia solar',num:'03' },
  { id:'rural',title:'RURAL',sub:'O campo também produz energia.', image:PHOTO.aerial,alt:'Vista aérea de fileiras de painéis solares em área rural',num:'04' },
] as const
export const faqs = [
  {q:'Como a energia solar diminui a conta de luz?',a:'Os painéis geram eletricidade durante o dia. O excedente pode ser enviado à rede e gerar créditos, conforme as regras do sistema de compensação. Taxas e componentes mínimos da fatura ainda podem ser cobrados.'},
  {q:'Quanto tempo leva para instalar?',a:'Depende do porte do projeto, das condições do imóvel, da disponibilidade de equipamentos e dos procedimentos e prazos da distribuidora. Apresentamos as etapas depois de avaliar seu caso.'},
  {q:'Os painéis precisam de manutenção?',a:'Sim. Limpeza quando necessária, inspeções e acompanhamento de desempenho ajudam a manter o sistema em boas condições. A frequência depende do ambiente e das orientações dos fabricantes.'},
  {q:'Funciona em dias nublados?',a:'Sim, mas a geração costuma ser menor porque há menos irradiação. Por isso, o projeto considera as condições locais e a média de consumo.'},
  {q:'O que muda com a Lei 14.300?',a:'A Lei 14.300/2022 definiu regras para a geração distribuída e uma transição de cobrança de componentes de uso da rede para determinadas conexões. Créditos de energia expiram após 60 meses. O enquadramento depende da data de solicitação e das características da unidade.'},
  {q:'Vale a pena instalar uma bateria?',a:'A bateria pode armazenar energia para usos específicos, inclusive sistemas projetados para backup. Um sistema fotovoltaico convencional conectado à rede geralmente desliga quando falta energia, por segurança. A solução adequada depende do seu objetivo e da instalação.'},
] as const
