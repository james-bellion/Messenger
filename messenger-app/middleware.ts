import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/"
    }
})

// protect the routes inside users
export const config = {
    matcher: [
        "/users/:path*"
    ]
}