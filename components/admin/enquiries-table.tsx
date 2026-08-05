'use client'

import { Fragment, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ChevronDown, Inbox, Loader2, Trash2 } from 'lucide-react'
import type { Enquiry, EnquiryStatus } from '@/lib/types'
import { ENQUIRY_STATUS_LABELS } from '@/lib/constants'
import { setEnquiryStatus, removeEnquiry } from '@/app/actions/admin'
import { EnquiryStatusBadge } from './enquiry-status-badge'
import { EmptyState } from './admin-ui'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const STATUSES: EnquiryStatus[] = ['new', 'contacted', 'quoted', 'confirmed', 'cancelled']

export function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const router = useRouter()

  const filtered = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter)
  const counts = enquiries.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] ?? 0) + 1
      return acc
    },
    {} as Record<EnquiryStatus, number>,
  )

  function changeStatus(id: string, status: EnquiryStatus) {
    setPendingId(id)
    startTransition(async () => {
      const res = await setEnquiryStatus(id, status)
      setPendingId(null)
      if (res && 'error' in res) toast.error(res.error)
      else toast.success(`Marked ${ENQUIRY_STATUS_LABELS[status].toLowerCase()}`)
    })
  }

  function onDelete(e: Enquiry) {
    if (!confirm(`Delete the booking from ${e.fullName}? This cannot be undone.`)) return
    setPendingId(e.id)
    startTransition(async () => {
      const res = await removeEnquiry(e.id)
      setPendingId(null)
      if (res && 'error' in res) toast.error(res.error)
      else {
        toast.success('Booking deleted')
        router.refresh()
      }
    })
  }

  if (enquiries.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No enquiries yet"
        description="When visitors submit the booking enquiry form, they will appear here for you to review and manage."
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', ...STATUSES] as const).map((s) => {
          const count = s === 'all' ? enquiries.length : (counts[s] ?? 0)
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              {s === 'all' ? 'All' : ENQUIRY_STATUS_LABELS[s]}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  filter === s ? 'bg-white/20' : 'bg-muted'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Guest</th>
              <th className="hidden p-4 font-medium md:table-cell">Travel dates</th>
              <th className="hidden p-4 font-medium lg:table-cell">Divers</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Set status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((e) => (
              <Fragment key={e.id}>
                <tr className="align-top">
                  <td className="p-4">
                    <button
                      onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                      className="flex items-start gap-2 text-left"
                      aria-expanded={expanded === e.id}
                    >
                      <ChevronDown
                        className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform ${
                          expanded === e.id ? 'rotate-180' : ''
                        }`}
                        aria-hidden
                      />
                      <span>
                        <span className="block font-medium text-foreground">{e.fullName}</span>
                        <span className="block text-xs text-muted-foreground">{e.email}</span>
                        <span className="block text-xs text-muted-foreground">
                          {formatDate(e.createdAt)}
                        </span>
                      </span>
                    </button>
                  </td>
                  <td className="hidden p-4 text-muted-foreground md:table-cell">
                    {e.arrivalDate ? `${e.arrivalDate} → ${e.departureDate ?? '?'}` : 'Flexible'}
                  </td>
                  <td className="hidden p-4 text-muted-foreground lg:table-cell">
                    {e.numberOfDivers} diver{e.numberOfDivers === 1 ? '' : 's'} · {e.diverStatus}
                  </td>
                  <td className="p-4">
                    <EnquiryStatusBadge status={e.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Select
                        value={e.status}
                        onValueChange={(v) => changeStatus(e.id, v as EnquiryStatus)}
                      >
                        <SelectTrigger className="h-9 w-36" aria-label="Change status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {ENQUIRY_STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {pending && pendingId === e.id ? (
                        <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />
                      ) : null}
                    </div>
                  </td>
                </tr>
                {expanded === e.id ? (
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-4">
                      <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                        <Detail label="WhatsApp" value={e.whatsapp} />
                        <Detail label="Nationality" value={e.nationality} />
                        <Detail label="Guests" value={`${e.adults} adults · ${e.children} children`} />
                        <Detail label="Diver status" value={e.diverStatus} />
                        <Detail label="Certification" value={e.certificationLevel} />
                        <Detail label="Agency" value={e.certificationAgency} />
                        <Detail label="Logged dives" value={e.loggedDives?.toString()} />
                        <Detail label="Package" value={e.packageId} />
                        <Detail
                          label="Needs"
                          value={[
                            e.accommodationRequired && 'Accommodation',
                            e.equipmentRequired && 'Equipment',
                            e.transferRequired && 'Transfer',
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        />
                        <Detail label="Special requests" value={e.specialRequests} full />
                        <Detail label="Message" value={e.message} full />
                      </dl>
                      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                        <Button asChild size="sm" variant="outline">
                          <a href={`mailto:${e.email}`}>Reply by email</a>
                        </Button>
                        {e.whatsapp ? (
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={`https://wa.me/${e.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              WhatsApp
                            </a>
                          </Button>
                        ) : null}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="ml-auto gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => onDelete(e)}
                          disabled={pending && pendingId === e.id}
                        >
                          <Trash2 className="size-4" aria-hidden /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Detail({ label, value, full }: { label: string; value?: string; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2 lg:col-span-3' : undefined}>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{value || '—'}</dd>
    </div>
  )
}
