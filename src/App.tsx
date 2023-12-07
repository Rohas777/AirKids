import React from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";

import Home from "./pages/Home";
import News from "./pages/News";
import FullNews from "./pages/FullNews";
import Calendar from "./pages/Calendar";
import Header from "./components/Header";
import Teams from "./pages/Teams";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import CreateNews from "./pages/CreateNews";
import TournamentTablePage from "./pages/TournamentTablePage";
import TournamentStatisticPage from "./pages/TournamentStatisticPage";
import PlayersMVP from "./pages/PlayersMVP";
import TeamMVP from "./pages/TeamMVP";
import Match from "./pages/Match";
import CreateTeam from "./pages/CreateTeam";
import CreatePlayer from "./pages/CreatePlayer";
import MediaQuery from "react-responsive";
import HeaderAdaptive from "./components/HeaderAdaptive";

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <MediaQuery maxWidth={1224}>
                <HeaderAdaptive />
            </MediaQuery>
            <MediaQuery minWidth={1225}>
                <Header />
            </MediaQuery>
            <div className={styles.wrapper}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/auth" element={<Login />} />
                    <Route path="/news/:id" element={<FullNews />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/match/:id" element={<Match />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/:id" element={<TeamPage />} />
                    <Route path="/players/:id" element={<PlayerPage />} />
                    <Route path="/players/mvp" element={<PlayersMVP />} />
                    <Route path="/players/team-mvp" element={<TeamMVP />} />
                    <Route
                        path="/tournament-statistic"
                        element={<TournamentStatisticPage />}
                    />
                    <Route
                        path="/tournament-table"
                        element={<TournamentTablePage />}
                    />

                    <Route path="/news/create" element={<CreateNews />} />
                    <Route path="/team/create" element={<CreateTeam />} />
                    <Route path="/players/create" element={<CreatePlayer />} />

                    {/* <Route path='/about' element={<About />} />
            <Route path='/players' element={<Players />} />
            <Route path='/statistic' element={<Statistic />} />
            <Route path='/media' element={<Media />} />
            <Route path='*' element={<NotFound />} /> */}
                </Routes>
                <div className={styles.someDiv}></div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
