import MathJaxProvider from '@/components/education/MathJaxProvider'

export default function UebungenLayout({ children }: { children: React.ReactNode }) {
  return <MathJaxProvider>{children}</MathJaxProvider>
}
