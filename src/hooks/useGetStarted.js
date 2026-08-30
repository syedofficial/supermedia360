import { useContext } from 'react'
import { GetStartedContext } from '../context/getStartedContextObject'

// Every "Get Started" trigger across the site (Header, Hero, CTA, Packages)
// calls this instead of linking out, so the form opens in the themed
// on-site popup — see GetStartedModal.
export function useGetStarted() {
  const open = useContext(GetStartedContext)
  if (!open) {
    throw new Error('useGetStarted must be used within a GetStartedProvider')
  }
  return open
}
