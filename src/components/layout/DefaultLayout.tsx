import NavBar from "./NavBar";



export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="fixed w-full top-0" style={{ zIndex: 500 }}>
                <NavBar />
            </div>
            <main style={{ marginTop: 'var(--header-height)' }}>{children}</main>
        </div>
    );
}