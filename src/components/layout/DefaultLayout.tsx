import NavBar from "./NavBar";



export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    );
}