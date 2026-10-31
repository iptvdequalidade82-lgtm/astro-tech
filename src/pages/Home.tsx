import { useEffect, useMemo, useState, useRef, type FormEvent } from 'react'
import { ArrowDown, ArrowUpRight, BatteryCharging, Check, ChevronDown, FileCheck2, MapPin, PlugZap, ShieldCheck, Sun, Zap, CarFront, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ActionLink, Photo, SectionHeader } from '../components/Shared'
import { faqs, PHOTO, services, whatsapp } from '../data/site'
import { calculateEstimate, decimal, money, type Connection, type Segment } from '../lib/estimate'

gsap.registerPlugin(ScrollTrigger)

function useScrollAnimations(){
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(reduced)return
    const ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>{
        gsap.fromTo(el,{opacity:0,y:34},{opacity:1,y:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 93%',once:true}})
      })
      gsap.fromTo('.hero__copy > *',{opacity:0,y:30},{opacity:1,y:0,duration:1,ease:'power3.out',stagger:.12,delay:.12,clearProps:'all'})
      gsap.fromTo('.hero__visual',{opacity:0,scale:1.035},{opacity:1,scale:1,duration:1.5,ease:'power2.out',delay:.3,clearProps:'all'})
      gsap.utils.toArray<HTMLElement>('.process__image img, .delivered__photo img').forEach(el=>{
        gsap.fromTo(el,{y:-18,scale:1.08},{y:18,scale:1.08,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}})
      })
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el=>{
        const target=Number(el.dataset.count)
        if(!Number.isFinite(target))return
        const state={value:0}
        gsap.to(state,{value:target,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 93%',once:true},onUpdate:()=>{el.textContent=Math.round(state.value).toLocaleString('pt-BR')}})
      })
    })
    return()=>ctx.revert()
  },[])
}

function Eyebrow({children}:{children:React.ReactNode}){return <span className="eyebrow">{children}</span>}

function Hero(){return <section className="hero" aria-labelledby="hero-title">
  <div className="container hero__grid">
    <div className="hero__copy">
      <div className="hero__tag"><span className="hero__tag-sun"><Sun size={14}/></span> ENERGIA SOLAR <i/> NORTE DO PARANÁ</div>
      <h1 id="hero-title">O SOL<br/>TRABALHA.<br/><span>VOCÊ<br className="hero__mobile-break"/> ECONOMIZA.</span></h1>
      <p>Energia solar pensada para a sua realidade. Do primeiro cálculo à instalação, a gente cuida de cada etapa com você.</p>
      <div className="hero__actions"><ActionLink href={whatsapp()}>Pedir orçamento</ActionLink><a className="hero__secondary" href="#simulador">Simular economia <ArrowDown size={18}/></a></div>
      <div className="hero__stats"><div><strong>≈ 4 kWp</strong><span>Usina entregue em Londrina</span></div><div><strong>60 meses</strong><span>Validade dos créditos*</span></div><div><strong>Norte do PR</strong><span>Atendimento regional</span></div></div>
    </div>
    <div className="hero__visual"><div className="hero__image-wrap"><Photo src={PHOTO.hero} alt="Usina de painéis solares ao pôr do sol, sob céu alaranjado" eager className="hero__image"/><div className="hero__image-overlay"/><div className="hero__image-caption"><span>ENERGIA QUE FAZ SENTIDO</span><span>01 / 06</span></div></div>
      <div className="hero__photo-inset"><Photo src={PHOTO.worker} alt="Profissional caminhando entre fileiras de módulos fotovoltaicos"/></div>
      <div className="hero__seal" aria-label="Energia que vem do sol"><svg viewBox="0 0 130 130" role="presentation"><defs><path id="circle-words" d="M65 65m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0"/></defs><text fill="currentColor" fontSize="9.7" letterSpacing="2.9"><textPath href="#circle-words">ASTRO TECH · ENERGIA SOLAR · </textPath></text><circle cx="65" cy="65" r="27" fill="#F07000"/><path d="m68 45-17 23h13l-3 17 19-25H66z" fill="#fff"/></svg></div>
      <div className="hero__float"><span>O SEU PROJETO</span><strong>DO SEU JEITO<span>.</span></strong><ArrowUpRight size={22}/></div>
    </div>
  </div><div className="hero__footnote">*Conforme regras aplicáveis ao sistema de compensação de energia.</div>
</section>}

