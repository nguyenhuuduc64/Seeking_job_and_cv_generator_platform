import HeroBanner from "../components/layout/HeroBanner";
import HomeItroduce from "../components/layout/HomeItroduce";
import JobList from "../components/layout/JobList";
function Home() {
    return (
        <div>
            <HeroBanner />
            <JobList />
            <HomeItroduce />
        </div>
    );
}

export default Home;