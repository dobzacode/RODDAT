export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/community/create", "/post/create", "/profile"],
};
