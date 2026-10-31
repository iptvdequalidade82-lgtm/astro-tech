import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Menu, X, Instagram, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { BRAND, IMAGE_SIZE, whatsapp } from '../data/site'
import { readConsent, saveConsent, applyAnalyticsConsent } from '../lib/consent'

export function BrandMark({ small = false }: { small?:boolean }) {
  return <div className={`brand ${small?'brand--small':''}`} aria-label="Astro Tech Energia Solar">
    {/* Marcação provisória: substituir pelo logo SVG oficial da empresa. */}
    <svg className="brand__icon" width="46" height="46" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#F07000"/><path d="m35 12-18 26h13l-4 18 21-29H33z" fill="#fff"/><path d="M4 40C16 51 44 48 60 29" fill="none" stroke="#07111F" strokeWidth="3.5" strokeLinecap="round"/></svg>
    <span className="brand__text"><strong>ASTRO TECH<span className="brand__dot">.</span></strong><small>ENERGIA SOLAR</small></span>
  </div>
}

export function Photo({ src, alt, className = '', eager = false }: {src:string;alt:string;className?:string;eager?:boolean}) {
  const size=IMAGE_SIZE[src]||{width:736,height:981}
  return <img src={src} alt={alt} width={size.width} height={size.height} loading={eager?'eager':'lazy'} decoding="async" className={className} />
}

export function ActionLink({ children, href, light=false, outline=false, green=false, className='', onClick }:{children:ReactNode;href:string;light?:boolean;outline?:boolean;green?:boolean;className?:string;onClick?:()=>void}) {
  const cls=`action-link ${light?'action-link--light':''} ${outline?'action-link--outline':''} ${green?'action-link--green':''} ${className}`
  const inner=<>{children}<span className="action-link__icon"><ArrowUpRight size={18} strokeWidth={2.2}/></span></>
  return href.startsWith('#') ? <a className={cls} href={href} onClick={onClick}>{inner}</a> : <a className={cls} href={href} target={href.startsWith('https://wa.me/')?'_blank':undefined} rel={href.startsWith('https://wa.me/')?'noopener noreferrer':undefined} onClick={onClick}>{inner}</a>
}

const links=[{name:'Quem somos',href:'#quem-somos'},{name:'Soluções',href:'#solucoes'},{name:'Como funciona',href:'#como-funciona'},{name:'Simulador',href:'#simulador'},{name:'Dúvidas',href:'#duvidas'}]
export function Header() {
  const [scrolled,setScrolled]=useState(false)
  const [open,setOpen]=useState(false)
  const location=useLocation()
  useEffect(()=>{const watch=()=>setScrolled(window.scrollY>20);watch();window.addEventListener('scroll',watch,{passive:true});return()=>window.removeEventListener('scroll',watch)},[])
  useEffect(()=>{setOpen(false)},[location.pathname,location.hash])
  useEffect(()=>{document.body.classList.toggle('menu-locked',open);return()=>document.body.classList.remove('menu-locked')},[open])
  const onNav=(hash:string)=>{setOpen(false);if(location.pathname!=='/')setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'smooth'}),70)}
  return <header className={`site-header ${scrolled||open||location.pathname!=='/'?'site-header--solid':''}`}>
    <div className="container site-header__inner">
      <Link to="/" aria-label="Página inicial da Astro Tech"><BrandMark/></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(l=><Link key={l.href} to={'/'+l.href} onClick={()=>onNav(l.href)}>{l.name}</Link>)}</nav>
      <a className="header-cta" href={whatsapp()} target="_blank" rel="noopener noreferrer">Orçamento <ArrowUpRight size={18}/></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Fechar menu':'Abrir menu'} onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<Menu size={25}/>}</button>
    </div>
    <div className={`mobile-nav ${open?'mobile-nav--open':''}`} id="mobile-nav" aria-hidden={!open}>
      <nav aria-label="Navegação mobile">{links.map((l,i)=><Link tabIndex={open?0:-1} key={l.href} to={'/'+l.href} onClick={()=>onNav(l.href)}><small>0{i+1}</small>{l.name}<ArrowUpRight size={26}/></Link>)}</nav>
      <a tabIndex={open?0:-1} className="mobile-nav__bottom" href={whatsapp()} target="_blank" rel="noopener noreferrer">Pedir orçamento <ArrowRight size={22}/></a>
    </div>
  </header>
}

