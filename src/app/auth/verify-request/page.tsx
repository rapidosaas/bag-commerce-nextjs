export default function VerifyRequest() {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <h1 className="text-xl mb-2">Check your MailBox</h1>
            <p>A message has been sent to you with the link to connect.</p>
            <p className="font-bold text-blue-600">Please check your <span className="underline">spam folder</span> if you don&apos;t see the email in your inbox!</p>
        </div>
    )
}