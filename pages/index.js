import Link from "next/link";
import { DashBoardMap } from "../components/DashBoardMap";
import { sanityClient, urlFor } from "../sanity"
import { isMultiple } from "../utils";

const Home = ({properties}) => {
  console.log(properties);
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Place to Stay near you</h1>
            <div className="feed">
              {properties.map((property, index) => (
                <Link href={`property/${property.slug.current}`}>
                <div key={property._id} className="card">
                    <img src={urlFor(property.mainImage)} alt="" />
                    <p>{property.reviews.length} review{isMultiple(property.reviews.length)}</p>
                    <h3>{ property.title }</h3>
                    <h3>￥<b>{ property.pricePerNight }</b>/per Night</h3>
                </div>
                </Link>
              ))}
            </div>
          </div>
            <div className="map">
              <DashBoardMap properties={properties}/>
            </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties:[],
      },
    }
  } else {
    return {
      props: {
        properties
      }
    }
  }
}

export default Home
