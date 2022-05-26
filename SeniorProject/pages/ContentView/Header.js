// import PersonIcon from '@material-ui/icons/Person'
// import BubbleChartIcon from '@material-ui/icons/BubbleChart'
// import IconButton from '@material-ui/core/IconButton'

function Header(){
    return(
        <div className="header">
            {/* <IconButton>
            <PersonIcon  fontSize= "large"/>
            </IconButton> */}
            <img
            className = "header__logo"
            src = "https://upload.wikimedia.org/wikipedia/commons/8/82/Pop_Network_Logo.png"
            alt = "popflash logo"
            />
            {/* <IconButton>
            <BubbleChartIcon fontSize= "large"/>
            </IconButton> */}
        </div>
    )
}

export default Header;