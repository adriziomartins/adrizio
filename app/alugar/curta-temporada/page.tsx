import { permanentRedirect } from 'next/navigation'

export default function LegacyShortStayPage() {
  permanentRedirect('/locacoes')
}
