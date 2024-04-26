## E-Padhai - Learning Management System (LMS)

E-Padhai is a Learning Management System designed to make online learning easy and accessible.

## Technologies Used

- **Next.js 14** with App Router
- **Prisma** as an ORM
- **Connect Ips** for Payment

## Additional Integrations

- **Clerk Authentication and User Management**: [Clerk Website](https://clerk.com/)
- **UploadThing**: [UploadThing Documentation](https://docs.uploadthing.com/)

## Environment Variables

Add the following variables to your `.env` file:

```dotenv
# Clerk for authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database URL
DATABASE_URL=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```
