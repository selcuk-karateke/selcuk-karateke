import MathJaxProvider from '@/components/education/MathJaxProvider'

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <MathJaxProvider>{children}</MathJaxProvider>
}
