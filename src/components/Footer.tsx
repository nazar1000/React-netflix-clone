import "./footer.scss"

function Footer() {
    return (

        <div className="footer-div">

            <div className="social-media-div">
                <span>Created using TheMovieDB, All shows & movies belong to:</span>
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="The movie db" />
            </div>

            <div className="links">
                <ul>
                    <li><a>Audio Description</a></li>
                    <li><a>Investor Relations</a></li>
                    <li><a>Legal Notices</a></li>
                    <li><a>Help Center</a></li>
                    <li><a>Jobs</a></li>
                    <li><a>Cookie Preferences</a></li>
                    <li><a>Gift Cards</a></li>
                    <li><a>Terms of Use</a></li>
                    <li><a>Corporate Information</a></li>
                    <li><a>Media Center</a></li>
                    <li><a>Privacy</a></li>
                    <li><a>Contact Us</a></li>
                </ul>
            </div>

            <div className="copyright-div">
                <p>	&copy; 2022 Not official website - Personal project</p>
            </div>
        </div>

    )
}

export default Footer