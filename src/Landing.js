import { Link } from 'react-router-dom';
import notes_landing from './img/notes_landing.png';

export default () => {
  return (
    <div className="h-full md:flex md:flex-row-reverse ml-4">
      <div className="h-1/2 md:h-auto md:w-3/5">
        <img className="md:w-full md:object-cover" src={notes_landing} alt="" />
      </div>
      <div className="px-4 md:flex md:flex-col  md:justify-center">
        <h1 className="text-5xl text-indigo-900 pb-2 lg:text-7xl">
          Online Sticky Notes
        </h1>
        <p className="text-2xl text-indigo-900 py-4">
          Bring your team together for fun and effective remote meetings
        </p>
        <Link to="/signup">
          <button className="md:w-44 mb-4 px-1 text-xl text-indigo-900 uppercase border border-1 border-indigo-900">
            Get Started &gt;
          </button>
        </Link>
      </div>
    </div>
  );
};
