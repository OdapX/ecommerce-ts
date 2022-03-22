import Header from './Header'

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