const marqueeTerms=['RESIDENCIAL','EMPRESARIAL','INDUSTRIAL','RURAL','BATERIAS','CARPORT SOLAR','MOBILIDADE ELÉTRICA']
function Marquee(){return <div className="marquee" aria-label="Soluções: residencial, empresarial, industrial, rural, baterias, carport e mobilidade elétrica"><div className="marquee__track" aria-hidden="true">{[0,1].map(n=><div key={n} className="marquee__items">{marqueeTerms.map(x=><span key={x}>{x}<Sun size={19} strokeWidth={2.6}/></span>)}</div>)}</div></div>}

function About(){return <section id="quem-somos" className="about section-pad"><div className="container about__grid">
  <div className="about__photos reveal"><div className="about__main-photo"><Photo src={PHOTO.install} alt="Técnicos posicionando módulo solar durante uma instalação"/></div><div className="about__small-photo"><Photo src={PHOTO.roof} alt="Vista próxima de placas fotovoltaicas em telhado"/></div><div className="about__number"><span>PROJETO EM LONDRINA / PR</span><div><b data-count="585">585</b> <small>kWh / mês</small></div><p>Geração média informada</p></div></div>
  <div className="about__copy"><Eyebrow>01 — QUEM SOMOS</Eyebrow><h2 className="display-title reveal">PROJETO PRO<br/>SEU CONSUMO.<br/><span>NÃO KIT DE<br/>PRATELEIRA.</span></h2><p className="reveal">Cada endereço tem uma necessidade. Por isso, a Astro Tech começa entendendo sua conta de luz e o que você espera economizar. Depois vem a solução: do tamanho certo para a sua rotina.</p><ul className="check-list reveal"><li><Check/> Análise da sua conta sem compromisso</li><li><Check/> Projeto explicado, sem complicação</li><li><Check/> Acompanhamento da homologação na distribuidora</li><li><Check/> Conversa direta pelo WhatsApp</li></ul><ActionLink href={whatsapp('Olá! Quero entender qual projeto solar combina com o meu consumo.')}>Conhecer meu projeto</ActionLink></div>
</div></section>}

