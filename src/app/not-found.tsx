import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto text-2xl text-center mt-12">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link
                href="/"
                className="hover:text-slate-700 hover:underline text-slate-300 bg-blue-700 hover:bg-blue-400 transition-all py-2 px-4 rounded-3xl mt-4 inline-block"
            >
                Return Home
            </Link>

        
        </div>
    );
}
