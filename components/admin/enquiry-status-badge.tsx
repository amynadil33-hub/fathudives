import { cn } from '@/lib/utils'
import { ENQUIRY_STATUS_LABELS } from '@/lib/constants'
import type { EnquiryStatus } from '@/lib/types'

const styles: Record<EnquiryStatus, string> = {
  new: 'bg-coral/15 text-coral',
  contacted: 'bg-primary/10 text-primary',
  quoted: 'bg-amber-500/15 text-amber-700',
  confirmed: 'bg-emerald-500/15 text-emerald-700',
  cancelled: 'bg-muted text-muted-foreground',
}

export function EnquiryStatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        styles[status],
      )}
    >
      {ENQUIRY_STATUS_LABELS[status] ?? status}
    </span>
  )
}
