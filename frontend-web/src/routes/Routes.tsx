import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Annonce from "../pages/menu/Annonce";
import Cours from "../pages/menu/Cours";
import Offre from "../pages/menu/Offre";
import Cp from "../pages/menu/Cp";
import Form from "../pages/form/Form";
import User from "../pages/menu/User";
import Abonnement from "../pages/menu/Abonnement";
import Catalogue from "../pages/menu/Catalogue";
import Publication from "../pages/menu/Publication";
import Accueil from "../pages/menu/Accueil";


function RoutesCollection() {
    return (
        <Routes>
            <Route path={"/"} Component={Landing}>
                <Route path={"/sign"} Component={Form} />
            </Route>
            <Route path={"/user"} Component={User}>
                <Route index Component={Accueil} />
                <Route path={"/user/publication"} Component={Publication} />
                <Route path={"/user/catalogue"} Component={Catalogue} />
                <Route path={"/user/annonce"} Component={Annonce} />
                <Route path={"/user/cours"} Component={Cours} />
                <Route path={"/user/offre"} Component={Offre} />
                <Route path={"/user/abonnement"} Component={Abonnement} />
                <Route path={"/user/cp"} Component={Cp} />
            </Route>
        </Routes>
    );
}
export default RoutesCollection;