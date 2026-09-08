import { PawMark } from './Bits'

export default function Footer({ navigate, onDonate }) {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <PawMark size={26} color="#F6C445" />
          <p>
            SavePaws is a network of three shelters and 240 volunteers. We take in animals no one else has room
            for, and we do not put a healthy animal to sleep for space.
          </p>
        </div>

        <div className="footer__col">
          <h4>Pages</h4>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('animals')}>Animals and campaigns</button>
          <button onClick={() => navigate('involved')}>Volunteer and donate</button>
          <button onClick={onDonate}>Give now</button>
        </div>

        <div className="footer__col">
          <h4>Shelters</h4>
          <p>Ridgeway Kennels, Barrow Lane</p>
          <p>Marlow Cattery, Ashgrove</p>
          <p>Halden Farm Rescue, Winterbourne</p>
        </div>

        <div className="footer__col">
          <h4>Reach us</h4>
          <p>hello@savepaws.demo</p>
          <p>Intake line, open 24 hours</p>
          <p>Registered charity 1148 2290</p>
        </div>
      </div>

      <div className="footer__base">
        <span>SavePaws demo build. Sample data and sample donations only.</span>
        <span>Built for a campaign coursework project.</span>
      </div>
    </footer>
  )
}
