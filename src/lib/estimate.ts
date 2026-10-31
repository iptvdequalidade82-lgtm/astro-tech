export type Segment = 'Residencial'|'Empresarial'|'Industrial'|'Rural'
export type Connection = 'mono'|'bi'|'tri'

export const AVAILABILITY_KWH: Record<Connection, number> = { mono:30, bi:50, tri:100 }
export const KWH_PER_KWP_MONTH = 585 / 4 // dado informado no briefing; conferir potência de 8 x 520 W (4,16 kWp)
export const PANEL_KWP = 0.52

export interface EstimateInputs { bill: number; tariff: number; connection: Connection; segment: Segment }
export interface EstimateResult {
  consumptionKwh: number
  availabilityKwh: number
  compensableKwh: number
  monthlyMin: number
  monthlyMax: number
  annualMin: number
  annualMax: number
  kwp: number
  panels: number
  isLargeBill: boolean
}
export function calculateEstimate({ bill, tariff, connection }: EstimateInputs): EstimateResult | null {
  if (!Number.isFinite(bill) || !Number.isFinite(tariff) || bill <= 0 || tariff <= 0) return null
  const consumptionKwh = bill / tariff
  const availabilityKwh = AVAILABILITY_KWH[connection]
  const compensableKwh = Math.max(0, consumptionKwh - availabilityKwh)
  const monthlyMin = compensableKwh * tariff * .80
  const monthlyMax = compensableKwh * tariff * .90
  const kwp = compensableKwh / KWH_PER_KWP_MONTH
  return {
    consumptionKwh, availabilityKwh, compensableKwh,
    monthlyMin, monthlyMax,
    annualMin: monthlyMin * 12, annualMax: monthlyMax * 12,
    kwp, panels: compensableKwh > 0 ? Math.ceil(kwp / PANEL_KWP) : 0,
    isLargeBill: bill > 10000,
  }
}
export const money = (value:number) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(value)
export const decimal = (value:number, maximumFractionDigits = 1) => new Intl.NumberFormat('pt-BR',{maximumFractionDigits}).format(value)
