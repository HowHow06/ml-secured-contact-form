import AuthGuard from "@/guards/authGuard";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
