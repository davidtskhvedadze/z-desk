<h1 align="center">
    Z-Desk
</h1>

Z-Desk is a help desk application designed to streamline customer service and improve customer satisfaction.

## Tech Stack
<div align="center">
    <img src="https://skillicons.dev/icons?i=typescript,react,nextjs,tailwindcss,prisma,sqlite" alt="My Skills">
</div>

## Features

- User authentication with JSON Web Tokens (JWT)
- Admin sign in
- Protected tickets that only admins can access
- Ability to submit tickets
- Ability to respond to tickets
- Ability to change the status of tickets
- Form Validation
- Toast Notifications
- Pagination
- Loading spinner

## Notes
- `username`: admin
- `password`: password123
- There are 5 tickets per page, pagination splits up the tickets and the 6th one goes to page 2.
- Shadcn/ui was used for the components and styling


## Installation

1. Clone the repository: `git clone https://github.com/yourusername/zealthy-help-desk.git`
2. Access the directory: `cd zealthy-help-desk`
3. Install the dependencies: `npm install`
4. Start the server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
6. Add `JWT_SECRET` key to `.env`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
