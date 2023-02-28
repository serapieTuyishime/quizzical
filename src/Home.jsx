import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex items-center justify-center h-screen ">
            <img
                src="/assets/blob 5.png"
                alt="blob 5"
                width={297}
                height={235}
                className="absolute top-0 right-0"
            />
            <img
                src="/assets/blob 5 (1).png"
                alt="blob 6"
                width={297}
                height={235}
                className="absolute bottom-0 left-0"
            />
            <div className="w-1/2 text-center md:w-5/12">
                <h1 className="mb-3 text-4xl font-semibold text-slate-700">
                    Quizzical
                </h1>
                <p className="text-xl text-slate-700">An internet game</p>
                <Link to="/questions">
                    <button className="w-2/5 px-8 pt-4 pb-5 mt-4 text-xl text-white bg-primary rounded-2xl">
                        Start quiz !
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
