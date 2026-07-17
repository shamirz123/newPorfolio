import mock01 from '/assets/images/vendix-sr.png';
import mock02 from '/assets/images/bizprobe-sr.png';
import mock03 from '/assets/images/employrernext-sr.png';
import mock04 from '/assets/images/falaksoftware-sr.png';
import mock05 from '/assets/images/scam-sr.png';
import mock06 from '/assets/images/tripplanner-sr.png';
import mock07 from '/assets/images/jamia-sr.png';
import mock08 from '/assets/images/expense-sr.png';
import mock09 from '/assets/images/chtbot-sr.png';
// import '../../src/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://pilot.vendix.com.sa/" target="_blank" rel="noreferrer"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://pilot.vendix.com.sa/" target="_blank" rel="noreferrer"><h2>Vendix</h2></a>
                <p>Salon SaaS platform for the Saudi market, built with ASP.NET Core MVC (Razor) and vanilla JavaScript. Built the owner dashboard, KPI cards, Chart.js analytics, sidebar redesign, dark/light theme system, POS checkout module, and ZATCA e-invoicing admin panel.</p>
            </div>
            <div className="project">
                <a href="https://bizprobe.com/" target="_blank" rel="noreferrer"><img src={mock02} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://bizprobe.com/" target="_blank" rel="noreferrer"><h2>BizProbe</h2></a>
                <p>Business review platform built with ASP.NET Core MVC (Razor) and vanilla JavaScript. Built the dynamic Reviews page, homepage recent-reviews section, and hero search UI with tab filtering.</p>
            </div>
            <div className="project">
                <a href="https://employernext.com" target="_blank" rel="noreferrer"><img src={mock03} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://employernext.com" target="_blank" rel="noreferrer"><h2>EmployerNext</h2></a>
                <p>Global job search platform built with ASP.NET Core MVC (Razor) and vanilla JavaScript. Built the navbar, hero upload validation, and scroll-behavior fixes.</p>
            </div>
            <div className="project">
                <a href="https://falaksoftware.com" target="_blank" rel="noreferrer"><img src={mock04} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://falaksoftware.com" target="_blank" rel="noreferrer"><h2>Falak Software</h2></a>
                <p>Software agency site built with ASP.NET Core MVC (Razor) and vanilla JavaScript. Built the core homepage sections: hero, services carousel, testimonials slider, and portfolio.</p>
            </div>
            <div className="project">
                <a href="https://scamsoldier.com" target="_blank" rel="noreferrer"><img src={mock05} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://scamsoldier.com" target="_blank" rel="noreferrer"><h2>ScamSoldier</h2></a>
                <p>Essay writing service review platform, built with .NET backend and vanilla JavaScript for frontend interactions.</p>
            </div>
            <div className="project">
                <a href="https://tripplannerpk.com" target="_blank" rel="noreferrer"><img src={mock06} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://tripplannerpk.com" target="_blank" rel="noreferrer"><h2>TripPlannerPK</h2></a>
                <p>Pakistan travel booking platform for flights, hotels, visas, and Hajj & Umrah packages. Built with PHP backend and React.js frontend.</p>
            </div>
            <div className="project">
                <a href="https://jamiasohan.org/" target="_blank" rel="noreferrer"><img src={mock07} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://jamiasohan.org/" target="_blank" rel="noreferrer"><h2>Jamia Sohan</h2></a>
                <p>Islamic seminary platform with Arabic/Urdu localization, custom Traditional Arabic font integration, and RTL layout.</p>
            </div>
            <div className="project">
                <a href="https://expense-tracker-front-end-seven.vercel.app" target="_blank" rel="noreferrer"><img src={mock08} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://expense-tracker-front-end-seven.vercel.app" target="_blank" rel="noreferrer"><h2>Expense Tracker</h2></a>
                <p>Personal full-stack project built with React.js and Node.js/MongoDB (MERN), deployed on Vercel.</p>
            </div>
            <div className="project">
                <a href="https://shahmir-bot.vercel.app/login" target="_blank" rel="noreferrer"><img src={mock09} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://shahmir-bot.vercel.app/login" target="_blank" rel="noreferrer"><h2>Chat Bot App</h2></a>
                <p>Personal full-stack project built with React.js and Node.js/MongoDB (MERN), deployed on Vercel.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;