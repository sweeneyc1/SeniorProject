import Header from './Header'
import Link from 'next/link'
import ContentCard from './ContentCard';


function ContentView(){
    return (
        <div className="ContentView">
          {/*  Header  */}
        <Header />
            <Link href= "/hello">
                <a> content page </a>
            </Link>
            <ContentCard/>


        {/*  Navigation  */}


{/* /*ThoughtsView compatibility */
}        {/*  ThoughtsView  */}
        {/*  Thoughts  */}

        
        </div>
        );

    }

export default ContentView;