import MathJaxProvider from '@/components/education/MathJaxProvider'

export default function AkademieLayout({ children }: { children: React.ReactNode }) {
  return <MathJaxProvider>{children}</MathJaxProvider>
}
