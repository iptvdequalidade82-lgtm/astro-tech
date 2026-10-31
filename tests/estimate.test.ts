import { describe, expect, it } from 'vitest'
import { calculateEstimate } from '../src/lib/estimate'
const base={bill:500,tariff:.95,connection:'bi' as const,segment:'Residencial' as const}
describe('simulador ilustrativo',()=>{
 it('calcula consumo, custo de disponibilidade e faixa corretamente',()=>{
  const r=calculateEstimate(base)!
  expect(r.consumptionKwh).toBeCloseTo(500/.95)
  expect(r.compensableKwh).toBeCloseTo(500/.95-50)
  expect(r.monthlyMin).toBeCloseTo((500/.95-50)*.95*.8)
  expect(r.monthlyMax).toBeCloseTo((500/.95-50)*.95*.9)
  expect(r.annualMin).toBeCloseTo(r.monthlyMin*12)
  expect(r.panels).toBe(Math.ceil(r.kwp/.52))
 })
 it('nunca oferece economia negativa',()=>{const r=calculateEstimate({...base,bill:20})!;expect(r.monthlyMin).toBe(0);expect(r.kwp).toBe(0);expect(r.panels).toBe(0)})
 it('recusa valores inválidos',()=>{expect(calculateEstimate({...base,bill:-1})).toBeNull();expect(calculateEstimate({...base,tariff:0})).toBeNull()})
 it('sinaliza contas elevadas',()=>{expect(calculateEstimate({...base,bill:10001})!.isLargeBill).toBe(true)})
})