function Solutions(){const extra=[{icon:BatteryCharging,title:'O SOL GERA. A BATERIA GUARDA.',tag:'ARMAZENAMENTO',text:'Armazenamento pensado para as necessidades da sua instalação.'},{icon:CarFront,title:'CADA VAGA PODE GERAR VALOR.',tag:'CARPORT SOLAR',text:'Coberturas de estacionamento que também captam energia.'},{icon:PlugZap,title:'SEU ENDEREÇO NA ROTA ELÉTRICA.',tag:'MOBILIDADE',text:'Infraestrutura de recarga para veículos elétricos.'}]
return <section id="solucoes" className="solutions section-pad"><div className="container">
  <div className="solutions__heading"><SectionHeader eyebrow="02 — NOSSAS SOLUÇÕES" title="ENERGIA PARA" highlight="CADA CENÁRIO." description="Da casa ao campo, cada instalação começa com a mesma pergunta: o que faz sentido para você?"/><a className="text-arrow" href={whatsapp()} target="_blank" rel="noopener noreferrer">Quero conversar <ArrowUpRight size={19}/></a></div>
  <div className="solutions__scroller" aria-label="Soluções de energia solar">{services.map(s=><a className="solution-card reveal" href={whatsapp(`Olá! Vim pelo site e quero um orçamento de energia solar ${s.id}.`)} target="_blank" rel="noopener noreferrer" key={s.id} aria-label={`Pedir orçamento de energia solar ${s.id}`}><Photo src={s.image} alt={s.alt}/><div className="solution-card__shade"/><span className="solution-card__num">{s.num} / 04</span><div className="solution-card__copy"><span>ENERGIA SOLAR</span><h3>{s.title}</h3><p>{s.sub}</p></div><span className="solution-card__arrow"><ArrowUpRight size={26}/></span></a>)}</div>
  <div className="solutions__extra"><div className="solutions__extra-header"><span>ALÉM DOS PAINÉIS</span><p>Mais possibilidades para aproveitar a energia.</p></div><div className="solutions__extra-cards">{extra.map(v=><a key={v.tag} className="extra-card reveal" href={whatsapp(`Olá! Quero saber mais sobre ${v.tag.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer"><span className="extra-card__top"><v.icon size={33} strokeWidth={1.5}/><ArrowUpRight size={20}/></span><span className="extra-card__bottom"><small>{v.tag}</small><h3>{v.title}</h3><p>{v.text}</p></span></a>)}</div></div>
</div></section>}

function Process(){const steps=[{n:'01',title:'MANDE SUA CONTA',text:'Você mostra seu consumo e conta o que precisa.'},{n:'02',title:'A GENTE DESENHA',text:'Avaliamos as condições e preparamos o projeto.'},{n:'03',title:'VAMOS INSTALAR',text:'Cuidamos da instalação e do processo de homologação.'},{n:'04',title:'ACOMPANHE',text:'Orientamos você sobre o monitoramento do sistema.'}]
return <section id="como-funciona" className="process section-pad"><div className="container"><div className="process__top"><SectionHeader eyebrow="03 — COMO FUNCIONA" title="SIMPLES DE" highlight="ENTENDER." description="Você sabe o que está acontecendo em cada etapa — sem surpresa no meio do caminho." light/></div><div className="process__grid"><div className="process__image reveal"><Photo src={PHOTO.worker} alt="Técnico caminhando entre painéis solares de uma usina"/><div className="process__image-shade"/><div className="process__badge"><FileCheck2 size={25}/><strong>A PAPELADA<br/>É COM A GENTE.</strong></div></div><div className="process__steps">{steps.map(s=><div className="process-step reveal" key={s.n}><span className="process-step__n">{s.n}</span><div><h3>{s.title}</h3><p>{s.text}</p></div><ArrowUpRight size={19}/></div>)}<a className="process__chat" href={whatsapp()} target="_blank" rel="noopener noreferrer">Falar com a Astro Tech <ArrowUpRight size={19}/></a></div></div></div></section>}

const SEGS:Segment[]=['Residencial','Empresarial','Industrial','Rural']
function Simulator(){
  const [bill,setBill]=useState('500')
  const [segment,setSegment]=useState<Segment>('Residencial')
  const [tariff,setTariff]=useState('0,95')
  const [connection,setConnection]=useState<Connection>('bi')
  const [advanced,setAdvanced]=useState(false)
  const tariffNumber=Number(tariff.replace(',','.'))
  const billNumber=Number(bill.replace(',','.'))
  const result=useMemo(()=>calculateEstimate({bill:billNumber,tariff:tariffNumber,segment,connection}),[billNumber,tariffNumber,segment,connection])
  const maxOk=Number.isFinite(billNumber)&&billNumber>0&&billNumber<=1000000
  const tariffOk=Number.isFinite(tariffNumber)&&tariffNumber>.01&&tariffNumber<=10
  const valid=maxOk&&tariffOk&&!!result
  function changeSegment(s:Segment){setSegment(s);setConnection(s==='Empresarial'||s==='Industrial'?'tri':'bi')}
  const details=result?`Segmento: ${segment}\nConta média: ${money(billNumber)}\nTarifa estimada: R$ ${decimal(tariffNumber,2)}/kWh\nLigação: ${connection}\nEconomia mensal estimada: ${money(result.monthlyMin)} a ${money(result.monthlyMax)}\nEconomia anual estimada: ${money(result.annualMin)} a ${money(result.annualMax)}\nDimensionamento preliminar: ${decimal(result.kwp,2)} kWp | ${result.panels} painéis de 520 W.\n*Estimativa ilustrativa sujeita a análise técnica e regras tarifárias.`:''
  return <section id="simulador" className="simulator section-pad"><div className="container simulator__grid"><div className="simulator__intro"><Eyebrow>04 — SIMULE SUA ECONOMIA</Eyebrow><h2 className="display-title reveal">SUA CONTA<br/>TEM <span>OUTRO<br/>FUTURO.</span></h2><p className="reveal">Coloque o valor médio da sua conta e veja uma estimativa inicial do que a energia solar poderia representar para você.</p><div className="simulator__deco reveal"><Sun size={78} strokeWidth={1}/><span>UM PRIMEIRO CÁLCULO.<br/>SEM COMPROMISSO.</span></div></div>
    <div className="simulator__panel reveal"><div className="simulator__panel-top"><span>SIMULADOR DE ENERGIA SOLAR</span><span>01 / 01</span></div><div className="simulator__controls"><label htmlFor="bill">Quanto vem sua conta de luz?</label><div className="money-input"><span>R$</span><input id="bill" type="number" min="1" max="1000000" step="1" inputMode="decimal" value={bill} onChange={e=>setBill(e.target.value)} aria-invalid={!maxOk} aria-describedby={!maxOk?'bill-error':undefined}/><small>/ mês</small></div>{!maxOk&&<p id="bill-error" className="field-error" role="alert">Informe uma conta mensal entre R$ 1 e R$ 1.000.000.</p>}
      <label htmlFor="segment">Onde é esse consumo?</label><div className="select-wrap"><select id="segment" value={segment} onChange={e=>changeSegment(e.target.value as Segment)}>{SEGS.map(s=><option key={s}>{s}</option>)}</select><ChevronDown size={19}/></div>
      <button type="button" className="advanced-toggle" aria-expanded={advanced} onClick={()=>setAdvanced(!advanced)}>Ajustar detalhes do cálculo <ChevronDown className={advanced?'rotated':''} size={18}/></button>
      {advanced&&<div className="advanced-panel"><label htmlFor="tariff">Tarifa de referência (R$/kWh)</label><input id="tariff" type="text" inputMode="decimal" value={tariff} onChange={e=>setTariff(e.target.value)} aria-invalid={!tariffOk} aria-describedby={!tariffOk?'tariff-error':undefined}/>{!tariffOk&&<p id="tariff-error" className="field-error">Informe tarifa entre R$ 0,02 e R$ 10,00/kWh.</p>}<label htmlFor="connection">Tipo de ligação</label><div className="select-wrap"><select id="connection" value={connection} onChange={e=>setConnection(e.target.value as Connection)}><option value="mono">Monofásica (30 kWh)</option><option value="bi">Bifásica (50 kWh)</option><option value="tri">Trifásica (100 kWh)</option></select><ChevronDown size={19}/></div></div>}</div>
      <div className="simulator__result" aria-live="polite"><div className="simulator__result-label">SUA ECONOMIA ESTIMADA POR MÊS <Zap size={16}/></div><div className="simulator__result-value">{valid&&result?<><strong>{money(result.monthlyMin)}</strong><span>até {money(result.monthlyMax)}</span></>:<span className="simulator__invalid">Revise os valores acima.</span>}</div>{valid&&result&&<><div className="simulator__mini-results"><div><span>NO ANO</span><strong>{money(result.annualMin)} – {money(result.annualMax)}</strong></div><div><span>SISTEMA ESTIMADO</span><strong>{decimal(result.kwp,2)} kWp</strong></div><div><span>PAINÉIS DE 520 W</span><strong>{result.panels} unidades</strong></div></div>{result.isLargeBill&&<p className="simulator__large"><ShieldCheck size={16}/> Conta acima de R$ 10 mil: requer análise tarifária e técnica específica.</p>}</>}
      </div><a className={`simulator__cta ${!valid?'simulator__cta--disabled':''}`} href={valid?whatsapp(`Olá! Vim pelo simulador Astro Tech e quero um orçamento.\n\n${details}`):undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!valid} onClick={e=>{if(!valid)e.preventDefault()}}>Enviar minha simulação <ArrowUpRight size={20}/></a><p className="simulator__disclaimer">Estimativa ilustrativa para referência de baixa tensão, calculada com fator de 80% a 90%, sem representar uma tarifa ou percentual legal fixo. O valor real depende do consumo, tarifa, telhado, irradiação e regras aplicáveis; confirmado após análise técnica. Empreendimentos em alta tensão precisam de avaliação individual.</p><p className="simulator__formula">Base do cálculo: conta ÷ tarifa; desconto de 30/50/100 kWh; geração de referência de 585 kWh/mês para ≈ 4 kWp informados em um projeto. Dados não são enviados nem armazenados pelo site.</p>
    </div></div></section>
}

function Delivered(){return <section className="delivered section-pad"><div className="container delivered__grid"><div className="delivered__copy"><Eyebrow>05 — PROJETO ENTREGUE</Eyebrow><h2 className="display-title reveal">DO PAPEL<br/>PRO TELHADO.<br/><span>EM LONDRINA.</span></h2><p className="reveal">Uma usina residencial entregue em Londrina/PR. Dados de geração informados para esse projeto, que serve como referência do nosso trabalho — não como promessa de desempenho para outros imóveis.</p><div className="delivered__metrics reveal"><div><strong data-count="8">8</strong><span>PLACAS DE 520 W</span></div><div><strong>≈ 4 <small>kWp</small></strong><span>POTÊNCIA INFORMADA</span></div><div><strong data-count="585">585</strong><span>kWh/MÊS EM MÉDIA</span></div></div><ActionLink outline href={whatsapp('Olá! Vi o projeto de Londrina e quero conversar sobre o meu.')}>Quero um projeto assim</ActionLink></div><div className="delivered__photo reveal"><Photo src={PHOTO.roof} alt="Imagem ilustrativa de painéis fotovoltaicos em telhado; não retrata a usina de Londrina"/><span className="delivered__photo-label">IMAGEM ILUSTRATIVA</span></div></div></section>}

function Differences(){const items=[{ico:Sun,title:'DO SEU TAMANHO.',text:'A proposta parte do seu consumo e das condições do imóvel.'},{ico:FileCheck2,title:'CUIDAMOS DAS ETAPAS.',text:'Orientamos o projeto e o processo com a distribuidora.'},{ico:MessageCircle,title:'CONVERSA DIRETA.',text:'Você fala com a Astro Tech sem abrir chamado em vários lugares.'},{ico:MapPin,title:'PERTINHO DE VOCÊ.',text:'Atendimento em todo o Norte do Paraná.'}]
return <section className="differences section-pad"><div className="container"><SectionHeader eyebrow="06 — NOSSO JEITO DE FAZER" title="SEM KIT PRONTO." highlight="SEM ENROLAÇÃO." description="Energia solar é investimento. Você merece entender exatamente o que está contratando."/><div className="differences__grid">{items.map((v,i)=><div className="difference reveal" key={v.title}><div className="difference__num">0{i+1}</div><v.ico size={30} strokeWidth={1.5}/><h3>{v.title}</h3><p>{v.text}</p><div className="difference__rule"/></div>)}</div></div></section>}

function FAQ(){const [open,setOpen]=useState<number|null>(0)
return <section id="duvidas" className="faq section-pad"><div className="container faq__grid"><div><Eyebrow>07 — PERGUNTAS FREQUENTES</Eyebrow><h2 className="display-title reveal">SEM<br/>DÚVIDAS.<br/><span>SEM MISTÉRIO.</span></h2><p className="reveal">Antes de investir, vale entender. Reunimos respostas diretas para as perguntas que mais fazem diferença.</p><a href={whatsapp('Olá! Tenho uma dúvida sobre energia solar.')} target="_blank" rel="noopener noreferrer" className="text-arrow text-arrow--dark">Minha dúvida é outra <ArrowUpRight size={19}/></a></div><div className="faq__items">{faqs.map((f,i)=><div className={`faq-item ${open===i?'faq-item--open':''}`} key={f.q}><h3><button type="button" aria-expanded={open===i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={()=>setOpen(open===i?null:i)}><span className="faq-item__index">0{i+1}</span><span>{f.q}</span><span className="faq-item__toggle"><ChevronDown size={21}/></span></button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={open!==i}><p>{f.a}</p></div></div>)}</div></div></section>}

type FormKey = 'name'|'city'|'segment'|'bill'|'accept'
type FormErrors = Partial<Record<FormKey,string>>
function LeadForm(){const [name,setName]=useState(''),[city,setCity]=useState(''),[segment,setSegment]=useState<Segment>('Residencial'),[bill,setBill]=useState(''),[accept,setAccept]=useState(false),[errors,setErrors]=useState<FormErrors>({})
  const nameRef=useRef<HTMLInputElement>(null), cityRef=useRef<HTMLInputElement>(null),billRef=useRef<HTMLInputElement>(null),acceptRef=useRef<HTMLInputElement>(null)
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const next:FormErrors={}
    if(name.trim().length<2)next.name='Informe seu nome (mínimo de 2 caracteres).'
    if(city.trim().length<2)next.city='Informe sua cidade.'
    if(bill.trim()&&(!Number.isFinite(Number(bill))||Number(bill)<=0||Number(bill)>1000000))next.bill='Informe um valor positivo válido ou deixe em branco.'
    if(!accept)next.accept='É necessário confirmar a leitura da Política de Privacidade.'
    setErrors(next)
    const first=(['name','city','bill','accept'] as const).find(key=>next[key]);if(first){({name:nameRef,city:cityRef,bill:billRef,accept:acceptRef}[first]).current?.focus();return}
    const msg=`Olá! Vim pelo site da Astro Tech e quero um orçamento.\nNome: ${name.trim()}\nCidade: ${city.trim()}\nSegmento: ${segment}\nConta média: ${bill.trim()?money(Number(bill)):'Não informada'}\nLi a Política de Privacidade e solicito contato para orçamento.`
    const url=whatsapp(msg)
    window.location.assign(url)
  }
return <form className="lead-form" onSubmit={submit} noValidate><div className="lead-form__top"><span>CONTE SOBRE O SEU PROJETO</span><span>↗</span></div><div className="lead-form__row"><div><label htmlFor="lead-name">Seu nome *</label><input ref={nameRef} id="lead-name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?" aria-invalid={!!errors.name} aria-describedby={errors.name?'lead-name-error':undefined}/>{errors.name&&<p className="field-error" id="lead-name-error" aria-live="polite">{errors.name}</p>}</div><div><label htmlFor="lead-city">Sua cidade *</label><input ref={cityRef} id="lead-city" autoComplete="address-level2" value={city} onChange={e=>setCity(e.target.value)} placeholder="Ex.: Jacarezinho" aria-invalid={!!errors.city} aria-describedby={errors.city?'lead-city-error':undefined}/>{errors.city&&<p className="field-error" id="lead-city-error" aria-live="polite">{errors.city}</p>}</div></div><div className="lead-form__row"><div><label htmlFor="lead-segment">Tipo de projeto *</label><div className="select-wrap"><select id="lead-segment" value={segment} onChange={e=>setSegment(e.target.value as Segment)}>{SEGS.map(s=><option key={s}>{s}</option>)}</select><ChevronDown size={17}/></div></div><div><label htmlFor="lead-bill">Conta média (R$, opcional)</label><input ref={billRef} id="lead-bill" type="number" inputMode="numeric" min="1" max="1000000" step="1" value={bill} onChange={e=>setBill(e.target.value)} placeholder="Ex.: 450" aria-invalid={!!errors.bill} aria-describedby={errors.bill?'lead-bill-error':undefined}/>{errors.bill&&<p className="field-error" id="lead-bill-error" aria-live="polite">{errors.bill}</p>}</div></div><label className="lead-form__consent"><input ref={acceptRef} type="checkbox" checked={accept} onChange={e=>setAccept(e.target.checked)} aria-invalid={!!errors.accept} aria-describedby={errors.accept?'lead-consent-error':undefined}/><span>Li a <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a> e quero enviar estes dados pelo WhatsApp. *</span></label>{errors.accept&&<p className="field-error" id="lead-consent-error" aria-live="polite">{errors.accept}</p>}<button className="lead-form__submit" type="submit">Continuar no WhatsApp <ArrowUpRight size={21}/></button><p className="lead-form__foot">Ao enviar, abriremos o WhatsApp com seus dados preenchidos. Nada é salvo neste site.</p></form>}

function FinalCTA(){return <section className="final-cta section-pad" id="orcamento"><div className="final-cta__background"><Photo src={PHOTO.aerial} alt="Vista aérea de uma grande instalação fotovoltaica no campo"/></div><div className="final-cta__overlay"/><div className="container final-cta__grid"><div className="final-cta__copy"><Eyebrow>08 — SEU PRÓXIMO PASSO</Eyebrow><h2 className="display-title reveal">SUA PRÓXIMA<br/>CONTA PODE VIR<br/><span>BEM MENOR.</span></h2><p className="reveal">A primeira conversa é simples. Você conta o que precisa. A gente mostra por onde começar.</p><ActionLink green href={whatsapp()}>Conversar agora</ActionLink><div className="final-cta__region"><MapPin size={17}/> Atendimento em todo o Norte do Paraná</div></div><LeadForm/></div></section>}

export default function Home(){useScrollAnimations();return <main id="conteudo"><Hero/><Marquee/><About/><Solutions/><Process/><Simulator/><Delivered/><Differences/><FAQ/><FinalCTA/></main>}
