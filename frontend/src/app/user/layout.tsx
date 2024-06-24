import AuthGuard from "@/components/wrapper/AuthGuard";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
