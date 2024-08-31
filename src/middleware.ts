import { jwtVerify, type JWTPayload } from "jose";
import { NextResponse, type NextRequest } from "next/server";

import { BASE_URL } from "./utils/config";

interface IPayload extends JWTPayload {
  admin: {
    verified: boolean;
  };
}

const isPostRoute = (pathname: string): boolean => {
  return pathname.startsWith("/book/success");
};

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  // console.log(req);
  const { pathname } = req.nextUrl;

  if (isPostRoute(pathname)) {
    NextResponse.redirect(BASE_URL + "success");
    return new NextResponse(
      JSON.stringify({
        message: "We have received your request you will get a mail shortly",
      })
    );
  }

  try {
    const token = req.cookies.get("authorization");
    if (token === undefined) throw Error("Token is Not Present");
    const key = process.env.ADMIN_SEC;
    const sec = new TextEncoder().encode(key);

    const { payload }: { payload: IPayload } = await jwtVerify(
      token.value,
      sec
    );

    if (payload.admin.verified) {
      // req.admin = admin;
      return NextResponse.next();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.redirect(new URL("/auth/login", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/admin/:path*", "/book/success"],
};