export function Footer() {
  return <footer className="footer" id="rodape"><div className="container">
    <div className="footer__top"><div><BrandMark/><p>{BRAND.slogan}</p><span>Atendimento em todo o Norte do Paraná.</span></div><div className="footer__contacts"><span>VAMOS CONVERSAR?</span><a href={whatsapp()} target="_blank" rel="noopener noreferrer">{BRAND.phoneLabel} <ArrowUpRight size={25}/></a><a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18}/> @astrotech_solar</a></div></div>
    <div className="footer__bottom"><span>© {new Date().getFullYear()} Astro Tech Energia Solar</span><div><Link to="/privacidade">Privacidade</Link><Link to="/termos">Termos</Link><Link to="/cookies">Cookies</Link><button type="button" onClick={()=>window.dispatchEvent(new Event('open-cookie-preferences'))}>Preferências de cookies</button></div></div>
    <div className="footer__legal">Razão social: {BRAND.legalName} · CNPJ: {BRAND.cnpj}</div>
    <div className="footer__watermark" aria-hidden="true">ASTRO TECH</div>
  </div></footer>
}

export function FloatingWhatsApp(){return <a className="floating-whatsapp" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento pelo WhatsApp"><MessageCircle size={27} strokeWidth={2.1}/></a>}

export function CookieManager(){
  const [choice,setChoice]=useState(()=>readConsent())
  const [visible,setVisible]=useState(()=>readConsent()===null)
  const [custom,setCustom]=useState(false)
  const [analytics,setAnalytics]=useState(false)
  const [marketing,setMarketing]=useState(false)
  useEffect(()=>{if(choice)applyAnalyticsConsent(choice)},[choice])
  useEffect(()=>{const open=()=>{setAnalytics(choice?.analytics??false);setMarketing(choice?.marketing??false);setCustom(true);setVisible(true)};window.addEventListener('open-cookie-preferences',open);return()=>window.removeEventListener('open-cookie-preferences',open)},[choice])
  const commit=(a:boolean,m:boolean)=>{const revoked=choice?.analytics&&!a;const next=saveConsent(a,m);setChoice(next);setVisible(false);setCustom(false);if(revoked){for(const key of document.cookie.split('; ').map(item=>item.split('=')[0]).filter(name=>name.startsWith('_ga'))){document.cookie=`${key}=; Max-Age=0; path=/; SameSite=Lax`;}window.location.reload()}}
  if(!visible)return null
  return <div className="cookie-overlay"><div className="cookie-card" role="dialog" aria-modal="false" aria-label="Preferências de cookies">
    <div className="cookie-card__intro"><span className="eyebrow eyebrow--dark">SUA PRIVACIDADE</span><h2>Você escolhe o que fica ativo.</h2><p>Usamos armazenamento necessário para lembrar sua escolha. Estatísticas são opcionais e só serão ativadas com sua autorização. <Link to="/cookies">Entenda os cookies</Link>.</p></div>
    {custom&&<div className="cookie-settings"><label><span><strong>Necessários</strong><small>Guardar sua preferência de consentimento.</small></span><input type="checkbox" checked readOnly disabled aria-label="Cookies necessários sempre ativos"/></label><label><span><strong>Estatísticas (GA4)</strong><small>Medir visitas, se configurado.</small></span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label><label><span><strong>Marketing</strong><small>Nenhum rastreador de marketing instalado neste projeto.</small></span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)} disabled/></label></div>}
    <div className="cookie-actions">
      <button onClick={()=>commit(true,false)}>Aceitar todos</button>
      <button onClick={()=>commit(false,false)}>Rejeitar não necessários</button>
      <button onClick={()=>custom?commit(analytics,false):setCustom(true)}>{custom?'Salvar preferências':'Personalizar'}</button>
    </div>
  </div></div>
}

export function SectionHeader({ eyebrow,title,highlight,description, light=false }:{eyebrow:string;title:string;highlight?:string;description?:string;light?:boolean}) {
  return <div className={`section-heading reveal ${light?'section-heading--light':''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}{highlight&&<> <em>{highlight}</em></>}</h2>{description&&<p>{description}</p>}</div>
}

export function ContactTeaser(){return <div className="contact-teaser"><span>PRONTO PARA CONVERSAR?</span><a href={whatsapp()} target="_blank" rel="noopener noreferrer">Falar sobre meu projeto <Phone size={18}/></a></div>}
