import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CookieManager, FloatingWhatsApp, Footer, Header } from './components/Shared'
import { BRAND, faqs } from './data/site'
import Home from './pages/Home'
import { Cookies, Privacy, Terms, NotFound } from './pages/Legal'

type Metadata = { title: string; description: string }
const metadata: Record<string, Metadata> = {
  '/': {
    title: 'Astro Tech | Energia Solar no Norte do Paraná',
    description: 'Projeto e instalação de energia solar em Londrina e todo o Norte do Paraná. Soluções residenciais, empresariais, industriais e rurais. Peça seu orçamento.',
  },
  '/privacidade': {title:'Política de Privacidade | Astro Tech',description:'Entenda como a Astro Tech trata os dados pessoais enviados pelo WhatsApp e as opções para exercer seus direitos.'},
  '/termos': {title:'Termos de Uso | Astro Tech',description:'Condições de uso do site e informações sobre o simulador ilustrativo de energia solar da Astro Tech.'},
  '/cookies': {title:'Política de Cookies | Astro Tech',description:'Saiba quais recursos de armazenamento e medição são utilizados no site da Astro Tech e como alterar suas preferências.'},
}
function upsertMeta(name: string, content: string, property = false){
  const key=property?'property':'name'
  let el=document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`)
  if(!el){el=document.createElement('meta');el.setAttribute(key,name);document.head.appendChild(el)}
  el.content=content
}
function PageEffects(){
  const {pathname,hash}=useLocation()
  useEffect(()=>{
    const next=metadata[pathname]||{title:'Página não encontrada | Astro Tech',description:'Volte à página inicial da Astro Tech Energia Solar.'}
    document.title=next.title
    upsertMeta('description',next.description)
    upsertMeta('og:title',next.title,true)
    upsertMeta('og:description',next.description,true)
    const siteUrl=import.meta.env.VITE_SITE_URL as string|undefined
    let base: URL|null=null
    try{const candidate=new URL(siteUrl||'');if(candidate.protocol==='https:'&&!candidate.hostname.includes('seu-dominio'))base=candidate}catch{/* Sem domínio confirmado, não publicar URL fictícia */}
    const existing=document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if(base){upsertMeta('og:image',new URL('/assets/photos/usina-por-do-sol.webp',base).href,true);const url=new URL(pathname,base).href;const link=existing||document.createElement('link');link.rel='canonical';link.href=url;if(!existing)document.head.appendChild(link);upsertMeta('og:url',url,true)}
    else {existing?.remove();document.querySelector('meta[property="og:url"]')?.remove()}
    document.querySelector('#astro-structured-data')?.remove()
    if(pathname==='/'){
      const jsonld={
        '@context':'https://schema.org','@graph':[
          {'@type':'LocalBusiness','@id':'#astro-tech',name:BRAND.name,description:'Projeto e instalação de sistemas solares fotovoltaicos.',telephone:BRAND.phoneLabel,areaServed:{'@type':'AdministrativeArea',name:'Norte do Paraná, Brasil'},sameAs:[BRAND.instagram],url:base?.href},
          {'@type':'Service',serviceType:'Projeto e instalação de energia solar fotovoltaica',provider:{'@id':'#astro-tech'},areaServed:{'@type':'AdministrativeArea',name:'Norte do Paraná'},availableChannel:{'@type':'ServiceChannel',serviceUrl:'https://wa.me/5543988130712'}},
          {'@type':'FAQPage',mainEntity:faqs.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
        ],
      }
      const script=document.createElement('script');script.id='astro-structured-data';script.type='application/ld+json';script.textContent=JSON.stringify(jsonld);document.head.appendChild(script)
    }
  },[pathname])
  useEffect(()=>{
    const timer=window.setTimeout(()=>{if(hash){document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({block:'start',behavior:'auto'})}else{window.scrollTo({top:0,behavior:'auto'})}},70)
    return()=>window.clearTimeout(timer)
  },[pathname,hash])
  return null
}
export default function App(){return <><PageEffects/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/privacidade" element={<Privacy/>}/><Route path="/termos" element={<Terms/>}/><Route path="/cookies" element={<Cookies/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/><FloatingWhatsApp/><CookieManager/></>}
